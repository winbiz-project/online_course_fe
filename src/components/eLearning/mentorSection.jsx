import { Flex, Text } from "@chakra-ui/react";

import mentorImg from "@/assets/images/imgMentor.png";
import MentorCard from "../card/mentorCard";

const Mentor = () => {
  const mentor = {
    name: "Irpan Fauzi",
    image: mentorImg,
    role: "Mobile Developer",
  };
  return (
    <Flex
      width={"100%"}
      bgColor={"#fff"}
      height={"100%"}
      py={"20"}
      px={"40"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          Dibuat oleh Praktisi Profesional Terkurasi.
        </Text>
        <Text fontSize={"xl"} fontWeight={"bold"} color={"#545454"}>
          Belajar langsung dari experiencedprofesional yang mengajarkan
          pengalaman, case study &best practices.
        </Text>
      </Flex>
      <Flex flexDirection={"row"} gap={"10"} py={"10"}>
        <MentorCard mentor={mentor} />
        <MentorCard mentor={mentor} />
        <MentorCard mentor={mentor} />
        <MentorCard mentor={mentor} />
        <MentorCard mentor={mentor} />
      </Flex>
    </Flex>
  );
};

export default Mentor;
