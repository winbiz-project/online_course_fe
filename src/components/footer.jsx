import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import LogoSkillbridge from "@/assets/images/logo_SkillBridge.png";
import linkedIn from "@/assets/linkedIn.svg";
import mandiri from "@/assets/images/mandiri.svg";

const Footer = () => {
    return (
        <>
            <Box height={"40"} position={"relative"}>
                <Box
                    position={"absolute"}
                    transform={"translate(20%, 50%)"}
                    bg={"#fff"}
                    shadow={"md"}
                    height={"40"}
                    width={"70%"}
                    borderRadius={"10px"}
                ></Box>
            </Box>
            <Box as="footer" pt="40" bg="#9AC5F4" color="black">
                <Flex
                    maxW="6xl"
                    mx="auto"
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align="center"
                    pb={"35"}
                >
                    {/* Brand Logo */}
                    <Box mb={{ base: "4", md: "0" }}>
                        <Image src={LogoSkillbridge} alt="Brand Logo" objectFit="cover" />
                        <Text fontSize="md" fontWeight="medium">
                            Rintis Karir Impian Bersama SkillBridge
                        </Text>
                        {/* Social Media */}
                        <Flex direction="row" gap={4} my={"30"}>
                            <Link href="#">
                                <Image
                                    src={linkedIn}
                                    alt="Brand Logo"
                                    objectFit="cover"
                                    boxSize={"25px"}
                                />
                            </Link>
                            <Link href="#">
                                <Image
                                    src={linkedIn}
                                    alt="Brand Logo"
                                    objectFit="cover"
                                    boxSize={"25px"}
                                />
                            </Link>
                            <Link href="#">
                                <Image
                                    src={linkedIn}
                                    alt="Brand Logo"
                                    objectFit="cover"
                                    boxSize={"25px"}
                                />
                            </Link>
                            <Link href="#">
                                <Image
                                    src={linkedIn}
                                    alt="Brand Logo"
                                    objectFit="cover"
                                    boxSize={"25px"}
                                />
                            </Link>
                            <Link href="#">
                                <Image
                                    src={linkedIn}
                                    alt="Brand Logo"
                                    objectFit="cover"
                                    boxSize={"25px"}
                                />
                            </Link>
                        </Flex>
                        <Text fontSize="lg" fontWeight="bold" mb={"2"}>
                            Metode Pembayaran
                        </Text>
                        <Flex direction="row" gap={4} mb={"30"}>
                            <Text>
                                <Image
                                    src={mandiri}
                                    alt="Brand Logo"
                                    objectFit="cover"
                                    width={"70px"}
                                />
                            </Text>
                            <Text>
                                <Image
                                    src={mandiri}
                                    alt="Brand Logo"
                                    objectFit="cover"
                                    width={"70px"}
                                />
                            </Text>
                            <Text>
                                <Image
                                    src={mandiri}
                                    alt="Brand Logo"
                                    objectFit="cover"
                                    width={"70px"}
                                />
                            </Text>
                            <Text>
                                <Image
                                    src={mandiri}
                                    alt="Brand Logo"
                                    objectFit="cover"
                                    width={"70px"}
                                />
                            </Text>
                        </Flex>
                    </Box>

                    {/* Links */}
                    <Box mb={{ base: "4", md: "0" }}>
                        <Text fontSize="lg" fontWeight="bold">
                            SkillBridge
                        </Text>
                        <Flex direction="column">
                            <Link href="#">Tentang</Link>
                            <Link href="#">Karir</Link>
                            <Link href="#">Kerjasama</Link>
                            <Link href="#">Blog</Link>
                        </Flex>
                    </Box>
                    <Box mb={{ base: "4", md: "0" }}>
                        <Text fontSize="lg" fontWeight="bold">
                            SkillBridge
                        </Text>
                        <Flex direction="column">
                            <Link href="#">Tentang</Link>
                            <Link href="#">Karir</Link>
                            <Link href="#">Kerjasama</Link>
                            <Link href="#">Blog</Link>
                        </Flex>
                    </Box>
                    <Box mb={{ base: "4", md: "0" }}>
                        <Text fontSize="lg" fontWeight="bold">
                            SkillBridge
                        </Text>
                        <Flex direction="column">
                            <Link href="#">Tentang</Link>
                            <Link href="#">Karir</Link>
                            <Link href="#">Kerjasama</Link>
                            <Link href="#">Blog</Link>
                        </Flex>
                    </Box>

                    {/* Linkedin */}
                    <Box mb={{ base: "4", md: "0" }}>
                        <Link href="#">
                            <Image
                                src={linkedIn}
                                alt="Brand Logo"
                                objectFit="cover"
                                boxSize={"70px"}
                            />
                        </Link>
                    </Box>
                </Flex>

                {/* Copyright */}
                <Flex
                    mt="4"
                    textAlign="center"
                    bg={"#337CCF"}
                    height={75}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Text color={"white"} fontWeight={"bold"}>
                        &copy; 2023 - 2024 Your Company. All rights reserved.
                    </Text>
                </Flex>
            </Box>
        </>
    );
};

export default Footer;
