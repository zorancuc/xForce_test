pragma solidity >=0.6.6;

contract OrderBase
{
    struct Order {
        address maker;
        address fromToken;
        address toToken;
        uint256 amountIn;
        uint256 amountOutMin;
        address recipient;
        uint256 deadline;
    }

    address public                          addrAdmin;

    uint[] public                           orderQuantityLimit;

    Order[]                                 orders;

    mapping (uint256 => address) public     orderIndexToOwner;
    mapping (address => uint256) public     ownershipOrderCount;
    mapping (uint256 => address) public     orderIndexToApproved;

    event Transfer(address from, address to, uint256 orderId);
    event OrdersCreated(uint itmeType, uint quantity);
    event OrderGroupCreated(string orderName, uint orderQuantity, uint orderRarity, uint orderType);

    /**
    * Constructor
    *
     */
    constructor() public
    {
        addrAdmin = msg.sender;
    }

    /**
    * Modifier for Admin Only
    *
     */
    modifier onlyAdmin()
    {
        require(msg.sender == addrAdmin);
        _;
    }

    /**
    * Create Order NFT
    *
     */
    function createOrder(
        address _maker,
        address _fromToken,
        address _toToken,
        uint256 _amountIn,
        uint256 _amountOutMin,
        address _recipient,
        uint256 _deadline) 
    public {
        Order memory _order = Order(_maker, _fromToken, _toToken, _amountIn, _amountOutMin, _recipient, _deadline);
        orders.push(_order);
        uint256 newOrderId = orders.length - 1;
        _transfer(address(0), _maker, newOrderId);
    }

    /**
    * Transfer Order NFT
    * @param _from                          Address of transfer
    * @param _to                            Address of receiver
    * @param _orderId                        Order Id to be transferred
    *
     */
    function _transfer(address _from, address _to, uint256 _orderId) internal {
        ownershipOrderCount[_to]++;
        orderIndexToOwner[_orderId] = _to;
        if (_from != address(0)) {
            ownershipOrderCount[_from]--;
            delete orderIndexToApproved[_orderId];
        }

        emit Transfer(_from, _to, _orderId);
    }
}
