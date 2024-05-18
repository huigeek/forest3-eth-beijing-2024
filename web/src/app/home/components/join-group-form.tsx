import { useWriteContract } from "wagmi";
import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { parseEther } from "viem";
import { ABI } from "~/constants/abi";

export default function JoinGroupForm() {
  const [groupAddress, setGroupAddress] = useState("");
  const {
    isPending,
    writeContractAsync,
  } = useWriteContract();
  async function handleJoinGroup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const addr: `0x${string}` = formData.get("addr") as `0x${string}`;
    // 调用智能合约的joinGroup函数
    await writeContractAsync({
      address: addr,
      abi: ABI,
      functionName: "joinGroup",
      args: [],
      value: parseEther("0.01"),
    });
  }

  return (
    <Box as="form" onSubmit={handleJoinGroup}>
      <Input
        name="addr"
        placeholder="Group Address"
        value={groupAddress}
        onChange={e => setGroupAddress(e.target.value)}
        mb={4}
      />
      <Button type="submit" disabled={isPending} colorScheme="teal" size="lg" mt={4}>
        Join Group
      </Button>
    </Box>
  );
}
