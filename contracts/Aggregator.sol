pragma solidity ^0.6.8;

import "hardhat/console.sol";
import './libraries/SafeMath.sol';
import './interfaces/IGreed.sol';
import './interfaces/IOrder.sol';

contract Aggregator {
    using SafeMath for uint;

    uint public constant DURATION = 6500 * 30;
    uint public constant PRICE_START = 0.01 ether;
    uint public constant PRICE_END = 0.05 ether;
    uint public constant OFFSET = 100;
    address public constant WETH = 0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1;
    uint public constant DEADLINE = 100 days;

    uint public blockNumberStart;
    uint public blockNumberEnd;
    address public owner;
    uint public totalAmountSold;
    bool public isStarted;
    address public greedAddr;
    address public orderAddr;
    address public to;
    uint orderId;

    event OrderCreated(address indexed maker, uint256 orderId, uint256 timestamp, uint256 strike, uint256 amount);

    constructor(address _greedAddr, address _orderAddr, address _to) public {
        owner = msg.sender;
        isStarted = false;
        orderAddr = _orderAddr;
        greedAddr = _greedAddr;
        to = _to;
        orderId = 0;
    }

    function start() external {
        require(msg.sender == owner, "ASC: PERMISSION DENIED");
        blockNumberStart = block.number;
        totalAmountSold = 0;
        isStarted = true;
        orderId = 0;
    }

    function deposit(uint256 strike) external payable {
        uint blockNumberCurrent = block.number;
        require(isStarted, "ASC: NOT STARTED");
        require(blockNumberCurrent <= blockNumberStart.add(DURATION), "ASC: PERIOD IS OVER");
        require(strike >= PRICE_END, "ASC: Strike Price IS LOW");
        uint priceLowerBound = PRICE_START.add((PRICE_END.sub(PRICE_START)).mul(blockNumberCurrent.sub(blockNumberStart)).div(DURATION));
        uint estimatedAmount = msg.value.div(priceLowerBound);
        uint bonusMultiplier = calculateBonusMultiplier(estimatedAmount);
        uint amountSold = estimatedAmount.mul(bonusMultiplier).div(100);
        totalAmountSold = totalAmountSold.add(amountSold);

        //Create event for Order NFT
        IOrder(orderAddr).createOrder(msg.sender, greedAddr, WETH, amountSold, amountSold.mul(strike), msg.sender, blockNumberStart.add(orderId).add(DEADLINE), 0, 0, 0);
        emit OrderCreated(msg.sender, orderId, now, strike, amountSold);
        orderId = orderId.add(1);
    }

    function calculateBonusMultiplier(uint estimatedAmount) internal returns(uint bonusMultiplier) {
        uint val = estimatedAmount.mul(100).div(totalAmountSold.add(OFFSET));
        if (val >= 500) {
            bonusMultiplier = 150;
        } else if (val >= 200) {
            bonusMultiplier = 140;
        } else if (val >= 100) {
            bonusMultiplier = 130;
        } else if (val >= 50) {
            bonusMultiplier = 120;
        } else if (val >= 25) {
            bonusMultiplier = 115;
        } else if (val >= 10) {
            bonusMultiplier = 110;
        } else if (val >= 5) {
            bonusMultiplier = 105;
        } else if (val >= 1) {
            bonusMultiplier = 101;
        }
    }

    function end() external {
        require (block.number >= blockNumberStart.add(DURATION), "ASC: PERIOD IS NOT OVER");
        IGreed(greedAddr).mint(to, totalAmountSold.mul(2));
    }
}
