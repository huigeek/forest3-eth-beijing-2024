"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Checkbox, CheckboxGroup, Heading } from "@chakra-ui/react";
import { Button } from "~/components/ui/button";

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
    <Box p={5}>
      <Heading as="h2" mb={5} textAlign="center">
        Vote
      </Heading>
      <CheckboxGroup onChange={handleChange}>
        {members.map(member => (
          <Checkbox key={member} value={member} mb={3}>
            {member}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <Button onClick={handleVote} disabled={voted} mt={5}>
        {voted ? "Wait for settlement" : "Vote"}
      </Button>
    </Box>
  );
}

export default Vote;
