"use client";
import { useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import { UserClient } from "~/components/tables/user-tables/client";
import { CONTRACTS_ADDRESS } from "~/constants";
import { ABI } from "~/constants/abi";

export default function page() {

  const [members, setMembers] = useState([]);
  const {
    data: memberList,
    _error,
    isPending,
  } = useReadContract({
    address: CONTRACTS_ADDRESS,
    abi: ABI,
    functionName: "getAllMemberStatus",
    args: [],
  });

  useEffect(() => {
    if (!isPending && memberList) {
      setMembers(memberList);
      console.log(memberList);
    }
  }, [memberList]);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6 bg-white">
        <UserClient data={members} />
      </div>
    </>
  );
}
