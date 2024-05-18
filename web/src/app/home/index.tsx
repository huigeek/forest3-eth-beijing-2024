"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import { Box, Button, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Home() {
  const router = useRouter();
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    }
  };

  return (
    <Flex minHeight="100vh">
      <Box className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex" flex="1" height="100vh">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Logo
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Forest3 Focused Forest is a decentralized application (DApp) based on blockchain technology designed to help users improve self-discipline and achieve personal goals through financial incentives and community support.&rdquo;
            </p>
            <footer className="text-sm">Kirk Lin</footer>
          </blockquote>
        </div>
      </Box>
      <Flex flex="1" direction="column" justifyContent="center" alignItems="center" height="100vh">
        <Box position="absolute" top="10" right="10">
          <ConnectButton />
        </Box>
        <Box className="p-4 lg:p-8 h-full flex items-center justify-center flex-col">
          <Heading as="h1" size="2xl" mb={6} textAlign="center">
            Join or Create a Group
          </Heading>
          <Text fontSize="xl" mb={8} textAlign="center">
            Collaborate with others to achieve your goals. Start by joining an existing group or creating your own.
          </Text>
          <Tabs variant="soft-rounded" colorScheme="teal" align="center" width="100%">
            <TabList mb="1em">
              <Tab>Join Group</Tab>
              <Tab>Create Group</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Link href="/join">
                  <Button colorScheme="teal" size="lg">Join Group</Button>
                </Link>
              </TabPanel>
              <TabPanel>
                <Link href="/create">
                  <Button colorScheme="teal" size="lg">Create Group</Button>
                </Link>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Home;
