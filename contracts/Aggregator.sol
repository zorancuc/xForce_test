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
    address public constant WETH = 0xd0a1e359811322d97991e03f863a0c30c2cf029c;
    uint public constant DEADLINE = 100 days;

    uint public blockNumberStart;
    uint public blockNumberEnd;
    address public owner;
    uint public QTotalSold;
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
        QTotalSold = 0;
        isStarted = true;
        orderId = 0;
    }

    function deposit(uint256 strike) external payable {
        uint blockNumberCurrent = block.number;
        require(isStarted, "ASC: NOT STARTED");
        require(blockNumberCurrent <= blockNumberStart.add(DURATION), "ASC: PERIOD IS OVER");
        require(strike >= PRICE_END, "ASC: Strike Price IS LOW");
        uint priceBound = PRICE_START.add((PRICE_END.sub(PRICE_START)).mul(blockNumberCurrent.sub(blockNumberStart)).div(DURATION));
        uint Qest = msg.value.div(priceBound);
        uint k = coeff(Qest);
        uint Qsold = Qest.mul(k).div(100);
        QTotalSold = QTotalSold.add(Qsold);

        //Create event for Order NFT
        IOrder(orderAddr).createOrder(msg.sender, greedAddr, WETH, Qsold, Qsold.mul(strike), msg.sender, blockNumberStart.add(orderId).add(DEADLINE), 0, 0, 0);
        emit OrderCreated(msg.sender, orderId, now, strike, Qsold);
        orderId = orderId.add(1);
    }

    function coeff(uint Qest) internal returns(uint k) {
        uint val = Qest.mul(100).div(QTotalSold.add(OFFSET));
        if (val >= 500) {
            k = 150;
        } else if (val >= 200) {
            k = 140;
        } else if (val >= 100) {
            k = 130;
        } else if (val >= 50) {
            k = 120;
        } else if (val >= 25) {
            k = 115;
        } else if (val >= 10) {
            k = 110;
        } else if (val >= 5) {
            k = 105;
        } else if (val >= 1) {
            k = 101;
        }
    }

    function end() external {
        require (block.number >= blockNumberStart.add(DURATION), "ASC: PERIOD IS NOT OVER");
        IGreed(greedAddr).mint(to, QTotalSold.mul(2));
    }
}
