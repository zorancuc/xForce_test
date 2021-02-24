pragma solidity >=0.6.6;

import "./OrderOwnership.sol";

contract OrderMarketplace is OrderOwnership
{
    struct OrderAuction {
        address payable seller;
        uint256 startingPrice;
        uint256 orderId;
        // uint256 endingPrice;
        // uint64  duration;
        // uint64  startedAt;
    }

    mapping (uint256 => OrderAuction) orderIdToAuction;
    OrderAuction[] public       orderAuctions;

    /**
    * Constructor
    *
     */
    constructor() public
    {

    }

    /**
    * Get Ids of Iems on the Marketplace Sale
    *
    * @return ordersOfOwner               Orders of Owner
    *
     */
    function getOrderIdsOnSale() public view returns(uint256[] memory)
    {
        return ordersOfOwner(address(this));
    }

    /**
    * Place an Order to Aunction on marketplace
    *
    * @param _price                 Price to Sell
    * @param _orderId                Order Id
    *
     */
    function addAuction(uint _price, uint _orderId) public {
        require(_price > 0);
        require(_owns(msg.sender, _orderId));

        OrderAuction memory _auction = OrderAuction(msg.sender, _price, _orderId);

        // uint256 newAuctionId = OrderAuctions.push(_auction) - 1;
        _transfer(msg.sender, address(this), _orderId);
        orderIdToAuction[_orderId] = _auction;
    }

    /**
    * Get Information of Auction By Order ID
    *
    * @param _orderId                 Order Id
    *
    * @return seller                Seller's Address
    * @return price                 Price
    * @return orderId                 Order Id
    *
     */
    function getOrderAuctionByOrderId(uint256 _orderId) external view returns(address seller, uint256 price, uint256 orderId)
    {
        OrderAuction memory _auction = orderIdToAuction[_orderId];
        return(_auction.seller, _auction.startingPrice, _auction.orderId);
    }

    /**
    * Get Count of Auction Sale
    *
    * @return count                Count of Auction Sale
    *
     */
    function getOrderAuctionCount() external view returns(uint256)
    {
        return orderAuctions.length;
    }

    /**
    * Get Information of Auction By Auction ID
    *
    * @param _auctionId             Auction Id
    *
    * @return seller                Seller's Address
    * @return price                 Price
    * @return orderId                 Order Id
    *
     */
    function getOrderAuction(uint256 _auctionId) external view returns(address seller, uint256 price, uint256 orderId)
    {
        OrderAuction memory _auction = orderAuctions[_auctionId];
        return(_auction.seller, _auction.startingPrice, _auction.orderId);
    }

    /**
    * Remove Auction By Order ID
    *
    * @param _orderId                 Order ID
    *
     */
    function _removeAuction(uint256 _orderId) internal {
        delete orderIdToAuction[_orderId];
    }

    /**
    * Bid on Auction Sale
    *
    * @param _orderId                 Order ID
    *
     */
    function bidAuction(uint256 _orderId) public payable
    {
        require(_owns(address(this), _orderId));
        OrderAuction memory _auction = orderIdToAuction[_orderId];
        require(!_owns(msg.sender, _orderId));
        require(_auction.startingPrice == msg.value);

        _removeAuction(_orderId);
        _transfer(address(this), msg.sender, _orderId);
        _auction.seller.transfer(msg.value);
    }

    /**
    * Cancel Auction By Order ID
    *
    * @param _orderId                 Order ID
    *
     */
    function cancelAuction(uint256 _orderId) public
    {
        require(_owns(address(this), _orderId));
        OrderAuction memory _auction = orderIdToAuction[_orderId];
        require(msg.sender == _auction.seller);

        _removeAuction(_orderId);
        _transfer(address(this), msg.sender, _orderId);
    }
}