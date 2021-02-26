pragma solidity ^0.6.8;

import "hardhat/console.sol";
import './libraries/SafeMath.sol';
import './interfaces/IGreed.sol';

contract Aggregator {
    using SafeMath for uint;

    uint public constant D = 6500 * 30;
    uint public constant PS = 0.01 ether;
    uint public constant PE = 0.05 ether;
    uint public constant OFFSET = 100;

    uint public Ns;
    uint public Ne;
    address public owner;
    uint public QTotalSold;
    bool public isStarted;
    address public greed;
    address public to;

    constructor(address _greed, address _to) public {
        owner = msg.sender;
        isStarted = false;
        greed = _greed;
        to = _to;
    }

    function start() external {
        require(msg.sender == owner, "ASC: PERMISSION DENIED");
        Ns = block.number;
        QTotalSold = 0;
        isStarted = true;
    }

    function deposit(uint256 strike) external payable {
        uint N = block.number;
        require(isStarted, "ASC: NOT STARTED");
        require(N <= Ns.add(D), "ASC: PERIOD IS OVER");
        require(strike >= PE, "ASC: Strike Price IS LOW");
        uint Pb = PS.add((PE.sub(PS)).mul(N.sub(Ns)).div(D));
        uint Qest = msg.value.div(Pb);
        uint k = coeff(Qest);
        uint Qsold = Qest.mul(k).div(100);
        QTotalSold = QTotalSold.add(Qsold);

        //Create event for Order NFT
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
        require (block.number >= Ns.add(D), "ASC: PERIOD IS NOT OVER");
        IGreed(greed).mint(to, QTotalSold.mul(2));
    }
}
