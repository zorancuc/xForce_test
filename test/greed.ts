import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { Greed } from "../typechain/Greed";
import { Signer, utils } from "ethers";

chai.use(solidity);
const { expect } = chai;

describe("Greed", () => {
  let greed: Greed;
  let signers: Signer[];

  beforeEach(async () => {
    // 1
    signers = await ethers.getSigners();

    // 2
    const greedFactory = await ethers.getContractFactory(
      "Greed",
      signers[0]
    );
    greed = (await greedFactory.deploy()) as Greed;
    await greed.deployed();
  });

  // 4
  describe("Mint", async () => {
    it("should mint 100 tokens", async () => {
      await greed.mint(await signers[0].getAddress(), utils.parseUnits('100', 18));
      let balance = await greed.balanceOf(await signers[0].getAddress());
      expect(balance).to.eq(utils.parseUnits('100', 18));
    });
  });

  describe("Approve and TransferFrom", async () => {
    it("should mint 100 tokens", async () => {
      await greed.mint(await signers[0].getAddress(), utils.parseUnits('100', 18));
      let balance = await greed.balanceOf(await signers[0].getAddress());
      expect(balance).to.eq(utils.parseUnits('100', 18));
      await greed.approve(await signers[1].getAddress(), utils.parseUnits('10', 18));
      await greed.connect(signers[1]).transferFrom(await signers[0].getAddress(), await signers[2].getAddress(), utils.parseUnits('10', 18));
      balance = await greed.balanceOf(await signers[0].getAddress());
      expect(balance).to.eq(utils.parseUnits('90', 18));
      balance = await greed.balanceOf(await signers[2].getAddress());
      expect(balance).to.eq(utils.parseUnits('10', 18));
    });
  });
});
