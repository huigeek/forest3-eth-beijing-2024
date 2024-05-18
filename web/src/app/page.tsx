import { ChakraProvider } from "@chakra-ui/react";
import Home from "./home/page";

function Index() {
  return (
    <>
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    </>
  );
}

export default Index;
