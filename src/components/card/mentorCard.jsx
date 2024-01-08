import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

const MentorCard = ({ mentor }) => {
  console.log(mentor.image);
  return (
    <Card
      maxW="sm"
      borderRadius={"20px"}
      style={{ backgroundImage: `url("${mentor.image}")` }}
      bgSize={"cover"}
      minHeight={"300px"}
    >
      <CardBody>
        <Flex
          flexDirection={"column"}
          spacing="3"
          alignItems={"center"}
          justifyContent={"end"}
          height={"100%"}
        >
          <Text fontSize="2xl" fontWeight="normal" color={"#ffff"}>
            {mentor.name}
          </Text>
          <Text fontSize="sm" fontWeight="600" color={"#ffff"}>
            {mentor.role}
          </Text>
          <Button
            mt={4}
            bgColor={"#fff"}
            color={"#000"}
            size="lg"
            width={"fit-content"}
            border={"1px solid #108EE9"}
            height={"fit-content"}
            py={"1"}
          >
            Lihat Materi
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MentorCard;
