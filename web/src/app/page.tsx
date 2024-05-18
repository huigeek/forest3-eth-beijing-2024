import { ChakraProvider } from "@chakra-ui/react";
import Page from "./home";

function Index() {
  return (
    <>
      <ChakraProvider>
        <Page />
      </ChakraProvider>
    </>
  );
}

export default Index;
