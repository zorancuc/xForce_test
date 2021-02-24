pragma solidity >=0.6.6;

import "./OrderBase.sol";

contract OrderOwnership is OrderBase
{
    string public constant name = "Orders";
    string public constant symbol = "LO";

    event Transfer(address from, address to, uint256 tokenId);
    event Approval(address owner, address approved, uint256 tokenId);

    /**
    * Check if the claimant owns Order
    * @param _claimant                  Address of Claimer
    * @param _orderId                    Order Id
    *
    * @return result                    The boolean result if claimant owns given Order
    *
     */
    function _owns(address _claimant, uint256 _orderId) internal view returns (bool) {
        return orderIndexToOwner[_orderId] == _claimant;
    }

    /**
    * Check if Order is approved for Claimant
    * @param _claimant                  Address of Claimer
    * @param _orderId                    Order Id
    *
    * @return result                    The boolean result if claimant is approved for given Order
    *
     */
    function _approvedFor(address _claimant, uint256 _orderId) internal view returns (bool) {
        return orderIndexToApproved[_orderId] == _claimant;
    }

    /**
    * Approve Order for for Claimant
    * @param _approved                  Address of approved
    * @param _orderId                    Order Id
    *
     */
    function _approve(uint256 _orderId, address _approved) internal {
        orderIndexToApproved[_orderId] = _approved;
    }

    /**
    * Get Balance of Owner
    * @return count                     Count of Orders owned by Owner
    *
     */
    function balanceOf(address _owner) public view returns (uint256 count) {
        return ownershipOrderCount[_owner];
    }

    /**
    * Transfer Order
    * @param _to                            Address of receiver
    * @param _orderId                        Hero Id to be transferred
    *
     */
    function transfer(
        address _to,
        uint256 _orderId
    )
        external
    {
        // Safety check to prevent against an unexpected 0x0 default.
        require(_to != address(0x0));
        require(_to != address(this));

        require(_owns(msg.sender, _orderId));

        _transfer(msg.sender, _to, _orderId);
    }

    /**
    * Approve Order for for Claimant
    * @param _to                        Address to be approved by order
    * @param _orderId                    Order Id
    *
     */
    function approve(
        address _to,
        uint256 _orderId
    )
        external
    {
        // Only an owner can grant transfer approval.
        require(_owns(msg.sender, _orderId));

        // Register the approval (replacing any previous approval).
        _approve(_orderId, _to);

        // Emit approval event.
        emit Approval(msg.sender, _to, _orderId);
    }

    /**
    * Transfer Order
    * @param _from                          Address of transfer
    * @param _to                            Address of receiver
    * @param _orderId                        Order Id to be transferred
    *
     */
    function transferFrom(
        address _from,
        address _to,
        uint256 _orderId
    )
        external
    {
        require(_to != address(0x0));

        require(_to != address(this));

        require(_approvedFor(msg.sender, _orderId));
        require(_owns(_from, _orderId));

        _transfer(_from, _to, _orderId);
    }

    /**
    * Get Total Supply
    * @return count                     Total Supply of Orders
    *
     */
    function totalSupply() public view returns (uint) {
        return orders.length - 1;
    }

    /**
    * Get Owner of Given Order
    * @param _orderId                        Order Id
    * @return owner                         Owner's address of Order id
    *
     */
    function ownerOf(uint256 _orderId)
        public
        view
        returns (address owner)
    {
        owner = orderIndexToOwner[_orderId];

        require(owner != address(0x0));
    }

    /**
    * Get Orders of Owner
    * @param _owner                         Owner's address
    *
    * @return ownerOrders                    Owner's Orders
    *
     */
    function ordersOfOwner(address _owner) public view returns(uint256[] memory ownerOrders) {
        uint256 orderCount = balanceOf(_owner);

        if (orderCount == 0) {
            // Return an empty array
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](orderCount);
            uint256 totalOrders = totalSupply();
            uint256 resultIndex = 0;

            uint256 orderId;

            for (orderId = 1; orderId <= totalOrders; orderId++) {
                if (orderIndexToOwner[orderId] == _owner) {
                    result[resultIndex] = orderId;
                    resultIndex++;
                }
            }

            return result;
        }
    }
}
