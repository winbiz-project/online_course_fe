import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";

import CardCourse from "../card/course";
import flyinGirl from "@/assets/images/Flyin Girl.png";

const LearningSkill = () => {
  const course = {
    title: "Copywriting Introduction",
    image: flyinGirl,
    countVideos: 12,
    users: 1200,
    rating: 4.5,
  };
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
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          Ratusan Skill Impian Kini dalam Genggamanmu
        </Text>
        <Text fontSize={"xl"} fontWeight={"bold"} color={"#545454"}>
          pilih skill apapun dan pelajari kapanpun. dapatkan video materi
          terstruktur, modul praktik plus webinar series rancangan.
        </Text>
      </Flex>
      <Flex flexDirection={"column"} gap={"10"}>
        <Flex gap={"10"}>
          <Button
            mt={4}
            bgColor={"#108EE9"}
            color={"white"}
            size="lg"
            width={"fit-content"}
          >
            Digital Marketing
          </Button>
          <Button
            mt={4}
            bgColor={"#fff"}
            color={"#108EE9"}
            size="lg"
            width={"fit-content"}
            border={"1px solid #108EE9"}
          >
            Data Science & Data Analysis
          </Button>
          <Button
            mt={4}
            bgColor={"#fff"}
            color={"#108EE9"}
            size="lg"
            width={"fit-content"}
            border={"1px solid #108EE9"}
          >
            Microsoft Excel
          </Button>
          <Button
            mt={4}
            bgColor={"#fff"}
            color={"#108EE9"}
            size="lg"
            width={"fit-content"}
            border={"1px solid #108EE9"}
          >
            UI/UX Research and Design
          </Button>
          <Button
            mt={4}
            bgColor={"#fff"}
            color={"#108EE9"}
            size="lg"
            width={"fit-content"}
            border={"1px solid #108EE9"}
          >
            Web Development
          </Button>
        </Flex>
        <Flex gap={"5"} justifyContent={"center"}>
          <CardCourse course={course} />
          <CardCourse course={course} />
          <CardCourse course={course} />
          <CardCourse course={course} />
          <CardCourse course={course} />
        </Flex>
        <Flex justifyContent={"center"} gap={"10"}>
          <Button
            mt={4}
            bgColor={"#FFC007"}
            color={"#000"}
            size="lg"
            width={"fit-content"}
          >
            Mulai Berlangganan
          </Button>
          <Button
            mt={4}
            bgColor={"#fff"}
            color={"#108EE9"}
            size="lg"
            width={"fit-content"}
            border={"1px solid #108EE9"}
          >
            Lihat Semua Materi
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LearningSkill;
