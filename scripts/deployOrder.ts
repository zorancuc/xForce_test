import { utils, BigNumber } from 'ethers';
import { getMessage, TypedData } from 'eip-712';
import { config } from "dotenv";
let Web3 = require('web3');
let HDWalletProvider = require("@truffle/hdwallet-provider");

config();

console.log(process.env.ACCOUNT_PRIVATE_KEY);
const orderBookProvider = new HDWalletProvider(process.env.ACCOUNT_PRIVATE_KEY, `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`); // change to main_infura_server or another testnet. 

const owner = orderBookProvider.addresses[0];
console.log("owner:" + owner);

const ASCProvider = new HDWalletProvider(process.env.ACCOUNT_PRIVATE_KEY, `https://infura.io/v3/${process.env.INFURA_API_KEY}`);

const ASCJSON = {
  "address": "",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_greedAddr",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_orderAddr",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "maker",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "strike",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "OrderCreated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DEADLINE",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "DURATION",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "OFFSET",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PRICE_END",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PRICE_START",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "WETH",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "blockNumberEnd",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "blockNumberStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "strike",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "end",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "greedAddr",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isStarted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "orderAddr",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "start",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "to",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalAmountSold",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]  
}

const orderNftJSON = {
  "address": "",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_pool",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "orderName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "orderQuantity",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "orderRarity",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "orderType",
          "type": "uint256"
        }
      ],
      "name": "OrderGroupCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "itmeType",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        }
      ],
      "name": "OrdersCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_orderId",
          "type": "uint256"
        }
      ],
      "name": "addAuction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "addrAdmin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_orderId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "count",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_orderId",
          "type": "uint256"
        }
      ],
      "name": "bidAuction",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_orderId",
          "type": "uint256"
        }
      ],
      "name": "cancelAuction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_maker",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_fromToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_toToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amountIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amountOutMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "_v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "_r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_s",
          "type": "bytes32"
        }
      ],
      "name": "createOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getOrder",
      "outputs": [
        {
          "internalType": "address",
          "name": "maker",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "fromToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "toToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountOutMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_auctionId",
          "type": "uint256"
        }
      ],
      "name": "getOrderAuction",
      "outputs": [
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_orderId",
          "type": "uint256"
        }
      ],
      "name": "getOrderAuctionByOrderId",
      "outputs": [
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOrderAuctionCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOrderIdsOnSale",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOrderQuantity",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "orderAuctions",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "startingPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "orderIndexToApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "orderIndexToOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "orderQuantityLimit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "ordersOfOwner",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "ownerOrders",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_orderId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "ownershipOrderCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_orderId",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_orderId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}
const orderBookJSON = {
    "address": "0xb273F3FEd01Ab4072659bd22Ab5E6d8ea562411b",
    "abi": [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "hash",
            "type": "bytes32"
          }
        ],
        "name": "OrderCreated",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "page",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "limit",
            "type": "uint256"
          }
        ],
        "name": "allHashes",
        "outputs": [
          {
            "internalType": "bytes32[]",
            "name": "",
            "type": "bytes32[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "maker",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "fromToken",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "toToken",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "amountOutMin",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              }
            ],
            "internalType": "struct Orders.Order",
            "name": "order",
            "type": "tuple"
          }
        ],
        "name": "createOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "fromToken",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "page",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "limit",
            "type": "uint256"
          }
        ],
        "name": "hashesOfFromToken",
        "outputs": [
          {
            "internalType": "bytes32[]",
            "name": "",
            "type": "bytes32[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "maker",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "page",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "limit",
            "type": "uint256"
          }
        ],
        "name": "hashesOfMaker",
        "outputs": [
          {
            "internalType": "bytes32[]",
            "name": "",
            "type": "bytes32[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "toToken",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "page",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "limit",
            "type": "uint256"
          }
        ],
        "name": "hashesOfToToken",
        "outputs": [
          {
            "internalType": "bytes32[]",
            "name": "",
            "type": "bytes32[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "numberOfAllHashes",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "fromToken",
            "type": "address"
          }
        ],
        "name": "numberOfHashesOfFromToken",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "maker",
            "type": "address"
          }
        ],
        "name": "numberOfHashesOfMaker",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "toToken",
            "type": "address"
          }
        ],
        "name": "numberOfHashesOfToToken",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "orderOfHash",
        "outputs": [
          {
            "internalType": "address",
            "name": "maker",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "fromToken",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "toToken",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountOutMin",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
          },
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    "transactionHash": "0x79cc160f6efac54efb5e0afd07e9c4c346cf456469ff49879072109660c2ef83",
    "receipt": {
      "to": "0x4e59b44847b379578588920cA78FbF26c0B4956C",
      "from": "0x5b8C253517b6Bd003369173109693B01cb6841B5",
      "contractAddress": null,
      "transactionIndex": 9,
      "gasUsed": "859585",
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "blockHash": "0xe2787a13865f57405a611d19154814f4ee508913ff901f0e9cafd2be7397b0f2",
      "transactionHash": "0x79cc160f6efac54efb5e0afd07e9c4c346cf456469ff49879072109660c2ef83",
      "logs": [],
      "blockNumber": 23370557,
      "cumulativeGasUsed": "1452570",
      "status": 1,
      "byzantium": true
    },
    "args": [],
    "solcInputHash": "429a19cfb198cebceabea0c996893990",
    "metadata": "{\"compiler\":{\"version\":\"0.6.12+commit.27d51765\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"hash\",\"type\":\"bytes32\"}],\"name\":\"OrderCreated\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"DOMAIN_SEPARATOR\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"page\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"limit\",\"type\":\"uint256\"}],\"name\":\"allHashes\",\"outputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"\",\"type\":\"bytes32[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"maker\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"fromToken\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"toToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amountIn\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amountOutMin\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"}],\"internalType\":\"struct Orders.Order\",\"name\":\"order\",\"type\":\"tuple\"}],\"name\":\"createOrder\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"fromToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"page\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"limit\",\"type\":\"uint256\"}],\"name\":\"hashesOfFromToken\",\"outputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"\",\"type\":\"bytes32[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"maker\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"page\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"limit\",\"type\":\"uint256\"}],\"name\":\"hashesOfMaker\",\"outputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"\",\"type\":\"bytes32[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"toToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"page\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"limit\",\"type\":\"uint256\"}],\"name\":\"hashesOfToToken\",\"outputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"\",\"type\":\"bytes32[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"numberOfAllHashes\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"fromToken\",\"type\":\"address\"}],\"name\":\"numberOfHashesOfFromToken\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"maker\",\"type\":\"address\"}],\"name\":\"numberOfHashesOfMaker\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"toToken\",\"type\":\"address\"}],\"name\":\"numberOfHashesOfToToken\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"orderOfHash\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"maker\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"fromToken\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"toToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amountIn\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amountOutMin\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"contracts/OrderBook.sol\":\"OrderBook\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\",\"useLiteralContent\":true},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"@sushiswap/core/contracts/uniswapv2/interfaces/IERC20.sol\":{\"content\":\"pragma solidity >=0.5.0;\\n\\ninterface IERC20Uniswap {\\n    event Approval(address indexed owner, address indexed spender, uint value);\\n    event Transfer(address indexed from, address indexed to, uint value);\\n\\n    function name() external view returns (string memory);\\n    function symbol() external view returns (string memory);\\n    function decimals() external view returns (uint8);\\n    function totalSupply() external view returns (uint);\\n    function balanceOf(address owner) external view returns (uint);\\n    function allowance(address owner, address spender) external view returns (uint);\\n\\n    function approve(address spender, uint value) external returns (bool);\\n    function transfer(address to, uint value) external returns (bool);\\n    function transferFrom(address from, address to, uint value) external returns (bool);\\n}\\n\",\"keccak256\":\"0xe9d81973e1bdb14802875faed4ae169e9fb7816986436c43aa2dd9bfdc809698\"},\"contracts/OrderBook.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n\\npragma solidity =0.6.12;\\npragma experimental ABIEncoderV2;\\n\\nimport \\\"@sushiswap/core/contracts/uniswapv2/interfaces/IERC20.sol\\\";\\nimport \\\"./libraries/Orders.sol\\\";\\nimport \\\"./libraries/EIP712.sol\\\";\\nimport \\\"./libraries/Bytes32Pagination.sol\\\";\\n\\ncontract OrderBook {\\n    using Orders for Orders.Order;\\n    using Bytes32Pagination for bytes32[];\\n\\n    event OrderCreated(bytes32 indexed hash);\\n\\n    // solhint-disable-next-line var-name-mixedcase\\n    bytes32 public immutable DOMAIN_SEPARATOR;\\n\\n    // Array of hashes of all orders\\n    bytes32[] internal _allHashes;\\n    // Address of order maker => hashes (orders)\\n    mapping(address => bytes32[]) internal _hashesOfMaker;\\n    // Address of fromToken => hashes (orders)\\n    mapping(address => bytes32[]) internal _hashesOfFromToken;\\n    // Address of toToken => hashes (orders)\\n    mapping(address => bytes32[]) internal _hashesOfToToken;\\n    // Hash of an order => the order and its data\\n    mapping(bytes32 => Orders.Order) public orderOfHash;\\n\\n    constructor() public {\\n        uint256 chainId;\\n        assembly {\\n            chainId := chainid()\\n        }\\n        DOMAIN_SEPARATOR = keccak256(\\n            abi.encode(\\n                keccak256(\\\"EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)\\\"),\\n                keccak256(\\\"OrderBook\\\"),\\n                keccak256(\\\"1\\\"),\\n                chainId,\\n                address(this)\\n            )\\n        );\\n    }\\n\\n    // Returns the number of orders of a maker\\n    function numberOfHashesOfMaker(address maker) public view returns (uint256) {\\n        return _hashesOfMaker[maker].length;\\n    }\\n\\n    // Return the number of orders where fromToken is the origin token\\n    function numberOfHashesOfFromToken(address fromToken) public view returns (uint256) {\\n        return _hashesOfFromToken[fromToken].length;\\n    }\\n\\n    // Return the number of orders where toToken is the target token\\n    function numberOfHashesOfToToken(address toToken) public view returns (uint256) {\\n        return _hashesOfToToken[toToken].length;\\n    }\\n\\n    // Returns the number of all orders\\n    function numberOfAllHashes() public view returns (uint256) {\\n        return _allHashes.length;\\n    }\\n\\n    // Returns an array of hashes of orders of a maker\\n    function hashesOfMaker(\\n        address maker,\\n        uint256 page,\\n        uint256 limit\\n    ) public view returns (bytes32[] memory) {\\n        return _hashesOfMaker[maker].paginate(page, limit);\\n    }\\n\\n    // Returns an array of hashes of orders where fromToken is the origin token\\n    function hashesOfFromToken(\\n        address fromToken,\\n        uint256 page,\\n        uint256 limit\\n    ) public view returns (bytes32[] memory) {\\n        return _hashesOfFromToken[fromToken].paginate(page, limit);\\n    }\\n\\n    // Returns an array of hashes of orders where toToken is the target token\\n    function hashesOfToToken(\\n        address toToken,\\n        uint256 page,\\n        uint256 limit\\n    ) public view returns (bytes32[] memory) {\\n        return _hashesOfToToken[toToken].paginate(page, limit);\\n    }\\n\\n    // Return an array of all hashes\\n    function allHashes(uint256 page, uint256 limit) public view returns (bytes32[] memory) {\\n        return _allHashes.paginate(page, limit);\\n    }\\n\\n    // Creates an order\\n    function createOrder(Orders.Order memory order) public {\\n        order.validate();\\n\\n        bytes32 hash = order.hash();\\n        address signer = EIP712.recover(DOMAIN_SEPARATOR, hash, order.v, order.r, order.s);\\n        require(signer != address(0) && signer == order.maker, \\\"invalid-signature\\\");\\n\\n        require(orderOfHash[hash].maker == address(0), \\\"order-exists\\\");\\n        orderOfHash[hash] = order;\\n\\n        _allHashes.push(hash);\\n        _hashesOfMaker[order.maker].push(hash);\\n        _hashesOfFromToken[order.fromToken].push(hash);\\n        _hashesOfToToken[order.toToken].push(hash);\\n\\n        emit OrderCreated(hash);\\n    }\\n}\\n\",\"keccak256\":\"0x48508e4ac2948c411677cace7382e67148ba34ccbe57eb6ec6f110a0bcae9333\",\"license\":\"MIT\"},\"contracts/libraries/Bytes32Pagination.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n\\npragma solidity =0.6.12;\\n\\nlibrary Bytes32Pagination {\\n    function paginate(\\n        bytes32[] memory hashes,\\n        uint256 page,\\n        uint256 limit\\n    ) internal pure returns (bytes32[] memory result) {\\n        result = new bytes32[](limit);\\n        for (uint256 i = 0; i < limit; i++) {\\n            if (page * limit + i >= hashes.length) {\\n                result[i] = bytes32(0);\\n            } else {\\n                result[i] = hashes[page * limit + i];\\n            }\\n        }\\n    }\\n}\\n\",\"keccak256\":\"0x7ec40eff569a29dd954523ccb36a92221f12a52d22be6ea0f2ffa3409dd59c79\",\"license\":\"MIT\"},\"contracts/libraries/EIP712.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n\\npragma solidity =0.6.12;\\n\\nlibrary EIP712 {\\n    function recover(\\n        // solhint-disable-next-line var-name-mixedcase\\n        bytes32 DOMAIN_SEPARATOR,\\n        bytes32 hash,\\n        uint8 v,\\n        bytes32 r,\\n        bytes32 s\\n    ) internal pure returns (address) {\\n        bytes32 digest = keccak256(abi.encodePacked(\\\"\\\\x19\\\\x01\\\", DOMAIN_SEPARATOR, hash));\\n        return ecrecover(digest, v, r, s);\\n    }\\n}\\n\",\"keccak256\":\"0x5cfd1b95ffdc538e91264a11751b282746ef7c023f60d90bfda30225455ecbfa\",\"license\":\"MIT\"},\"contracts/libraries/Orders.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n\\npragma solidity =0.6.12;\\n\\nlibrary Orders {\\n    // keccak256(\\\"Order(address maker,address fromToken,address toToken,uint256 amountIn,uint256 amountOutMin,address recipient,uint256 deadline)\\\")\\n    bytes32 public constant ORDER_TYPEHASH = 0x7c228c78bd055996a44b5046fb56fa7c28c66bce92d9dc584f742b2cd76a140f;\\n\\n    struct Order {\\n        address maker;\\n        address fromToken;\\n        address toToken;\\n        uint256 amountIn;\\n        uint256 amountOutMin;\\n        address recipient;\\n        uint256 deadline;\\n        uint8 v;\\n        bytes32 r;\\n        bytes32 s;\\n    }\\n\\n    function hash(Order memory order) internal pure returns (bytes32) {\\n        return\\n            keccak256(\\n                abi.encode(\\n                    ORDER_TYPEHASH,\\n                    order.maker,\\n                    order.fromToken,\\n                    order.toToken,\\n                    order.amountIn,\\n                    order.amountOutMin,\\n                    order.recipient,\\n                    order.deadline\\n                )\\n            );\\n    }\\n\\n    function validate(Order memory order) internal {\\n        require(order.maker != address(0), \\\"invalid-maker\\\");\\n        require(order.fromToken != address(0), \\\"invalid-from-token\\\");\\n        require(order.toToken != address(0), \\\"invalid-to-token\\\");\\n        require(order.fromToken != order.toToken, \\\"duplicate-tokens\\\");\\n        require(order.amountIn > 0, \\\"invalid-amount-in\\\");\\n        require(order.amountOutMin > 0, \\\"invalid-amount-out-min\\\");\\n        require(order.recipient != address(0), \\\"invalid-recipient\\\");\\n        require(order.deadline > 0, \\\"invalid-deadline\\\");\\n    }\\n}\\n\",\"keccak256\":\"0x83dd8af752346b978ca24ec17c5eccc9378889e91e14cdff84561a3ec778af4a\",\"license\":\"MIT\"}},\"version\":1}",
    "bytecode": "0x60a060405234801561001057600080fd5b50604051469061008c907f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f907f84ec3e40ac87b7e93d40b42ac60cbcf224a757106614dac5eb0cc5fc9be1f03c907fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc690859030906020016100ad565b60408051601f198184030181529190528051602090910120608052506100d9565b9485526020850193909352604084019190915260608301526001600160a01b0316608082015260a00190565b608051610e7f6100f86000398061026e52806104445250610e7f6000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80635fd45d24116100715780635fd45d241461012557806365f7a5511461013857806375af1c361461014b578063bceb45db14610153578063d08b34bb1461017c578063df4c1b4114610191576100a9565b806303e0992f146100ae5780630777aa32146100d757806314eaa868146100ea5780633644e5151461010a5780633d91efcf14610112575b600080fd5b6100c16100bc366004610a1b565b6101a4565b6040516100ce9190610c0f565b60405180910390f35b6100c16100e5366004610a1b565b6101bf565b6100fd6100f8366004610a36565b6101da565b6040516100ce9190610bcb565b6100c161026c565b6100c1610120366004610a1b565b610290565b6100fd610133366004610a36565b6102ab565b6100fd610146366004610a36565b610333565b6100c16103bb565b610166610161366004610a69565b6103c1565b6040516100ce9a99989796959493929190610b6c565b61018f61018a366004610a81565b610427565b005b6100fd61019f366004610b30565b610677565b6001600160a01b031660009081526002602052604090205490565b6001600160a01b031660009081526001602052604090205490565b6060610264838360026000886001600160a01b03166001600160a01b0316815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561025057602002820191906000526020600020905b81548152602001906001019080831161023c575b50505050506106e59092919063ffffffff16565b949350505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b6001600160a01b031660009081526003602052604090205490565b6060610264838360016000886001600160a01b03166001600160a01b03168152602001908152602001600020805480602002602001604051908101604052809291908181526020018280548015610250576020028201919060005260206000209081548152602001906001019080831161023c5750505050506106e59092919063ffffffff16565b6060610264838360036000886001600160a01b03166001600160a01b03168152602001908152602001600020805480602002602001604051908101604052809291908181526020018280548015610250576020028201919060005260206000209081548152602001906001019080831161023c5750505050506106e59092919063ffffffff16565b60005490565b600460208190526000918252604090912080546001820154600283015460038401549484015460058501546006860154600787015460088801546009909801546001600160a01b0397881699968816989588169794959390941693919260ff909116918a565b610430816107a4565b600061043b826108f2565b9050600061047a7f0000000000000000000000000000000000000000000000000000000000000000838560e0015186610100015187610120015161096a565b90506001600160a01b038116158015906104a0575082516001600160a01b038281169116145b6104c55760405162461bcd60e51b81526004016104bc90610d1c565b60405180910390fd5b6000828152600460205260409020546001600160a01b0316156104fa5760405162461bcd60e51b81526004016104bc90610c7a565b6000828152600460208181526040808420875181546001600160a01b03199081166001600160a01b039283161783558985018051600180860180548516928616929092179091558b860180516002808801805487169288169290921790915560608e015160038089019190915560808f01519a88019a909a5560a08e01516005880180549096169087161790945560c08d0151600687015560e08d015160078701805460ff191660ff9092169190911790556101008d015160088701556101208d015160099096019590955588548082018a558980527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563018b90558b518416895280875285892080548083018255908a52878a20018b9055905183168852908552838720805480830182559088528588200189905591511685529282528084208054938401815584529083209091018490555183917f918554b6bd6e2895ce6553de5de0e1a69db5289aa0e4fe193a0dcd1f1434747791a2505050565b60606106dc83836000805480602002602001604051908101604052809291908181526020018280548015610250576020028201919060005260206000209081548152602001906001019080831161023c5750505050506106e59092919063ffffffff16565b90505b92915050565b60608167ffffffffffffffff811180156106fe57600080fd5b50604051908082528060200260200182016040528015610728578160200160208202803683370190505b50905060005b8281101561079c578451818486020110610763576000801b82828151811061075257fe5b602002602001018181525050610794565b8481848602018151811061077357fe5b602002602001015182828151811061078757fe5b6020026020010181815250505b60010161072e565b509392505050565b80516001600160a01b03166107cb5760405162461bcd60e51b81526004016104bc90610cf5565b60208101516001600160a01b03166107f55760405162461bcd60e51b81526004016104bc90610df6565b60408101516001600160a01b031661081f5760405162461bcd60e51b81526004016104bc90610ccb565b80604001516001600160a01b031681602001516001600160a01b031614156108595760405162461bcd60e51b81526004016104bc90610d77565b600081606001511161087d5760405162461bcd60e51b81526004016104bc90610dcb565b60008160800151116108a15760405162461bcd60e51b81526004016104bc90610d47565b60a08101516001600160a01b03166108cb5760405162461bcd60e51b81526004016104bc90610ca0565b60008160c00151116108ef5760405162461bcd60e51b81526004016104bc90610da1565b50565b80516020808301516040808501516060860151608087015160a088015160c0890151945160009861094d987f7c228c78bd055996a44b5046fb56fa7c28c66bce92d9dc584f742b2cd76a140f98919791969594939201610c18565b604051602081830303815290604052805190602001209050919050565b6000808686604051602001610980929190610b51565b604051602081830303815290604052805190602001209050600181868686604051600081526020016040526040516109bb9493929190610c5c565b6020604051602081039080840390855afa1580156109dd573d6000803e3d6000fd5b5050604051601f19015198975050505050505050565b80356001600160a01b03811681146106df57600080fd5b803560ff811681146106df57600080fd5b600060208284031215610a2c578081fd5b6106dc83836109f3565b600080600060608486031215610a4a578182fd5b610a5485856109f3565b95602085013595506040909401359392505050565b600060208284031215610a7a578081fd5b5035919050565b6000610140808385031215610a94578182fd5b610a9d81610e22565b9050610aa984846109f3565b8152610ab884602085016109f3565b6020820152610aca84604085016109f3565b60408201526060830135606082015260808301356080820152610af08460a085016109f3565b60a082015260c083013560c0820152610b0c8460e08501610a0a565b60e08201526101008381013590820152610120928301359281019290925250919050565b60008060408385031215610b42578182fd5b50508035926020909101359150565b61190160f01b81526002810192909252602282015260420190565b6001600160a01b039a8b168152988a1660208a0152968916604089015260608801959095526080870193909352951660a085015260c084019490945260ff90931660e08301526101008201929092526101208101919091526101400190565b6020808252825182820181905260009190848201906040850190845b81811015610c0357835183529284019291840191600101610be7565b50909695505050505050565b90815260200190565b9788526001600160a01b03968716602089015294861660408801529285166060870152608086019190915260a085015290911660c083015260e08201526101000190565b93845260ff9290921660208401526040830152606082015260800190565b6020808252600c908201526b6f726465722d65786973747360a01b604082015260600190565b6020808252601190820152701a5b9d985b1a590b5c9958da5c1a595b9d607a1b604082015260600190565b60208082526010908201526f34b73b30b634b216ba3796ba37b5b2b760811b604082015260600190565b6020808252600d908201526c34b73b30b634b216b6b0b5b2b960991b604082015260600190565b602080825260119082015270696e76616c69642d7369676e617475726560781b604082015260600190565b60208082526016908201527534b73b30b634b216b0b6b7bab73a16b7baba16b6b4b760511b604082015260600190565b60208082526010908201526f6475706c69636174652d746f6b656e7360801b604082015260600190565b60208082526010908201526f696e76616c69642d646561646c696e6560801b604082015260600190565b60208082526011908201527034b73b30b634b216b0b6b7bab73a16b4b760791b604082015260600190565b60208082526012908201527134b73b30b634b216b33937b696ba37b5b2b760711b604082015260600190565b60405181810167ffffffffffffffff81118282101715610e4157600080fd5b60405291905056fea2646970667358221220d0b9d426f7d762566b8cc8e9e7b3a402174b3a14e5bd6737680d6a3477919ecf64736f6c634300060c0033",
    "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100a95760003560e01c80635fd45d24116100715780635fd45d241461012557806365f7a5511461013857806375af1c361461014b578063bceb45db14610153578063d08b34bb1461017c578063df4c1b4114610191576100a9565b806303e0992f146100ae5780630777aa32146100d757806314eaa868146100ea5780633644e5151461010a5780633d91efcf14610112575b600080fd5b6100c16100bc366004610a1b565b6101a4565b6040516100ce9190610c0f565b60405180910390f35b6100c16100e5366004610a1b565b6101bf565b6100fd6100f8366004610a36565b6101da565b6040516100ce9190610bcb565b6100c161026c565b6100c1610120366004610a1b565b610290565b6100fd610133366004610a36565b6102ab565b6100fd610146366004610a36565b610333565b6100c16103bb565b610166610161366004610a69565b6103c1565b6040516100ce9a99989796959493929190610b6c565b61018f61018a366004610a81565b610427565b005b6100fd61019f366004610b30565b610677565b6001600160a01b031660009081526002602052604090205490565b6001600160a01b031660009081526001602052604090205490565b6060610264838360026000886001600160a01b03166001600160a01b0316815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561025057602002820191906000526020600020905b81548152602001906001019080831161023c575b50505050506106e59092919063ffffffff16565b949350505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b6001600160a01b031660009081526003602052604090205490565b6060610264838360016000886001600160a01b03166001600160a01b03168152602001908152602001600020805480602002602001604051908101604052809291908181526020018280548015610250576020028201919060005260206000209081548152602001906001019080831161023c5750505050506106e59092919063ffffffff16565b6060610264838360036000886001600160a01b03166001600160a01b03168152602001908152602001600020805480602002602001604051908101604052809291908181526020018280548015610250576020028201919060005260206000209081548152602001906001019080831161023c5750505050506106e59092919063ffffffff16565b60005490565b600460208190526000918252604090912080546001820154600283015460038401549484015460058501546006860154600787015460088801546009909801546001600160a01b0397881699968816989588169794959390941693919260ff909116918a565b610430816107a4565b600061043b826108f2565b9050600061047a7f0000000000000000000000000000000000000000000000000000000000000000838560e0015186610100015187610120015161096a565b90506001600160a01b038116158015906104a0575082516001600160a01b038281169116145b6104c55760405162461bcd60e51b81526004016104bc90610d1c565b60405180910390fd5b6000828152600460205260409020546001600160a01b0316156104fa5760405162461bcd60e51b81526004016104bc90610c7a565b6000828152600460208181526040808420875181546001600160a01b03199081166001600160a01b039283161783558985018051600180860180548516928616929092179091558b860180516002808801805487169288169290921790915560608e015160038089019190915560808f01519a88019a909a5560a08e01516005880180549096169087161790945560c08d0151600687015560e08d015160078701805460ff191660ff9092169190911790556101008d015160088701556101208d015160099096019590955588548082018a558980527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563018b90558b518416895280875285892080548083018255908a52878a20018b9055905183168852908552838720805480830182559088528588200189905591511685529282528084208054938401815584529083209091018490555183917f918554b6bd6e2895ce6553de5de0e1a69db5289aa0e4fe193a0dcd1f1434747791a2505050565b60606106dc83836000805480602002602001604051908101604052809291908181526020018280548015610250576020028201919060005260206000209081548152602001906001019080831161023c5750505050506106e59092919063ffffffff16565b90505b92915050565b60608167ffffffffffffffff811180156106fe57600080fd5b50604051908082528060200260200182016040528015610728578160200160208202803683370190505b50905060005b8281101561079c578451818486020110610763576000801b82828151811061075257fe5b602002602001018181525050610794565b8481848602018151811061077357fe5b602002602001015182828151811061078757fe5b6020026020010181815250505b60010161072e565b509392505050565b80516001600160a01b03166107cb5760405162461bcd60e51b81526004016104bc90610cf5565b60208101516001600160a01b03166107f55760405162461bcd60e51b81526004016104bc90610df6565b60408101516001600160a01b031661081f5760405162461bcd60e51b81526004016104bc90610ccb565b80604001516001600160a01b031681602001516001600160a01b031614156108595760405162461bcd60e51b81526004016104bc90610d77565b600081606001511161087d5760405162461bcd60e51b81526004016104bc90610dcb565b60008160800151116108a15760405162461bcd60e51b81526004016104bc90610d47565b60a08101516001600160a01b03166108cb5760405162461bcd60e51b81526004016104bc90610ca0565b60008160c00151116108ef5760405162461bcd60e51b81526004016104bc90610da1565b50565b80516020808301516040808501516060860151608087015160a088015160c0890151945160009861094d987f7c228c78bd055996a44b5046fb56fa7c28c66bce92d9dc584f742b2cd76a140f98919791969594939201610c18565b604051602081830303815290604052805190602001209050919050565b6000808686604051602001610980929190610b51565b604051602081830303815290604052805190602001209050600181868686604051600081526020016040526040516109bb9493929190610c5c565b6020604051602081039080840390855afa1580156109dd573d6000803e3d6000fd5b5050604051601f19015198975050505050505050565b80356001600160a01b03811681146106df57600080fd5b803560ff811681146106df57600080fd5b600060208284031215610a2c578081fd5b6106dc83836109f3565b600080600060608486031215610a4a578182fd5b610a5485856109f3565b95602085013595506040909401359392505050565b600060208284031215610a7a578081fd5b5035919050565b6000610140808385031215610a94578182fd5b610a9d81610e22565b9050610aa984846109f3565b8152610ab884602085016109f3565b6020820152610aca84604085016109f3565b60408201526060830135606082015260808301356080820152610af08460a085016109f3565b60a082015260c083013560c0820152610b0c8460e08501610a0a565b60e08201526101008381013590820152610120928301359281019290925250919050565b60008060408385031215610b42578182fd5b50508035926020909101359150565b61190160f01b81526002810192909252602282015260420190565b6001600160a01b039a8b168152988a1660208a0152968916604089015260608801959095526080870193909352951660a085015260c084019490945260ff90931660e08301526101008201929092526101208101919091526101400190565b6020808252825182820181905260009190848201906040850190845b81811015610c0357835183529284019291840191600101610be7565b50909695505050505050565b90815260200190565b9788526001600160a01b03968716602089015294861660408801529285166060870152608086019190915260a085015290911660c083015260e08201526101000190565b93845260ff9290921660208401526040830152606082015260800190565b6020808252600c908201526b6f726465722d65786973747360a01b604082015260600190565b6020808252601190820152701a5b9d985b1a590b5c9958da5c1a595b9d607a1b604082015260600190565b60208082526010908201526f34b73b30b634b216ba3796ba37b5b2b760811b604082015260600190565b6020808252600d908201526c34b73b30b634b216b6b0b5b2b960991b604082015260600190565b602080825260119082015270696e76616c69642d7369676e617475726560781b604082015260600190565b60208082526016908201527534b73b30b634b216b0b6b7bab73a16b7baba16b6b4b760511b604082015260600190565b60208082526010908201526f6475706c69636174652d746f6b656e7360801b604082015260600190565b60208082526010908201526f696e76616c69642d646561646c696e6560801b604082015260600190565b60208082526011908201527034b73b30b634b216b0b6b7bab73a16b4b760791b604082015260600190565b60208082526012908201527134b73b30b634b216b33937b696ba37b5b2b760711b604082015260600190565b60405181810167ffffffffffffffff81118282101715610e4157600080fd5b60405291905056fea2646970667358221220d0b9d426f7d762566b8cc8e9e7b3a402174b3a14e5bd6737680d6a3477919ecf64736f6c634300060c0033",
    "devdoc": {
      "kind": "dev",
      "methods": {},
      "version": 1
    },
    "userdoc": {
      "kind": "user",
      "methods": {},
      "version": 1
    },
    "storageLayout": {
      "storage": [
        {
          "astId": 1055,
          "contract": "contracts/OrderBook.sol:OrderBook",
          "label": "_allHashes",
          "offset": 0,
          "slot": "0",
          "type": "t_array(t_bytes32)dyn_storage"
        },
        {
          "astId": 1060,
          "contract": "contracts/OrderBook.sol:OrderBook",
          "label": "_hashesOfMaker",
          "offset": 0,
          "slot": "1",
          "type": "t_mapping(t_address,t_array(t_bytes32)dyn_storage)"
        },
        {
          "astId": 1065,
          "contract": "contracts/OrderBook.sol:OrderBook",
          "label": "_hashesOfFromToken",
          "offset": 0,
          "slot": "2",
          "type": "t_mapping(t_address,t_array(t_bytes32)dyn_storage)"
        },
        {
          "astId": 1070,
          "contract": "contracts/OrderBook.sol:OrderBook",
          "label": "_hashesOfToToken",
          "offset": 0,
          "slot": "3",
          "type": "t_mapping(t_address,t_array(t_bytes32)dyn_storage)"
        },
        {
          "astId": 1074,
          "contract": "contracts/OrderBook.sol:OrderBook",
          "label": "orderOfHash",
          "offset": 0,
          "slot": "4",
          "type": "t_mapping(t_bytes32,t_struct(Order)1948_storage)"
        }
      ],
      "types": {
        "t_address": {
          "encoding": "inplace",
          "label": "address",
          "numberOfBytes": "20"
        },
        "t_array(t_bytes32)dyn_storage": {
          "base": "t_bytes32",
          "encoding": "dynamic_array",
          "label": "bytes32[]",
          "numberOfBytes": "32"
        },
        "t_bytes32": {
          "encoding": "inplace",
          "label": "bytes32",
          "numberOfBytes": "32"
        },
        "t_mapping(t_address,t_array(t_bytes32)dyn_storage)": {
          "encoding": "mapping",
          "key": "t_address",
          "label": "mapping(address => bytes32[])",
          "numberOfBytes": "32",
          "value": "t_array(t_bytes32)dyn_storage"
        },
        "t_mapping(t_bytes32,t_struct(Order)1948_storage)": {
          "encoding": "mapping",
          "key": "t_bytes32",
          "label": "mapping(bytes32 => struct Orders.Order)",
          "numberOfBytes": "32",
          "value": "t_struct(Order)1948_storage"
        },
        "t_struct(Order)1948_storage": {
          "encoding": "inplace",
          "label": "struct Orders.Order",
          "members": [
            {
              "astId": 1929,
              "contract": "contracts/OrderBook.sol:OrderBook",
              "label": "maker",
              "offset": 0,
              "slot": "0",
              "type": "t_address"
            },
            {
              "astId": 1931,
              "contract": "contracts/OrderBook.sol:OrderBook",
              "label": "fromToken",
              "offset": 0,
              "slot": "1",
              "type": "t_address"
            },
            {
              "astId": 1933,
              "contract": "contracts/OrderBook.sol:OrderBook",
              "label": "toToken",
              "offset": 0,
              "slot": "2",
              "type": "t_address"
            },
            {
              "astId": 1935,
              "contract": "contracts/OrderBook.sol:OrderBook",
              "label": "amountIn",
              "offset": 0,
              "slot": "3",
              "type": "t_uint256"
            },
            {
              "astId": 1937,
              "contract": "contracts/OrderBook.sol:OrderBook",
              "label": "amountOutMin",
              "offset": 0,
              "slot": "4",
              "type": "t_uint256"
            },
            {
              "astId": 1939,
              "contract": "contracts/OrderBook.sol:OrderBook",
              "label": "recipient",
              "offset": 0,
              "slot": "5",
              "type": "t_address"
            },
            {
              "astId": 1941,
              "contract": "contracts/OrderBook.sol:OrderBook",
              "label": "deadline",
              "offset": 0,
              "slot": "6",
              "type": "t_uint256"
            },
            {
              "astId": 1943,
              "contract": "contracts/OrderBook.sol:OrderBook",
              "label": "v",
              "offset": 0,
              "slot": "7",
              "type": "t_uint8"
            },
            {
              "astId": 1945,
              "contract": "contracts/OrderBook.sol:OrderBook",
              "label": "r",
              "offset": 0,
              "slot": "8",
              "type": "t_bytes32"
            },
            {
              "astId": 1947,
              "contract": "contracts/OrderBook.sol:OrderBook",
              "label": "s",
              "offset": 0,
              "slot": "9",
              "type": "t_bytes32"
            }
          ],
          "numberOfBytes": "320"
        },
        "t_uint256": {
          "encoding": "inplace",
          "label": "uint256",
          "numberOfBytes": "32"
        },
        "t_uint8": {
          "encoding": "inplace",
          "label": "uint8",
          "numberOfBytes": "1"
        }
      }
    }
  }

// const maker = owner;
// const fromToken = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
// const toToken = "0x6b175474e89094c44da98b954eedeac495271d0f";

// const amountIn = utils.parseUnits("0.04", 18);
// const amountOutMin = utils.parseUnits("80", 18);
// const recipient = owner;
// const deadline = BigNumber.from(0x604c6f94);

interface Order {
  maker: string,
  fromToken: string,
  toToken: string,
  amountIn: BigNumber,
  amountOutMin: BigNumber,
  recipient: string,
  deadline: BigNumber
}

let orders: Order[] = [];
async function getOrders() {
  const web3 = new Web3(ASCProvider);
  const nftContract = new web3.eth.Contract(orderNftJSON.abi, orderNftJSON.address);
  const ordersCount = await nftContract.methods.getOrderQuantity().call();
  for (let i = 0; i < ordersCount; i++) {
    const {maker, fromToken, toToken, amountIn, amountOutMin, recipient, deadline } = await nftContract.methods.getOrder(i).call();
    orders.push({maker, fromToken, toToken, amountIn, amountOutMin, recipient, deadline});
  }
    
}

function signOrder(id: number) {

  const {maker, fromToken, toToken, amountIn, amountOutMin, recipient, deadline} = orders[id];
  console.log(maker);
  console.log(fromToken);
  console.log(toToken);
  console.log(amountIn);
  console.log(amountOutMin);
  console.log(recipient);
  console.log(deadline);

  let typedData: TypedData = {
    types: {
      EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
      ],
      Order: [
          { name: "maker", type: "address" },
          { name: "fromToken", type: "address" },
          { name: "toToken", type: "address" },
          { name: "amountIn", type: "uint256" },
          { name: "amountOutMin", type: "uint256" },
          { name: "recipient", type: "address" },
          { name: "deadline", type: "uint256" }
      ]
    },
    primaryType: 'Order',
    domain: {
      name: "OrderBook",
      version: "1",
      chainId: 42,
      verifyingContract: orderBookJSON.address
    },
    message: {
      maker,
      fromToken,
      toToken,
      amountIn,
      amountOutMin,
      recipient,
      deadline
    }
  };

  // Generate a random private key
  const privateKey = `0x${process.env.ACCOUNT_PRIVATE_KEY}`;
  const signingKey = new utils.SigningKey(privateKey);

  // Get a signable message from the typed data
  const message = getMessage(typedData, true);

  // Sign the message with the private key
  const { r, s, v } = signingKey.signDigest(message);

  /* eslint-disable no-console */
  console.log(`Message: 0x${message.toString('hex')}`);
  console.log(`Signature: (${r}, ${s}, ${v})`);
  return {r, s, v};
}

async function placeOrders() {
  const web3 = new Web3(orderBookProvider);
  const orderBookContract = new web3.eth.Contract(orderBookJSON.abi, orderBookJSON.address);
  for (let i = 0; i < orders.length; i++) {
    const {r, s, v} = signOrder(i);
    orderBookContract.methods.createOrder([orders[i].maker, orders[i].fromToken, orders[i].toToken, orders[i].amountIn, orders[i].amountOutMin, orders[i].recipient, orders[i].deadline, v, r, s]).send({ from: owner })
      .on('receipt', function (receipt:any) {
          console.log(receipt);
      })
      .on('error', function (error:any) {
          console.log("ERROR");
          console.log(error);
      })
  }
}

getOrders();
placeOrders();