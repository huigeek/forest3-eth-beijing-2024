'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { Button, Box, Heading, Text, Flex } from '@chakra-ui/react';
import Link from 'next/link';

const Home = () => {
  const router = useRouter();
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
    }
  };

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={10}>
        <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
        <Button onClick={connectWallet}>
          {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
        </Button>
      </Flex>
      <Heading as="h1" mb={5} textAlign="center">
        Welcome to Forest3
      </Heading>
      <Text fontSize="xl" mb={10} textAlign="center">
        A decentralized task management platform
      </Text>
      <Flex justifyContent="center">
        <Link href="/create">
          <Button colorScheme="teal" size="lg" m={3}>
            Create Group
          </Button>
        </Link>
        <Link href="/join">
          <Button colorScheme="teal" size="lg" m={3}>
            Join Group
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default Home;