import { Box, Flex, Image, Text } from "@chakra-ui/react";
import img_about from "@/assets/images/about-us-1.png";
import img_about_2 from "@/assets/images/about-us-2.png";

const About = () => {

  return (
    <Flex
      direction={{ base: "column", md: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      my={{  base: 15, md: 15, lg: 20 }}
      p={{ base: 5, md: 10, lg: 20 }} // Padding yang berbeda untuk mobile dan desktop
      gap={10}
    >
      <Box flex="1" position="relative" textAlign="center" mb={{ base: 4, md: 8, lg: 0 }}display="flex" justifyContent="center" alignItems="center" ml={{base: -50, md:0}}>
        <Box position="relative" width="fit-content" textAlign={"center"}>
            {/* <Image src={img_about} height={"350px"} borderRadius={"3xl"} />
            <Image position={"absolute"} bottom={"-15%"} right={"25%"} src={img_about_2} height={"350px"} borderRadius={"3xl"} /> */}
            <Image
            src={img_about}
            height={{ base: "250px", md: "350px" }}
            borderRadius="3xl"
            zIndex={2}
            />
            <Image
            position="absolute"
            bottom={{ base: "-10%", md: "-15%" }}
            right={{ base: "25%", md: "25%" }}
            transform={{ base: "translateX(50%)", md: "translateX(50%)" }}
            src={img_about_2}
            height={{ base: "250px", md: "350px" }}
            borderRadius="3xl"
            zIndex={1}
            />
        </Box>
      </Box>
      <Box flex="1" textAlign="left">
        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="#1450A3">
          About Us
        </Text>
        <Text fontSize={{ base: "xl", md: "4xl" }} fontWeight="bold">
          Bridging Talents, Building Futures
        </Text>
        <Text fontSize={{ base: "md", md: "xl" }}>
        Skillbridge is an online learning platform that focuses on providing high-quality courses for anyone who wants to develop new skills or improve their knowledge.
        </Text>
      </Box>
    </Flex>
  );
};

export default About;