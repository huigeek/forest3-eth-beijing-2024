'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Select, Box } from '@chakra-ui/react';

const Vote = () => {
  const [members, setMembers] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [voted, setVoted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch the group members from the contract or backend API
    // This is a placeholder; replace with actual logic
    setMembers(['0x123...', '0x456...', '0x789...']);
  }, []);

  const handleVote = () => {
    // Handle vote logic here
    // For example, you might call a smart contract method to submit the votes
    setVoted(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.target.options;
    const selected: string[] = [];
    for (let i = 0, len = options.length; i < len; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedMembers(selected);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Vote</h2>
      <Box mb={4}>
        <Select multiple placeholder="Select members to vote for" onChange={handleChange}>
          {members.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </Select>
      </Box>
      <Button onClick={handleVote} disabled={voted}>
        {voted ? 'Wait for settlement' : 'Vote'}
      </Button>
    </div>
  );
};

export default Vote;