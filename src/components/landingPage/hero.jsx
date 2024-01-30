import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import bg_hero from "@/assets/images/bg-hero-2.png";
import { FaAngleRight } from "react-icons/fa6";

const Hero = () => {
  return (
    <Box width={"100%"} height={"100%"} position="relative">
      <Image
        src={bg_hero}
        width={"100%"}
        height={"100%"}
        objectFit="cover"
        filter={"blur(5px)"}
      />

      <Flex
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-80%, -50%)"
        flexDirection={"column"}
      >
        <Text
          fontSize="6xl"
          color="white"
          fontWeight={"semibold"}
          className="drop-shadow-lg"
        >
          Belajar Fleksibel Ratusan Skill. Dapatkan Sertifikat.{" "}
        </Text>
        <Text fontSize="3xl" color={"white"} className="drop-shadow-2xl">
          pilih skill apapun dan pelajari kapanpun. dapatkan video materi
          terstruktur, modul praktik plus webinar series rancangan para expert
          dari top companies.{" "}
        </Text>
        <Button
          mt={4}
          bgColor={"#1450A3"}
          color={"white"}
          size="lg"
          width={"fit-content"}
        >
          Lihat Ratusan Materi Tersedia <FaAngleRight className="ms-3" />
        </Button>
      </Flex>
    </Box>
  );
};

export default Hero;
