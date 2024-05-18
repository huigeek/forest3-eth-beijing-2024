import { useSignMessage } from "wagmi";
import { Box, Button, Input } from "@chakra-ui/react";

export default function CreateGroupForm() {
  const { signMessage } = useSignMessage();
  async function handleCreateGroup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    signMessage({ message: "sign create group" });
  }

  return (
    <Box
      as="form"
      onSubmit={handleCreateGroup}
    >
      <Input name="goal" placeholder="Enter your group's goal" mb={4} />
      <Input name="stakeAmount" placeholder="Enter stake amount in Wei" mb={4} />
      <Input name="goalDeadlineSeconds" placeholder="Set the duration in seconds" mb={4} />
      <Input name="memberLimit" placeholder="Maximum number of members" mb={4} />
      <Button type="submit" colorScheme="teal" size="lg" mt={4}>Create Group</Button>
    </Box>
  );
}
