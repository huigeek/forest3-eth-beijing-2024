'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Box, Heading, Text, Flex } from '@chakra-ui/react';

const Create = () => {
  const [target, setTarget] = useState('');
  const [money, setMoney] = useState('');
  const [endTime, setEndTime] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    // Handle form submission logic here
    // For example, you might call a smart contract method to create a new group
    router.push('/detail'); // Redirect to detail page after submission
  };

  return (
    <Box p={5}>
      <Heading as="h2" mb={5} textAlign="center">
        Create Task Group
      </Heading>
      <Flex direction="column" alignItems="center">
        <Input
          placeholder="Task Target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          mb={3}
          width="300px"
        />
        <Input
          placeholder="Set Money (ETH)"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
          type="number"
          mb={3}
          width="300px"
        />
        <Input
          placeholder="Set End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          type="datetime-local"
          mb={5}
          width="300px"
        />
        <Button onClick={handleSubmit} colorScheme="teal">
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default Create;