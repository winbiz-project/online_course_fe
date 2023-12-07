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
                <Text fontSize={"4xl"} fontWeight={"bold"}>Belajar Fleksibel Ratusan Skill. Dapatkan Sertifikat. </Text>
                <Text fontSize={"2xl"}>pilih skill apapun dan pelajari kapanpun. dapatkan video materi terstruktur, modul praktik plus webinar series rancangan para expert dari top companies. </Text>
            </Box>
        </Flex>
    )
}

export default About