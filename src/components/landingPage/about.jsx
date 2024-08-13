import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";

import img_about from "@/assets/images/about-us-1.png";
import img_about_2 from "@/assets/images/about-us-2.png";
const About = () => {
    return (
        <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            my={"20"}
            p={"20"}
        >
            <Box className="w-2/5" >
                <Box position={"relative"}>
                    <Image src={img_about} height={"350px"} borderRadius={"3xl"} />
                    <Image position={"absolute"} bottom={"-15%"} right={"25%"} src={img_about_2} height={"350px"} borderRadius={"3xl"} />
                </Box>
            </Box>
            <Box className="w-3/5" textAlign={"left"}>
                <Text fontSize={"3xl"} fontWeight={"bold"} color={"#FFC007"}>About Us</Text>
                <Text fontSize={"4xl"} fontWeight={"bold"}>Bridging Talents Building Futures </Text>
                <Text fontSize={"2xl"}>Skillbridge merupakan platform pembelajaran online yang berfokus pada penyediaan kursus berkualitas tinggi untuk siapa saja yang ingin mengembangkan keterampilan baru atau meningkatkan pengetahuan mereka. Kami memiliki misi untuk memberikan akses pelatihan keterampilan yang mudah dan terjangkau bagi semua orang, dimanapun mereka berada. </Text>
            </Box>
        </Flex>
    )
}

export default About