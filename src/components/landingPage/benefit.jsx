import {
    Box,
    Flex,
    Image,
    Text,
    Button,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom'

import img_benefit from "@/assets/images/benefit_1.png";
import img_benefit_2 from "@/assets/images/benefit_2.png";
import img_benefit_3 from "@/assets/images/benefit_3.png";
import img_benefit_4 from "@/assets/images/benefit_4.png";

import img_time from "@/assets/images/img_time.svg";
import img_study from "@/assets/images/img_study.svg";
import img_career from "@/assets/images/img_career.svg";
import { FaAngleRight } from "react-icons/fa6";

const Benefit = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/courses');
    };

    return (
        <Flex
            direction="row"
            justifyContent="center"
            alignItems="center"
            px={"20"}
            py={"10"}
            bgColor={"#9AC5F4"}
            height={"fit-content"}
            gap={"5"}
        >
            <Box className="w-1/2">
                <Text fontSize={"xl"} fontWeight={"bold"} color={"#FFC007"}>
                    WHAT WE GIVE
                </Text>
                <Text fontSize={"4xl"} fontWeight={"bold"}>
                    Manfaat Yang Kalian Dapatkan
                </Text>
                <Flex mt={"6"}>
                    <Image src={img_time} boxSize={"70px"} />
                    <Box ml={"5"} width={"60%"}>
                        <Text fontSize={"md"} fontWeight={"semibold"}>
                            Fleksibilitas Belajar
                        </Text>
                        <Text fontSize={"sm"}>
                            Pelajari kursus kapan saja, di mana saja, dengan akses penuh ke
                            semua materi.
                        </Text>
                    </Box>
                </Flex>
                <Flex mt={"6"}>
                    <Image src={img_study} boxSize={"70px"} />
                    <Box ml={"5"} width={"60%"}>
                        <Text fontSize={"md"} fontWeight={"semibold"}>
                            Kualitas Terjamin
                        </Text>
                        <Text fontSize={"sm"}>
                            Setiap kursus dikembangkan oleh instruktur berpengalaman dengan
                            pendekatan pembelajaran yang efektif.
                        </Text>
                    </Box>
                </Flex>
                <Flex mt={"6"}>
                    <Image src={img_career} boxSize={"70px"} />
                    <Box ml={"5"} width={"60%"}>
                        <Text fontSize={"md"} fontWeight={"semibold"}>
                            Peningkatan Karir
                        </Text>
                        <Text fontSize={"sm"}>
                            kalian akan mendapatkan sertifikat dan keterampilan khusus yang
                            dapat meningkatkan prospek karir dan peluang pekerjaan.
                        </Text>
                    </Box>
                </Flex>
                <Button
                    my={4}
                    bgColor={"#1450A3"}
                    color={"white"}
                    size="lg"
                    width={"fit-content"}
                    onClick={handleClick}

                >
                    Materi Tersedia <FaAngleRight className="ms-3" />
                </Button>
            </Box>
            <Box className="w-1/2">
                <Grid
                    templateRows="repeat(2, 1fr)"
                    templateColumns={"repeat(2, 1fr)"}
                    gap={4}
                >
                    <GridItem rowSpan={2}>
                        <Image
                            src={img_benefit}
                            height={"200px"}
                            borderTopEndRadius={"30%"}
                            borderBottomLeftRadius={"30%"}
                            ms={"auto"}
                        />
                    </GridItem>
                    <GridItem rowSpan={2}>
                        <Image
                            src={img_benefit_2}
                            height={"200px"}
                            borderTopStartRadius={"30%"}
                            borderBottomRightRadius={"30%"}
                        />
                    </GridItem>
                    <GridItem rowSpan={2}>
                        <Image
                            src={img_benefit_3}
                            height={"200px"}
                            borderTopStartRadius={"30%"}
                            borderBottomRightRadius={"30%"}
                            ms={"auto"}
                        />
                    </GridItem>
                    <GridItem rowSpan={2}>
                        <Image
                            src={img_benefit_4}
                            height={"200px"}
                            borderTopEndRadius={"30%"}
                            borderBottomLeftRadius={"30%"}
                        />
                    </GridItem>
                </Grid>
            </Box>
        </Flex>
    );
};

export default Benefit;
