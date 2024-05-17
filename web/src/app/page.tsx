'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { Button } from '@chakra-ui/react'; // Assuming you are using Chakra UI for styling
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
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <div>
          <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
        </div>
        <div>
          <Button onClick={connectWallet}>
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
          </Button>
        </div>
      </header>
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        <Link href="/add">
          <Button style={{ margin: '10px' }}>Add</Button>
        </Link>
        <Link href="/create">
          <Button style={{ margin: '10px' }}>Create</Button>
        </Link>
      </main>
    </div>
  );
};

export default Home;
