'use client';

import { useState } from 'react';
import { Button } from '@chakra-ui/react';

const Vote = () => {
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    // Handle vote logic here
    setVoted(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Vote</h2>
      <p>Choose the members you want to vote for:</p>
      <Button onClick={handleVote} disabled={voted}>
        {voted ? 'Wait for settlement' : 'Vote'}
      </Button>
    </div>
  );
};

export default Vote;
