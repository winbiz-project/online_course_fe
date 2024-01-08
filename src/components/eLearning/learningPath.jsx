import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";

import { IoSearch } from "react-icons/io5";
import CardLearning from "../card/learningPath";
import learningImg from "@/assets/images/learning-path-1.png";

const LearningPath = () => {
  const dataLearning = {
    title: "Digital Marketing",
    image: learningImg,
    material: 109,
    topic: 5,
    users: 100,
    rating: 4,
  };
  return (
    <Flex
      width={"100%"}
      bgColor={"#fff"}
      height={"100%"}
      pb={"20"}
      px={"40"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Flex flexDirection={"row"} justifyContent={"space-between"} py={"10"}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Daftar learning Path Rancangan Expert
        </Text>
        <InputGroup width={"fit-content"}>
          <InputLeftElement pointerEvents="none">
            <IoSearch color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Cari materi..." />
        </InputGroup>
      </Flex>
      <Flex flexDirection={"column"} gap={"5"} mb={"10"}>
        <Flex justifyContent={"space-between"}>
          <CardLearning  learning={dataLearning} />
          <CardLearning  learning={dataLearning} />
          <CardLearning  learning={dataLearning} />
          <CardLearning  learning={dataLearning} />
          <CardLearning  learning={dataLearning} />
        </Flex>
        <Flex justifyContent={"space-between"}>
          <Button
            bgColor={"#fff"}
            color={"#108EE9"}
            size="lg"
            width={"fit-content"}
            border={"1px solid #108EE9"}
          >
            Show 6 more
          </Button>
        </Flex>
      </Flex>
      <Flex flexDirection={"column"} gap={"5"} mb={"10"}>
        <Flex justifyContent={"space-between"}>
          <CardLearning  learning={dataLearning} />
          <CardLearning  learning={dataLearning} />
          <CardLearning  learning={dataLearning} />
          <CardLearning  learning={dataLearning} />
          <CardLearning  learning={dataLearning} />
        </Flex>
        <Flex justifyContent={"space-between"}>
          <Button
            bgColor={"#fff"}
            color={"#108EE9"}
            size="lg"
            width={"fit-content"}
            border={"1px solid #108EE9"}
          >
            Show 6 more
          </Button>
        </Flex>
      </Flex>
      <Flex flexDirection={"column"} gap={"5"} mb={"10"}>
        <Flex justifyContent={"space-between"}>
          <CardLearning  learning={dataLearning} />
          <CardLearning  learning={dataLearning} />
          <CardLearning  learning={dataLearning} />
          <CardLearning  learning={dataLearning} />
          <CardLearning  learning={dataLearning} />
        </Flex>
        <Flex justifyContent={"space-between"}>
          <Button
            bgColor={"#fff"}
            color={"#108EE9"}
            size="lg"
            width={"fit-content"}
            border={"1px solid #108EE9"}
          >
            Show 6 more
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LearningPath;
