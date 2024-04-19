import {
    Box,
    Flex,
    Image,
    Text,
    Button,
    Grid,
} from "@chakra-ui/react";

import unsplash from "@/assets/images/unsplash.png";
import { FaCartFlatbedSuitcase } from "react-icons/fa6";
import CardTestimony from "../card/testimony";

const Testimony = () => {
    const testimony = {
        title: "jumpstart karier, dari hukum ke codywriter",
        description: "ik yang jumpstart karier, dari hukum ke codywriter, tapi karena ikut Bootcamp Myskill",
        material: "React Native",
        image: unsplash,
    }

    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            px={"20"}
            py={"10"}
            bgColor={"#9AC5F4"}
            height={"fit-content"}
        >
            <Text fontSize={"xl"} fontWeight={"bold"} color={"#FFC007"}>
                TESTIMONI
            </Text>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
                Cerita Pengguna, Tutor, dan Mitra
            </Text>
            <Grid
                templateColumns="repeat(2, 1fr)"
                py={"10"}
                gap={"5"}
            >
                <CardTestimony colspan={1} testimony={testimony} />
                <CardTestimony colspan={1} testimony={testimony} />
                <CardTestimony colspan={1} testimony={testimony} />
                <CardTestimony colspan={1} testimony={testimony} />
            </Grid>
        </Flex>
    )
}

export default Testimony