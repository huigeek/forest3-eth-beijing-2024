"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
// 假设你有一个更新后的columns数组，专门用于投票
import { columns as votingColumns } from "./columns";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
// 假设User类型已经被更新或替换为与投票相关的类型
import type { Voter } from "~/components/tables/voting-tables/types";
import { CONTRACTS_ADDRESS } from "~/constants";

interface VotingClientProps {
  data: Voter[];
}

export const VotingClient: React.FC<VotingClientProps> = ({ data }) => {
  const router = useRouter();
  const [groupAddress, setGroupAddress] = useState(CONTRACTS_ADDRESS);

  // 假设有一个新的状态来存储当前投票的截止时间
  const [votingDeadline, setVotingDeadline] = useState<Date | null>(null);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Voting for Group: ${groupAddress}`}
          description={`Total Voters (${data.length})`}
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/awards`)}
        >
          Cast Your Vote
        </Button>
      </div>
      <Separator />
      {/* 假设你有一个新组件来显示投票截止时间 */}
      {votingDeadline && (
        <div className="text-center">
          <Heading title={`Voting Deadline: ${votingDeadline}`} />
        </div>
      )}
      <DataTable searchKey="memberAddress" columns={votingColumns} data={data} />
    </>
  );
};
