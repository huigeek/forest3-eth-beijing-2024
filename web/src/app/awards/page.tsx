"use client";
import { useAccount, useReadContracts, useWriteContract } from "wagmi";
import { CONTRACTS_ADDRESS } from "~/constants";
import { ABI } from "~/constants/abi";

import { Button } from "~/components/ui/button";

function Awards() {
  const account = useAccount();

  const {
    isPending,
    data,
    error,
  } = useReadContracts({
    contracts: [{
      address: CONTRACTS_ADDRESS,
      abi: ABI,
      functionName: "checkMember",
      args: [account.address],
    }, {
      address: CONTRACTS_ADDRESS,
      abi: ABI,
      functionName: "getMemberStatus",
      args: [account.address],
    }],
  });

  const {
    writeContract,
    error: writeError,
  } = useWriteContract();

  const [isMember, memberStatus] = data || [];
  // 处理加载状态
  if (isPending) {
    return <div>Loading...</div>;
  }

  // 处理错误
  if (error) {
    return (
      <div>
        Error:
        {error?.cause.shortMessage}
      </div>
    );
  }

  if (writeError) {
    return (
      <div>
        Error:
        {writeError?.cause.shortMessage}
      </div>
    );
  }

  if (isMember) {
    // hasCompletedGoal
    // hasVoted
    // hasWithdraw
    // 完成任务，并且参加过投票
    if (memberStatus.hasCompletedGoal && memberStatus.hasVoted) {

    }
    console.log(memberStatus);
  }
  const handleClaimRewards = () => {
    // 这里添加领取奖励的逻辑
    writeContract({
      address: CONTRACTS_ADDRESS,
      abi: ABI,
      functionName: "withdraw",
      args: [],
    });
  };
  return (
    <div className="h-full space-y-4 p-4 md:p-8 pt-6 bg-white">
      <div className="flex flex-col items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Hi, Here are your member benefits: 👋
        </h2>
        {memberStatus?.hasCompletedGoal && <p>You have completed your goal.</p>}
        {memberStatus?.hasVoted && <p>You have voted.</p>}
        {memberStatus?.hasWithdraw && <p>You have withdrawn your rewards.</p>}
        <div className="hidden md:flex items-center space-x-2">
          <Button onClick={handleClaimRewards}>Claim Rewards</Button>
        </div>
      </div>
    </div>
  );
}

export default Awards;
