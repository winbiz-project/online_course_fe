import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import CardCourse from "../card/course";
import splash from "@/assets/images/splash.png";
import CardPopular from "../card/popular";

const Popular = () => {
    const Popular = {
        title: "Javascript",
        image: splash,
        price: 1200,
        description: "Menjadi Copywritter di DBS bank ",
        rating: 4.5,
    };

    return (
        <Flex
            direction={"column"}
            width={"100%"}
            height={"fit-content"}
            px={"20"}
            py={"10"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Text fontSize={"xl"} fontWeight={"bold"} color={"#FFC007"}>
                WHAT WE GIVE
            </Text>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
                Popular Materials
            </Text>
            <Text fontSize={"lg"} width={"50%"} textAlign={"center"}>
                banget ilmu & praktik yang jumpstart karier, dari hukum ke codywriter, tapi karena ikut Bootcamp Myskill
            </Text>
            <Flex
                direction="row"
                justifyContent="center"
                alignItems="center"
                px={"20"}
                py={"10"}
                gap={"10"}
            >
                <CardPopular popular={Popular} />
                <CardPopular popular={Popular} />
                <CardPopular popular={Popular} />
            </Flex>
        </Flex>
    );
};

export default Popular;
