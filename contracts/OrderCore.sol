pragma solidity >=0.6.6;

import "./OrderFactory.sol";

contract OrderCore is OrderFactory
{
    /**
    * Constructor
    *
     */
    constructor() public
    {
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
        uint256 deadline
    ) {
        Order memory order = orders[_id];
        return (order.maker, order.fromToken, order.toToken, order.amountIn, order.amountOutMin, order.recipient, order.deadline);
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
