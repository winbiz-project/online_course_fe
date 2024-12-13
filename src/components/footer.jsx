import { Box, Flex, Image, Text, Button, FormControl, FormLabel, Input, Link } from "@chakra-ui/react";
import React, { useState } from 'react';
import swal from 'sweetalert2';

import LogoSkillbridge from "@/assets/images/logo_SkillBridge.png";
import LogoInstagram from "@/assets/images/logo_instagram.png";
import LogoFacebook from "@/assets/images/logo_facebook.png";
import LogoWhatsapp from "@/assets/images/logo_whatsapp.png";
import LogoBCA from "@/assets/images/logo_bca.png";
import LogoBRI from "@/assets/images/logo_bri.png";
import LogoBNI from "@/assets/images/logo_bni.png";
import LogoMandiri from "@/assets/images/logo_mandiri.png";
import LogoPermataBank from "@/assets/images/logo_permatabank.png";
import LogoVisa from "@/assets/images/logo_visa.png";
import LogoMasterCard from "@/assets/images/logo_mastercard.png";
import LogoSupermarket from "@/assets/images/logo_supermarket.png";
import LogoGopay from "@/assets/images/logo_gopay.png";
import LogoQris from "@/assets/images/logo_qris.png";
import config from '@/config';
import linkedIn from "@/assets/linkedIn.svg";

const Footer = () => {
    const [subscribeEmail, setSubscribeEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const baseUrl = config.apiBaseUrl;

    const handleSubscribe = async (event) => {
        
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!subscribeEmail || !emailRegex.test(subscribeEmail)) {
            swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid email address!',
            });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${baseUrl}/email/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subscriber_email : subscribeEmail }),
            });

            if (response.ok) {
                swal.fire({
                    icon: 'success',
                    title: 'Subscribed!',
                    text: 'You have successfully subscribed to our newsletter. We appreciate your interest and will keep you updated with the latest news.',
                });
                setSubscribeEmail('');
            } else {
                const errorData = await response.json();
                swal.fire({
                    icon: 'error',
                    title: 'Subscription failed',
                    text: errorData.message || 'Something went wrong. Please try again later.',
                });
            }
        } catch (error) {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred. Please try again later.',
            });
        }
    };

    return (
        <>
            <Box bgColor={"#9AC5F4"} height={50}></Box>
            <Box position={"relative"} display="flex" justifyContent="center">
                <Box
                    position={"absolute"}   
                    transform={"translateY(-20%)"}
                    bg={"#fff"}
                    shadow={"md"}
                    height={"fit-content"}
                    width={{ base: "90%", md: "70%" }}
                    borderRadius={"10px"}
                    p={{base: 4, md: 6, lg: 8}}
                    mt={{base: 5, md: 0}}
                >
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        justifyContent={"space-between"}
                        alignItems={{ base: "flex-start", md: "center" }}
                        gap={4}
                    >
                        <Box width={{ base: "100%", md: "40%" }} textAlign={{ base: "center", md: "left" }}>
                            <Text fontSize={"xl"} fontWeight={"semibold"} color={"#1450A3"}>
                                Subscribe to
                            </Text>
                            <Text fontSize={"4xl"} fontWeight={"bold"}>Our Newsletter</Text>
                        </Box>
                        <Box width={{ base: "100%", md: "60%" }}>
                            <FormControl width={"100%"}>
                                <FormLabel>Enter your email</FormLabel>
                                <Flex flexDirection={{ base: "column", md: "row" }} gap={2}>
                                    <Input type='email' placeholder="Skillbridge@gmail.com" borderRadius={"20px"} bgColor={"#EDEDED"} 
                                        value={subscribeEmail} onChange={(e) => setSubscribeEmail(e.target.value)}/>
                                    <Button colorScheme={"blue"} bgColor={"#004BAD"} borderRadius={"20px"} type="submit" onClick={handleSubscribe}>Subscribe</Button>
                                </Flex>
                            </FormControl>
                        </Box>
                    </Flex>
                </Box>
            </Box>
            <Box as="footer" pt={{ base: "60" ,md: "40" }} bg="#9AC5F4" color="black">
                <Flex
                    maxW="6xl"
                    mx="auto"
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align={{base: 'center', md: "flex-start"}}
                    textAlign={{ base: 'center', md: 'left' }}
                    pb={10}
                    gap={10}
                >
                    {/* Brand Logo and Payment Methods */}
                    <Box mb={{ base: "4", md: "0" }} display="flex" flexDirection="column" alignItems={{ base: "center", md: "start" }} pl={{ base: "0", md: "5", lg: "0" }}>
                        <Image src={LogoSkillbridge} alt="Brand Logo" objectFit="cover" />
                        <Text fontSize="lg" fontWeight="medium">
                            Pioneer your dream career with SkillBridge
                        </Text>
                        {/* Social Media */}
                        <Flex direction="row" gap={4} my={"15"} justifyContent={{ base: 'center', md: 'flex-start' }}>
                            <Link href="https://www.instagram.com/skillbridge.id/" target="_blank">
                                <Image src={LogoInstagram} alt="Logo Instagram" boxSize={"25px"} />
                            </Link>
                            <Link href="https://www.facebook.com/profile.php?id=61558652302818" target="_blank">
                                <Image src={LogoFacebook} alt="Logo Facebook" boxSize={"25px"} />
                            </Link>
                            <Link href="https://wa.me/6282295345875">
                                <Image src={LogoWhatsapp} alt="Logo Whatsapp" boxSize={"25px"} />
                            </Link>
                        </Flex>

                        <Text fontSize="lg" fontWeight="medium" mb={2}>
                            Payment Method
                        </Text>
                        <Box 
                            display="grid" 
                            gridTemplateColumns={{ base: "repeat(3, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(5, 1fr)"}} 
                            gap={4} 
                            mb={4} 
                            width="100%"
                            justifyItems="center"
                        >
                            <Box
                                borderWidth="1px"
                                borderRadius="md"
                                overflow="hidden"
                                width="70px"
                                height="35px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                bg="white"
                                p={2}
                            >
                                <Image src={LogoBCA} alt="Logo BCA" />
                            </Box>
                            <Box
                                borderWidth="1px"
                                borderRadius="md"
                                overflow="hidden"
                                width="70px"
                                height="35px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                bg="white"
                                p={2}
                            >
                                <Image src={LogoBRI} alt="Logo BRI" />
                            </Box>
                            <Box
                                borderWidth="1px"
                                borderRadius="md"
                                overflow="hidden"
                                width="70px"
                                height="35px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                bg="white"
                                p={2}
                            >
                                <Image src={LogoBNI} alt="Logo BNI" />
                            </Box>
                            <Box
                                borderWidth="1px"
                                borderRadius="md"
                                overflow="hidden"
                                width="70px"
                                height="35px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                bg="white"
                                p={2}
                            >
                                <Image src={LogoMandiri} alt="Logo Mandiri" />
                            </Box>
                            <Box
                                borderWidth="1px"
                                borderRadius="md"
                                overflow="hidden"
                                width="70px"
                                height="35px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                bg="white"
                                p={2}
                            >
                                <Image src={LogoPermataBank} alt="Logo Permata" />
                            </Box>
                            <Box
                                borderWidth="1px"
                                borderRadius="md"
                                overflow="hidden"
                                width="70px"
                                height="35px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                bg="white"
                                p={2}
                            >
                                <Image src={LogoVisa} alt="Logo Visa" />
                            </Box>
                            <Box
                                borderWidth="1px"
                                borderRadius="md"
                                overflow="hidden"
                                width="70px"
                                height="35px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                bg="white"
                                p={2}
                            >
                                <Image src={LogoMasterCard} alt="Logo MasterCard" />
                            </Box>
                            <Box
                                borderWidth="1px"
                                borderRadius="md"
                                overflow="hidden"
                                width="70px"
                                height="35px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                bg="white"
                                p={2}
                            >
                                <Image src={LogoSupermarket} alt="Logo Supermarket" />
                            </Box>
                            <Box
                                borderWidth="1px"
                                borderRadius="md"
                                overflow="hidden"
                                width="70px"
                                height="35px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                bg="white"
                                p={2}
                            >
                                <Image src={LogoGopay} alt="Logo Gopay" />
                            </Box>
                            <Box
                                borderWidth="1px"
                                borderRadius="md"
                                overflow="hidden"
                                width="70px"
                                height="35px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                bg="white"
                                p={2}
                                gridColumn={{ base: "span 3", md: "auto" }}
                                justifySelf="center"
                            >
                                <Image src={LogoQris} alt="Logo QRIS" />
                            </Box>
                        </Box>
                    </Box>

                    <Flex
                        direction="column"
                        alignItems={{ base: 'center', md: 'flex-start' }}
                        textAlign={{ base: 'center', md: 'left' }}
                        mb={{ base: "2", md: "0" }}
                        pt={{ base: "0", md: "5rem"}}
                    >
                        <Text fontSize="lg" fontWeight="bold">
                            Skillbridge
                        </Text>
                        <Link href="#" my={1}>
                            About
                        </Link>
                        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeJiWiYl8GX3r5uw-oaoYRTpjk9tT_aJn65XYvuZXm8FppQtg/viewform" my={1} target="_blank" rel="noopener noreferrer">
                            Career
                        </Link>
                        <Link href="#" my={1}>
                            Cooperation
                        </Link>
                        <Link href="https://kursuseksporonline.id/blog/" my={1} target="_blank" rel="noopener noreferrer">
                            Blog
                        </Link>
                    </Flex>

                    <Flex
                        direction="column"
                        alignItems={{ base: 'center', md: 'flex-start' }}
                        textAlign={{ base: 'center', md: 'left' }}
                        mb={{ base: "2", md: "0" }}
                        pt={{ base: "0", md: "5rem"}}
                    >
                        <Text fontSize="lg" fontWeight="bold">
                            More
                        </Text>
                        <Link href="https://docs.google.com/document/d/1sHQrMUHjp9Tguzfvwk1_hJNIBJiD1pKMVDpKRjvBkxQ/edit?usp=sharing" target="_blank" rel="noopener noreferrer" my={1}>
                            FAQ
                        </Link>
                        <Link href="/terms" my={1}>
                            Terms and Conditions
                        </Link>
                        <Link href="/privacy" my={1}>
                            Privacy Policy
                        </Link>
                    </Flex>

                    <Flex
                        direction="column"
                        alignItems={{ base: 'center', md: 'flex-start' }}
                        textAlign={{ base: 'center', md: 'left' }}
                        pt={{ base: "0", md: "5rem"}}
                    >
                        <Text fontSize="lg" fontWeight="bold">
                            Skillbridge Location
                        </Text>
                        <Text whiteSpace="pre-line" my={1}>
                            Kawasan Grage City Biz Center Oasis{"\n"}
                            Blok A VII No. 9, Pegambiran,{"\n"}
                            Lemahwungkuk, Kota Cirebon,{"\n"}
                            Jawa Barat 45113
                        </Text>
                    </Flex>
                </Flex>

                {/* Copyright */}
                <Flex
                    mt="4"
                    textAlign="center"
                    bg="#337CCF"
                    height={75}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Text color="white" fontWeight="bold" fontSize={{ base: 'sm' ,md: 'md'}}>
                        &copy; 2023 - 2024 Skillbridge. All rights reserved.
                    </Text>
                </Flex>
            </Box>
        </>
    );
};

export default Footer;
