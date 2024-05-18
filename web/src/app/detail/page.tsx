"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Flex, Heading, List, ListItem, Text } from "@chakra-ui/react";

function Detail() {
  const [groupAddress, setGroupAddress] = useState("0x1234567890abcdef"); // Replace with actual logic
  const [members, setMembers] = useState(["0x123...", "0x456...", "0x789..."]); // Replace with actual logic
  const [endTime, setEndTime] = useState(new Date(Date.now() + 3600000)); // Replace with actual logic
  const [timeRemaining, setTimeRemaining] = useState("");
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const distance = endTime.getTime() - now.getTime();
      if (distance < 0) {
        clearInterval(interval);
        setTimeRemaining("EXPIRED");
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const handleVote = () => {
    // Handle vote logic here
    router.push("/vote");
  };

  return (
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
            {members.map(member => (
              <ListItem key={member}>{member}</ListItem>
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
  );
}

export default Detail;
