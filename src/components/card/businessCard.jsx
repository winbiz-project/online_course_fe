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

import iconBusiness from "@/assets/images/iconBusiness.png";

const CardBusiness = ({ button }) => {
  return (
    <Card maxW={"lg"} borderRadius={"20px"} p={5} height={"25em"}>
      <Flex
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
      >
        <Image src={iconBusiness} alt="" height={"20"} width={"20"} />
        <CardBody
          display={"flex"}
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
        >
          <Heading size="md">Learning & Performance Software</Heading>
          <Text
            fontSize="sm"
            fontWeight="bold"
            textAlign={"center"}
            color={"#565656"}
            mt={"5"}
          >
            pilih skill apapun dan pelajari kapanpun. dapatkan video materi
            terstruktur, modul praktik plus webinar series rancangan para expert
            dari top companies.
          </Text>
          {button && (
            <Button
              mt={4}
              bgColor={"#FFC007"}
              color={"#000"}
              size="lg"
              width={"fit-content"}
            >
              Pelajari Software Experience
            </Button>
          )}
        </CardBody>
      </Flex>
    </Card>
  );
};

export default CardBusiness;
