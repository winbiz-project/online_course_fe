import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import bg_hero from "@/assets/images/bg-hero-2.png";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/e-learning');
  };

  return (
    <Box width="100%" height={{ base: "35vh", md: "60vh", lg: "100vh" }} position="relative">
      <Image
        src={bg_hero}
        width="100%"
        height="100%"
        objectFit="cover"
        filter="blur(5px)"
      />

      {/* Overlay Box */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="rgba(9, 8, 15, 0.5)"
        zIndex="0"
      />

      <Flex
        position="absolute"
        top="50%"
        left="20%"
        transform="translate(-20%, -50%)"
        flexDirection="column"
        textAlign="left"
        px={4}
        width={{ base: "90%", md: "80%", lg: "60%" }}
      >
        <Text
          fontSize={{ base: "xl", md: "4xl", lg: "6xl" }}
          color="white"
          fontWeight="semibold"
        >
          Become an Expert in Your Field. Learn from the Best.
        </Text>
        <Text fontSize={{ base: "sm", md: "lg", lg: "3xl" }} color="white" mt={4}>
          Get access to hundreds of courses developed by professionals.
          Learn anytime, anywhere, and get live support from mentors.
        </Text>
        <Button
          mt={6}
          bgColor="#1450A3"
          color="white"
          size={{base: "sm", md:"md", lg:"lg"}}
          width="fit-content"
          onClick={handleClick}
        >
          View Hundreds of Materials Available <FaAngleRight className="ms-3" />
        </Button>
      </Flex>
    </Box>
  );
};

export default Hero;
