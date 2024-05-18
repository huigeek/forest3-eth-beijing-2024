"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, ChakraProvider, Checkbox, CheckboxGroup, Flex, Heading } from "@chakra-ui/react";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACTS_ADDRESS } from "~/constants";
import { ABI } from "~/constants/abi";

function Vote() {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [voted, setVoted] = useState(false);
  const router = useRouter();

  const account = useAccount();
  const {
    data: memberList,
    error,
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

  const handleVote = () => {
    // Handle vote logic here
    // For example, you might call a smart contract method to submit the votes
    setVoted(true);
  };

  const handleChange = (value: string[]) => {
    setSelectedMembers(value);
  };

  return (
    <ChakraProvider>
      <Flex direction="column" alignItems="center" justifyContent="flex-start" minHeight="100vh" p={5}>
        <Heading as="h2" mb={5} textAlign="center">
          Vote
        </Heading>
        <Box width="100%" maxWidth="600px">
          <Box textAlign="left">
            <CheckboxGroup onChange={handleChange} mb={5}>
              {members.map(member => (
                <Checkbox key={member?.memberAddress} value={member?.memberAddress} mb={3}>
                  {member?.memberAddress}
                </Checkbox>
              ))}
            </CheckboxGroup>
            <Button onClick={handleVote} disabled={voted} colorScheme="teal" display="block" mx="auto">
              {voted ? "Wait for settlement" : "Vote"}
            </Button>
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>

  );
}

export default Vote;
