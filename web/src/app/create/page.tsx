"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";

function Create() {
  const [target, setTarget] = useState("");
  const [money, setMoney] = useState("");
  const [duration, setDuration] = useState("");
  const [memberLimit, setMemberLimit] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    // Handle form submission logic here
    // For example, you might call a smart contract method to create a new group
    router.push("/detail"); // Redirect to detail page after submission
  };

  return (
    <Box p={5}>
      <Heading as="h2" mb={5} textAlign="center">
        Create Task Group
      </Heading>
      <Flex direction="column" alignItems="center">
        <FormControl mb={3} width="300px">
          <FormLabel>Task Target</FormLabel>
          <Input
            placeholder="Task Target"
            value={target}
            onChange={e => setTarget(e.target.value)}
          />
        </FormControl>
        <FormControl mb={3} width="300px">
          <FormLabel>Set Money (ETH)</FormLabel>
          <NumberInput
            value={money}
            onChange={valueString => setMoney(valueString)}
            min={0}
            precision={2}
          >
            <NumberInputField placeholder="Set Money (ETH)" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl mb={3} width="300px">
          <FormLabel>Set Duration (seconds)</FormLabel>
          <NumberInput
            value={duration}
            onChange={valueString => setDuration(valueString)}
            min={0}
          >
            <NumberInputField placeholder="Set Duration (seconds)" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl mb={5} width="300px">
          <FormLabel>Set Member Limit</FormLabel>
          <NumberInput
            value={memberLimit}
            onChange={valueString => setMemberLimit(valueString)}
            min={1}
          >
            <NumberInputField placeholder="Set Member Limit" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <Button onClick={handleSubmit} colorScheme="teal">
          Submit
        </Button>
      </Flex>
    </Box>
  );
}

export default Create;
