import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { Greed } from "../typechain/Greed";
import { OrderCore } from "../typechain/OrderCore";
import { Aggregator } from "../typechain/Aggregator";
import { Signer, utils, BigNumber } from "ethers";
import { sign } from "crypto";

chai.use(solidity);
const { expect } = chai;
const DURATION = 5;
const PRICE_START = Number(utils.parseUnits('0.01', 18));
const PRICE_END = Number(utils.parseUnits('0.05', 18));
const OFFSET = 100;

describe("Counter", () => {
  let greed: Greed;
  let nft: OrderCore;
  let asc: Aggregator;
  let signers: Signer[];
  const WETH = "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1";
  
  
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

    const nftFactory = await ethers.getContractFactory(
      "OrderCore",
      signers[0]
    );
    nft = (await nftFactory.deploy()) as OrderCore;
    await nft.deployed();

    const ascFactory = await ethers.getContractFactory(
      "Aggregator",
      signers[0]
    )
    asc = (await ascFactory.deploy(greed.address, nft.address, await signers[0].getAddress())) as Aggregator;
    await asc.deployed();
  });

  // 4
  describe("ASC deployed", async () => {
    it("should deployed", async () => {
      let greedAddr = await asc.greedAddr();
      expect(greedAddr).to.eq(greed.address);
      let nftAddr = await asc.orderAddr();
      expect(nftAddr).to.eq(nft.address);
    });
  });

  describe("ASC Start", async () => {
    it("should asc started", async () => {
      let blockNumberStart = await asc.blockNumberStart();
      expect(blockNumberStart).to.eq(0);
      let isStarted = await asc.isStarted();
      expect(isStarted).to.eq(false);
      await asc.start();
      isStarted = await asc.isStarted();
      expect(isStarted).to.eq(true);
    });
  });

  describe("ASC Deposit", async () => {
    it("should asc deposited", async () => {
      let isStarted = await asc.isStarted();
      expect(isStarted).to.eq(false);
      await asc.start();
      isStarted = await asc.isStarted();
      expect(isStarted).to.eq(true);

      let balance = await nft.ownershipOrderCount(await signers[0].getAddress());
      expect(balance).to.eq(0);

      balance = await nft.ownershipOrderCount(await signers[1].getAddress());
      expect(balance).to.eq(0);

      await asc.deposit(utils.parseUnits('0.51', 18), {value: utils.parseUnits('1', 18)})
      await asc.connect(signers[1]).deposit(utils.parseUnits('0.6', 18), {value: utils.parseUnits('2', 18)});

      balance = await nft.ownershipOrderCount(await signers[0].getAddress());
      expect(balance).to.eq(1);

      balance = await nft.ownershipOrderCount(await signers[1].getAddress());
      expect(balance).to.eq(1);


      const orderInfo = await nft.getOrder(0);
      expect(orderInfo.maker).to.eq(await signers[0].getAddress());
      expect(orderInfo.fromToken).to.eq(greed.address);
      expect(orderInfo.toToken).to.eq(WETH);
      // expect(orderInfo.amountIn).to.eq(amountIn);
      // expect(orderInfo.amountOutMin).to.eq(amountOutMin);
      expect(orderInfo.recipient).to.eq(await signers[0].getAddress());
      // expect(orderInfo.deadline).to.eq(deadline);
    });
  });

  describe("ASC End", async () => {
    it("should asc ended", async () => {
      let isStarted = await asc.isStarted();
      expect(isStarted).to.eq(false);
      await asc.start();
      isStarted = await asc.isStarted();
      expect(isStarted).to.eq(true);

      let balance = await nft.ownershipOrderCount(await signers[0].getAddress());
      expect(balance).to.eq(0);

      balance = await nft.ownershipOrderCount(await signers[1].getAddress());
      expect(balance).to.eq(0);

      let strike = utils.parseUnits('0.51', 18);
      let ethAmount = 1;
      await asc.deposit(strike, {value: utils.parseUnits(ethAmount.toString(), 18)})
      
      balance = await nft.ownershipOrderCount(await signers[0].getAddress());
      expect(balance).to.eq(1);

      let totalAmountSold = 0;
      
      let priceLowerBound = Math.floor(PRICE_START+(PRICE_END-PRICE_START)*1/DURATION);
      let estimatedAmount = Math.floor(Number(utils.parseUnits(ethAmount.toString(), 18))/priceLowerBound);
      let bonusMultiplier = calculateBonusMultiplier(estimatedAmount, totalAmountSold);
      let amountSold = Math.floor(estimatedAmount * bonusMultiplier / 100);
      let amountOutMin = amountSold * Number(strike);
      let orderInfo = await nft.getOrder(0);
      expect(orderInfo.maker).to.eq(await signers[0].getAddress());
      expect(orderInfo.fromToken).to.eq(greed.address);
      expect(orderInfo.toToken).to.eq(WETH);
      expect(Number(orderInfo.amountIn)).to.eq(amountSold);
      expect(Number(orderInfo.amountOutMin)).to.eq(amountOutMin);
      expect(orderInfo.recipient).to.eq(await signers[0].getAddress());
      // expect(orderInfo.deadline).to.eq(deadline);
      let deadline = Number(orderInfo.deadline);

      totalAmountSold = amountSold;
      expect(Number(await asc.totalAmountSold())).to.eq(totalAmountSold);

      strike = utils.parseUnits('0.5', 18);
      ethAmount = 2;
      await asc.connect(signers[1]).deposit(strike, {value: utils.parseUnits(ethAmount.toString(), 18)})
      balance = await nft.ownershipOrderCount(await signers[1].getAddress());
      expect(balance).to.eq(1);

      priceLowerBound = Math.floor(PRICE_START+(PRICE_END-PRICE_START)*2/DURATION);
      estimatedAmount = Math.floor(Number(utils.parseUnits(ethAmount.toString(), 18))/priceLowerBound);
      bonusMultiplier = calculateBonusMultiplier(estimatedAmount, totalAmountSold);
      amountSold = Math.floor(estimatedAmount * bonusMultiplier / 100);
      amountOutMin = (amountSold) * Number(strike);
      orderInfo = await nft.getOrder(1);
      expect(orderInfo.maker).to.eq(await signers[1].getAddress());
      expect(orderInfo.fromToken).to.eq(greed.address);
      expect(orderInfo.toToken).to.eq(WETH);
      expect(Number(orderInfo.amountIn)).to.eq(amountSold);
      expect(Number(orderInfo.amountOutMin)).to.eq(amountOutMin);
      expect(orderInfo.recipient).to.eq(await signers[1].getAddress());
      expect(Number(orderInfo.deadline)).to.eq(deadline+1);

      totalAmountSold += amountSold;
      expect(Number(await asc.totalAmountSold())).to.eq(totalAmountSold);
      await asc.connect(signers[1]).deposit(utils.parseUnits('0.6', 18), {value: utils.parseUnits('2', 18)});
      await asc.connect(signers[1]).deposit(utils.parseUnits('0.6', 18), {value: utils.parseUnits('2', 18)});
      await asc.connect(signers[1]).deposit(utils.parseUnits('0.6', 18), {value: utils.parseUnits('2', 18)});

      await asc.end();
      totalAmountSold = Number(await asc.totalAmountSold());
      balance = await greed.balanceOf(await signers[0].getAddress());
      expect(Number(balance)).to.eq(totalAmountSold*2);
    });
  });
});

function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function calculateBonusMultiplier(estimatedAmount:number, totalAmountSold:number) {
  const val = Math.floor(estimatedAmount*(100)/(totalAmountSold+OFFSET));
  let bonusMultiplier = 0;
  if (val >= 500) {
      bonusMultiplier = 150;
  } else if (val >= 200) {
      bonusMultiplier = 140;
  } else if (val >= 100) {
      bonusMultiplier = 130;
  } else if (val >= 50) {
      bonusMultiplier = 120;
  } else if (val >= 25) {
      bonusMultiplier = 115;
  } else if (val >= 10) {
      bonusMultiplier = 110;
  } else if (val >= 5) {
      bonusMultiplier = 105;
  } else if (val >= 1) {
      bonusMultiplier = 101;
  }
  return bonusMultiplier;
}