import * as hardhat from "hardhat";

async function sleep(ts: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ts);
  });
}

async function main() {
  const Forest3 = await hardhat.ethers.getContractFactory("Forest3");
  const forest3 = await Forest3.deploy(
    "Goal Description", // _goal
    100, // _stakeAmount, 假设质押金额为100单位
    10, // _memberLimit, 假设成员限制为10
    600, // _goalDeadlineSeconds, 假设目标截止时间为10分钟（600秒）
    {
      value: 102,
    },
  );
  await forest3.waitForDeployment();
  const CONTRACT_ADDRESS = await forest3.getAddress();
  console.log(`Forest3 contract deployed to ${CONTRACT_ADDRESS}`);

  await sleep(5000);

  // await hardhat.run("verify", {
  //   address: CONTRACT_ADDRESS,
  //   constructorArgsParams: [],
  //   contract: "contracts/Forest3.sol:Forest3",
  // });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// hardhat verify --network sepolia {address} {arg1} {arg2}
// hardhat run scripts/deploy.ts --network sepolia
