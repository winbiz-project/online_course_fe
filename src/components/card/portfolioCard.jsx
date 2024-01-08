import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import google from "@/assets/images/google.svg";
import imgPortofolio from "@/assets/images/imagePortfolio.png";

const PortfolioCard = ({ portfolio }) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={imgPortofolio}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">
            <Image src={google} alt="star" me={"3"} display={"inline-block"} />
            Google
          </Heading>
          <Heading size="md">Google Data Analytics</Heading>
          <Text fontSize="sm" fontWeight="normal">
            Professional Certificate
          </Text>
          <Button
            mt={4}
            bgColor={"#3C91E6"}
            color={"#fff"}
            size="lg"
            width={"100%"}
            height={"fit-content"}
            py={"1"}
          >
            Lihat Portofolio
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default PortfolioCard;
