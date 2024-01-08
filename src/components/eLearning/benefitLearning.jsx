import { Box, Flex, Image, Text } from "@chakra-ui/react";

import benefitImg from "@/assets/images/imgBenefitLearning.png";

const BenefitLearning = () => {
  return (
    <Flex
      width={"100%"}
      bgColor={"#fff"}
      height={"100%"}
      py={"20"}
      px={"40"}
      mt={"40"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Text fontSize={"xl"} fontWeight={"bold"} color={"#545454"}>
          E-Learning
        </Text>
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          Solusi #1 Kuasai Ratusan Skill Profesional
        </Text>
      </Flex>
      <Flex
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Flex flexDirection={"column"} width={"90vh"} gap={"10"} py={"10"}>
          <Box
            border={"1px"}
            borderColor={"#8A8A8A"}
            borderRadius={"1rem"}
            p={"10"}
          >
            <Text fontSize={"xl"} fontWeight={"bold"} color={"#545454"}>
              Belajar Fleksibel dan Bersertifikat
            </Text>
            <Text fontSize={"md"} fontWeight={"600"}>
              pilih skill apapun dan pelajari kapanpun. dapatkan video materi
              terstruktur, modul praktik plus webinar series rancangan para
              expert dari top companies.
            </Text>
          </Box>
          <Box
            border={"1px"}
            borderColor={"#8A8A8A"}
            borderRadius={"1rem"}
            p={"10"}
          >
            <Text fontSize={"xl"} fontWeight={"bold"} color={"#545454"}>
              Belajar Fleksibel dan Bersertifikat
            </Text>
            <Text fontSize={"md"} fontWeight={"600"}>
              pilih skill apapun dan pelajari kapanpun. dapatkan video materi
              terstruktur, modul praktik plus webinar series rancangan para
              expert dari top companies.
            </Text>
          </Box>
          <Box
            border={"1px"}
            borderColor={"#8A8A8A"}
            borderRadius={"1rem"}
            p={"10"}
          >
            <Text fontSize={"xl"} fontWeight={"bold"} color={"#545454"}>
              Belajar Fleksibel dan Bersertifikat
            </Text>
            <Text fontSize={"md"} fontWeight={"600"}>
              pilih skill apapun dan pelajari kapanpun. dapatkan video materi
              terstruktur, modul praktik plus webinar series rancangan para
              expert dari top companies.
            </Text>
          </Box>
          <Box
            border={"1px"}
            borderColor={"#8A8A8A"}
            borderRadius={"1rem"}
            p={"10"}
          >
            <Text fontSize={"xl"} fontWeight={"bold"} color={"#545454"}>
              Belajar Fleksibel dan Bersertifikat
            </Text>
            <Text fontSize={"md"} fontWeight={"600"}>
              pilih skill apapun dan pelajari kapanpun. dapatkan video materi
              terstruktur, modul praktik plus webinar series rancangan para
              expert dari top companies.
            </Text>
          </Box>
        </Flex>
        <Image src={benefitImg} height={"30rem"} />
      </Flex>
    </Flex>
  );
};
export default BenefitLearning;
