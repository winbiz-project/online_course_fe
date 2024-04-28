import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";

import img_hero from "@/assets/images/imgHeroLearning.png";
import { FaAngleRight } from "react-icons/fa6";

const CTALearning = () => {
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      my={"20"}
      p={"20"}
      bgColor={"#9AC5F4"}
    >
      <Box className="w-2/5">
        <Image src={img_hero} height={"400px"} />
      </Box>
      <Box className="w-3/5" textAlign={"left"}>
        <Text fontSize={"2xl"} fontWeight={"bold"} color={"#000"}>
          E-LEARNING
        </Text>
        <Text fontSize={"4xl"} fontWeight={"bold"}>
          Belajar Fleksibel Ratusan Skill. Dapatkan Sertifikat.{" "}
        </Text>
        <Text fontSize={"2xl"}>
          pilih skill apapun dan pelajari kapanpun. dapatkan video materi
          terstruktur, modul praktik plus webinar series rancangan para expert
          dari top companies.{" "}
        </Text>
        <Button
          mt={4}
          bgColor={"#0A939E"}
          color={"white"}
          size="lg"
          width={"fit-content"}
          borderRadius={"1rem"}
        >
          Lihat Ratusan Materi Tersedia <FaAngleRight className="ms-3" />
        </Button>
        <Text
          fontSize="2xl"
          color={"#FF6A65"}
          className="drop-shadow-2xl"
          fontWeight={"700"}
        >
          Ratusan Orang Berlangganan Tiap Bulan
        </Text>
      </Box>
    </Flex>
  );
};

export default CTALearning;
