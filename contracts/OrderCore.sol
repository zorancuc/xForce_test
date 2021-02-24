pragma solidity >=0.6.6;

import "./OrderFactory.sol";

contract OrderCore is OrderFactory
{
    address private                         addrPool;
    /**
    * Constructor
    *
     */
    constructor(address _pool) public
    {
        require(_pool != address(0x0));
        addrPool = _pool;
    }

    /**
    * Get Information of Order
    * @param _id                            Order Id
    *
    *
     */
    function getOrder(uint _id) external view returns(
        address maker,
        address fromToken,
        address toToken,
        uint256 amountIn,
        uint256 amountOutMin,
        address recipient,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) {
        Order memory order = orders[_id];
        return (order.maker, order.fromToken, order.toToken, order.amountIn, order.amountOutMin, order.recipient, order.deadline, order.v, order.r, order.s);
    }

    /**
    * Get Order Quantity
    *
    *
     */
    function getOrderQuantity() external view returns(uint quantity)
    {
        return orders.length;
    }
}
