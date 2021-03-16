import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { OrderCore } from "../typechain/OrderCore";
import { Signer, utils, BigNumber } from "ethers";

chai.use(solidity);
const { expect } = chai;

describe("Greed", () => {
  let nft: OrderCore;
  let signers: Signer[];

  beforeEach(async () => {
    // 1
    signers = await ethers.getSigners();

    // 2
    const nftFactory = await ethers.getContractFactory(
      "OrderCore",
      signers[0]
    );
    nft = (await nftFactory.deploy()) as OrderCore;
    await nft.deployed();
  });

  // 4
  describe("Create Order", async () => {
    it("should create one order", async () => {
        const maker = await signers[0].getAddress();
        const fromToken = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
        const toToken = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

        const amountIn = utils.parseUnits("0.04", 18);
        const amountOutMin = utils.parseUnits("80", 18);
        const recipient = await signers[0].getAddress();
        const deadline = BigNumber.from(0x604c6f94);

        await nft.createOrder(maker, fromToken, toToken, amountIn, amountOutMin, recipient, deadline);
        let balance = await nft.ownershipOrderCount(await signers[0].getAddress());
        expect(balance).to.eq(1);

        const orderInfo = await nft.getOrder(0);
        expect(orderInfo.maker).to.eq(maker);
        expect(orderInfo.fromToken).to.eq(fromToken);
        expect(orderInfo.toToken).to.eq(toToken);
        expect(orderInfo.amountIn).to.eq(amountIn);
        expect(orderInfo.amountOutMin).to.eq(amountOutMin);
        expect(orderInfo.recipient).to.eq(recipient);
        expect(orderInfo.deadline).to.eq(deadline);
    });
  });

//   describe("Approve and TransferFrom", async () => {
//     it("should mint 100 tokens", async () => {
//       await greed.mint(await signers[0].getAddress(), utils.parseUnits('100', 18));
//       let balance = await greed.balanceOf(await signers[0].getAddress());
//       expect(balance).to.eq(utils.parseUnits('100', 18));
//       await greed.approve(await signers[1].getAddress(), utils.parseUnits('10', 18));
//       await greed.connect(signers[1]).transferFrom(await signers[0].getAddress(), await signers[2].getAddress(), utils.parseUnits('10', 18));
//       balance = await greed.balanceOf(await signers[0].getAddress());
//       expect(balance).to.eq(utils.parseUnits('90', 18));
//       balance = await greed.balanceOf(await signers[2].getAddress());
//       expect(balance).to.eq(utils.parseUnits('10', 18));
//     });
//   });
});
