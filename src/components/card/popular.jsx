import {
    Card,
    Image,
    CardBody,
    Heading,
    Stack,
    Flex,
    Text,
    Box,
} from "@chakra-ui/react";
import fomkitStar from "@/assets/images/formkit_star.svg";

const CardPopular = ({ popular }) => {
    const { title, image, price, description, rating } = popular;

    return (
        <Card maxW="sm" borderRadius={"20px"} position={"relative"}>
            <Image src={image} alt={title} borderRadius="20px" height={"100%"} />
            <CardBody position={"absolute"} width={"100%"} height={"100%"} px={"0"}>
                <Flex height={"100%"} justifyContent="space-between" flexDirection={"column"} py={"2"}>
                    <Flex
                        bgColor={"grey"}
                        borderTopLeftRadius={"10"}
                        borderBottomLeftRadius={"10"}
                        color={"#fff"}
                        ms={"auto"}
                        p={"1.5"}
                        my={"4"}
                    >
                        <Image src={fomkitStar} alt={title} display={"inline-block"} />{" "}
                        {rating}
                    </Flex>
                    <Stack px={"6"} spacing="3">
                        <Flex justifyContent="space-between">
                            <Heading size="md" color={"#fff"}>
                                {title}
                            </Heading>
                            <Text fontSize="md" fontWeight="bold" color={"#fff"}>
                                ${price}
                            </Text>
                        </Flex>
                        <Text fontSize="sm" fontWeight="normal" color={"#fff"}>
                            {description}
                        </Text>
                    </Stack>
                </Flex>
            </CardBody>
        </Card>
    );
};

export default CardPopular;
