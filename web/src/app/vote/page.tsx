"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Checkbox, CheckboxGroup, Flex, Heading } from "@chakra-ui/react";

function Vote() {
  const [members, setMembers] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [voted, setVoted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch the group members from the contract or backend API
    // This is a placeholder; replace with actual logic
    setMembers(["0x123...", "0x456...", "0x789..."]);
  }, []);

  const handleVote = () => {
    // Handle vote logic here
    // For example, you might call a smart contract method to submit the votes
    setVoted(true);
  };

  const handleChange = (value: string[]) => {
    setSelectedMembers(value);
  };

  return (
    <Flex direction="column" alignItems="center" justifyContent="flex-start" minHeight="100vh" p={5}>
      <Heading as="h2" mb={5} textAlign="center">
        Vote
      </Heading>
      <Box width="100%" maxWidth="600px">
        <Box textAlign="left">
          <CheckboxGroup onChange={handleChange} mb={5}>
            {members.map(member => (
              <Checkbox key={member} value={member} mb={3}>
                {member}
              </Checkbox>
            ))}
          </CheckboxGroup>
          <Button onClick={handleVote} disabled={voted} colorScheme="teal" display="block" mx="auto">
            {voted ? "Wait for settlement" : "Vote"}
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}

export default Vote;
