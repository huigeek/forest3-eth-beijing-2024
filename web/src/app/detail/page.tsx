'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@chakra-ui/react';

const Detail = () => {
  const [groupAddress, setGroupAddress] = useState('0x1234567890abcdef'); // Replace with actual logic
  const [members, setMembers] = useState(['0x123...', '0x456...', '0x789...']); // Replace with actual logic
  const [endTime, setEndTime] = useState(new Date(Date.now() + 3600000)); // Replace with actual logic
  const [timeRemaining, setTimeRemaining] = useState('');
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const distance = endTime.getTime() - now.getTime();
      if (distance < 0) {
        clearInterval(interval);
        setTimeRemaining('EXPIRED');
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const handleVote = () => {
    // Handle vote logic here
    router.push('/vote');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Group Detail</h2>
      <p>Group Address: {groupAddress}</p>
      <h3>Members</h3>
      <ul>
        {members.map((member) => (
          <li key={member}>{member}</li>
        ))}
      </ul>
      <h3>Time Remaining: {timeRemaining}</h3>
      <Button onClick={handleVote} disabled={timeRemaining === 'EXPIRED'}>Vote</Button>
    </div>
  );
};

export default Detail;
