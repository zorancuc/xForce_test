import { ethers } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory("Counter");
  const tokenFactory  = await ethers.getContractFactory("Greed");
  const OrderNftFactory = await ethers.getContractFactory("OrderCore");
  const AscFactory = await ethers.getContractFactory("Aggregator");
  
  const signers = await ethers.getSigners();
  // If we had constructor arguments, they would be passed into deploy()
  let contract = await factory.deploy();
  let tokenContract = await tokenFactory.deploy();
  let nftContract = await OrderNftFactory.deploy();
  let ascContract = await AscFactory.deploy(tokenContract.address, nftContract.address, await signers[0].getAddress());

  // The address the Contract WILL have once mined
  console.log(contract.address);
  console.log("Greed Token: ", tokenContract.address);
  console.log("Nft Order: ", nftContract.address);
  console.log("ASC: ", ascContract.address);

  // The transaction that was sent to the network to deploy the Contract
  console.log(contract.deployTransaction.hash);

  // The contract is NOT deployed yet; we must wait until it is mined
  await contract.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
