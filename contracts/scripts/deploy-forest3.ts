import * as hardhat from "hardhat";

async function sleep(ts: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ts);
  });
}

async function main() {
  const Forest3 = await hardhat.ethers.getContractFactory("Forest3");
  const Forest3 = await Forest3.deploy();
  await Forest3.waitForDeployment();
  const CONTRACT_ADDRESS = await Forest3.getAddress();
  console.log(`Forest3 contract deployed to ${CONTRACT_ADDRESS}`);

  await sleep(5000);

  await hardhat.run("verify", {
    address: CONTRACT_ADDRESS,
    constructorArgsParams: [],
    contract: "contracts/Forest3.sol:Forest3",
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// hardhat verify --network sepolia {address} {arg1} {arg2}
// hardhat run scripts/deploy.ts --network sepolia
