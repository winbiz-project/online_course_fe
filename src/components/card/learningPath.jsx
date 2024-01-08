import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import journal from "@/assets/images/bi_journal-bookmark.svg";
import people from "@/assets/images/people.svg";
import star from "@/assets/images/star.svg";

const CardLearning = ({ learning }) => {
  const { title, image, material, topic, users, rating } = learning;

  return (
    <Card borderRadius={"20px"} position={"relative"}>
      <Box
        bgColor={"#337CCF"}
        borderBottomRadius={"50%"}
        borderTopRadius={"20px"}
        height={"250px"}
        mb={"0"}
      />
      <Image
        src={image}
        alt={title}
        borderTopRadius="20px"
        position={"absolute"}
        transform={"translate(0%, 30%)"}
      />
      <CardBody>
        <Heading size="md" textAlign={"center"}>
          {title}
        </Heading>
        <Stack mt="6" spacing="3">
          <Flex justifyContent="flex-start">
            <Image src={people} alt="star" me={"3"} />
            <Text fontSize="sm" fontWeight="bold">
              {users}
            </Text>
          </Flex>
          <Flex justifyContent="flex-start">
            <Image src={journal} alt="star" me={"3"} />
            <Text fontSize="sm" fontWeight="bold">
              {topic} Topik - {material} Materi
            </Text>
          </Flex>
          <Flex justifyContent="flex-start">
            <Image src={star} alt="star" me={"3"} />
            <Text fontSize="sm" fontWeight="bold">
              {rating}/5
            </Text>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CardLearning;
