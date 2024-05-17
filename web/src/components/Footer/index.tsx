import { Text } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  return (
    <Text color="#999999" fontSize="1rem" className="mb-4 text-center">
      <span></span>
      <a href="https://ethbeijing.xyz" target="_blank" rel="noreferrer">ETH Beijing</a>
      <span> Developed by </span>
      <a href="#" target="_blank" rel="noreferrer">Forest3 Team</a>
    </Text>
  );
}
