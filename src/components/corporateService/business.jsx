import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import CardCourse from "../card/course";
import splash from "@/assets/images/splash.png";
import CardPopular from "../card/popular";
import CardBusiness from "../card/businessCard";

const Business = () => {
  return (
    <Flex
      direction={"column"}
      width={"100%"}
      height={"fit-content"}
      px={"20"}
      py={"10"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"#9AC5F4"}
    >
      <Text fontSize={"3xl"} fontWeight={"bold"}>
        Business Materials
      </Text>
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        px={"20"}
        py={"10"}
        gap={"10"}
      >
        <CardBusiness />
        <CardBusiness button={true} />
        <CardBusiness />
      </Flex>
    </Flex>
  );
};

export default Business;
