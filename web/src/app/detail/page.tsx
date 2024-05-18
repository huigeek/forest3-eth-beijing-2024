"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, ChakraProvider, Flex, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACTS_ADDRESS } from "~/constants";
import { ABI } from "~/constants/abi";

function Detail() {
  const [groupAddress, setGroupAddress] = useState(CONTRACTS_ADDRESS);
  const [members, setMembers] = useState([]);
  const [endTime, setEndTime] = useState(new Date(Date.now() + 3600000));
  const [timeRemaining, setTimeRemaining] = useState("");
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
    router.push("/vote");
  };

  return (

    <ChakraProvider>
      <Flex direction="column" alignItems="center" justifyContent="flex-start" minHeight="100vh" p={5}>
        <Heading as="h2" mb={5} textAlign="center">
          Group Detail
        </Heading>
        <Box width="100%" maxWidth="600px">
          <Box textAlign="left">
            <Text fontSize="lg" mb={3}>
              Group Address:
              {groupAddress}
            </Text>
            <Heading as="h3" mb={3}>Members</Heading>
            <List spacing={2} mb={5}>
              {members?.map(member => (
                <ListItem key={member?.memberAddress}>{member?.memberAddress}</ListItem>
              ))}
            </List>
            <Text fontSize="lg" mb={5}>
              Time Remaining:
              {timeRemaining}
            </Text>
            <Button onClick={handleVote} disabled={timeRemaining === "EXPIRED"} colorScheme="teal">
              Vote
            </Button>
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>

  );
}

export default Detail;
