'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Box, Heading, Flex } from '@chakra-ui/react';

const Join = () => {
  const [groupAddress, setGroupAddress] = useState('');
  const router = useRouter();

  const handleJoin = () => {
    // Handle join group logic here
    // For example, you might call a smart contract method to join the group
    router.push('/detail'); // Redirect to detail page after joining
  };

  return (
    <Box p={5}>
      <Heading as="h2" mb={5} textAlign="center">
        Join Task Group
      </Heading>
      <Flex direction="column" alignItems="center">
        <Input
          placeholder="Group Address"
          value={groupAddress}
          onChange={(e) => setGroupAddress(e.target.value)}
          mb={5}
          width="300px"
        />
        <Button onClick={handleJoin} colorScheme="teal">
          Join Group
        </Button>
      </Flex>
    </Box>
  );
};

export default Join;