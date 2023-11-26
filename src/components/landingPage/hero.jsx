import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import bg_hero from "@/assets/images/bg-hero.svg";
import { FaAngleRight } from "react-icons/fa6";

const Hero = () => {
  return (
    <Box width={"100%"} height={"100%"} position="relative">
      <Image src={bg_hero} width={"100%"} height={"100%"} objectFit="cover" />

      <Flex
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-80%, -50%)"
        flexDirection={"column"}
      >
        <Text fontSize="6xl" color="black" fontWeight={"semibold"}>
          Belajar Fleksibel Ratusan Skill. Dapatkan Sertifikat.{" "}
        </Text>
        <Text fontSize="3xl" color={"white"}>
          pilih skill apapun dan pelajari kapanpun. dapatkan video materi
          terstruktur, modul praktik plus webinar series rancangan para expert
          dari top companies.{" "}
        </Text>
        <Button mt={4} bgColor={"#1450A3"} color={"white"} size="lg" width={"fit-content"}>
                  Lihat Ratusan Materi Tersedia <FaAngleRight className="ms-3" />
        </Button>
      </Flex>
    </Box>
  );
};

export default Hero;
