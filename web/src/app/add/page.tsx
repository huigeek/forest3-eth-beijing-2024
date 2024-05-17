'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@chakra-ui/react';

const Add = () => {
  const [target, setTarget] = useState('');
  const [money, setMoney] = useState('');
  const [endTime, setEndTime] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    // Handle form submission logic here
    router.push('/detail'); // Redirect to detail page after submission
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Task</h2>
      <Input placeholder="Task Target" value={target} onChange={(e) => setTarget(e.target.value)} />
      <Input placeholder="Set Money" value={money} onChange={(e) => setMoney(e.target.value)} type="number" />
      <Input placeholder="Set End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} type="datetime-local" />
      <Button onClick={handleSubmit} style={{ marginTop: '20px' }}>Submit</Button>
    </div>
  );
};

export default Add;
