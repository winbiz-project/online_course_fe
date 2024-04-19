import Footer from "./footer";
import Navbar from "./navbar";
import { Flex, Box } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Box flex="1" overflowY="auto" bg="white" color="text-neutral-800">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}
