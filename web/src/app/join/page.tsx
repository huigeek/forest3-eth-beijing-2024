'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@chakra-ui/react';

const Join = () => {
  const [groupAddress, setGroupAddress] = useState('');
  const router = useRouter();

  const handleJoin = () => {
    // Handle join group logic here
    // For example, you might call a smart contract method to join the group
    router.push('/detail'); // Redirect to detail page after joining
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Join Task Group</h2>
      <Input
        placeholder="Group Address"
        value={groupAddress}
        onChange={(e) => setGroupAddress(e.target.value)}
      />
      <Button onClick={handleJoin} style={{ marginTop: '20px' }}>
        Join Group
      </Button>
    </div>
  );
};

export default Join;