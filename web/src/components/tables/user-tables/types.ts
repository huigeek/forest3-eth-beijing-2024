export interface User {
  memberAddress: string;
  stakeAmount: bigint;
  hasVoted: boolean;
  hasCompletedGoal: boolean;
  hasWithdraw: boolean;
  votesReceived: bigint;
}
