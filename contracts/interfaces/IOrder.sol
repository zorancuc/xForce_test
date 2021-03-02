pragma solidity ^0.6.8;

interface IOrder {
    function createOrder(
        address _maker,
        address _fromToken,
        address _toToken,
        uint256 _amountIn,
        uint256 _amountOutMin,
        address _recipient,
        uint256 _deadline,
        uint8 _v,
        bytes32 _r,
        bytes32 _s) external ;
}
