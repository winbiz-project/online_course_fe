import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaBookmark } from "react-icons/fa6";

import blogImg from "@/assets/images/img-blog.png";

const BlogCard = () => {
  return (
    <Card maxW="sm" m={"4"} boxShadow={"lg"}>
      <Image
        src={blogImg}
        alt="Green double couch with wooden legs"
      />
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">
            Bahasa Pemprograman Ruby : Flesibilitas dan keunikan dalam coding
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            maiores praesentium deleniti animi consectetur et aliquid nostrum ab
            odio corporis aliquam dolores nobis, perspiciatis necessitatibus
            harum quidem enim, blanditiis, laborum nihil. Voluptate.
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <Flex justifyContent={"space-between"} width={"100%"}>
          <Text fontSize="sm" color="gray.500">
            1 min read
          </Text>
          <FaBookmark />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
