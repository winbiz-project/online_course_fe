import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";

import img_hero from "@/assets/images/imgHeroLearning.png";
import { FaAngleRight } from "react-icons/fa6";

const Hero = () => {
  return (
    <>
      <Box
        width={"100%"}
        bgColor={"#9AC5F4"}
        height={"fit-content"}
        py={"20"}
        px={"40"}
      >
        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Flex flexDirection={"column"} width={"90vh"}>
            <Text
              fontSize="3xl"
              color={"black"}
              className="drop-shadow-2xl"
              fontWeight={"700"}
            >
              E-LEARNING
            </Text>
            <Text
              fontSize="6xl"
              color="black"
              fontWeight={"semibold"}
              className="drop-shadow-lg"
            >
              Belajar Fleksibel Ratusan Skill. Dapatkan Sertifikat.{" "}
            </Text>
            <Text fontSize="3xl" color={"black"} className="drop-shadow-2xl">
              pilih skill apapun dan pelajari kapanpun. dapatkan video materi
              terstruktur, modul praktik plus webinar series rancangan para
              expert dari top companies.{" "}
            </Text>
            <Flex gap={"1rem"}>
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
              <Button
                mt={4}
                bgColor={"#FFC107"}
                color={"black"}
                size="lg"
                width={"fit-content"}
                borderRadius={"1rem"}
              >
                Materi <FaAngleRight className="ms-3" />
              </Button>
            </Flex>
            <Text
              fontSize="2xl"
              color={"#FF6A65"}
              className="drop-shadow-2xl"
              fontWeight={"700"}
            >
              10.000+ Orang Berlangganan Tiap Bulan
            </Text>
          </Flex>
          <Image src={img_hero} height={"30rem"} />
        </Flex>
      </Box>
    </>
  );
};

export default Hero;
