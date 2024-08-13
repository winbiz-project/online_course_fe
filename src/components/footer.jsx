import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Text, Link } from "@chakra-ui/react";

import LogoSkillbridge from "@/assets/images/logo_SkillBridge.png";
import LogoInstagram from "@/assets/images/logo_instagram.png"
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
import linkedIn from "@/assets/linkedIn.svg";

import React, { useState } from 'react';
import axios from "axios";
import swal from 'sweetalert2';

const Footer = () => {
    const [subscribeEmail, setSubscribeEmail] = useState('');

    const handleSubscribe = async (event) => {
        event.preventDefault();

        const emailToSubscribe = subscribeEmail;

        swal.fire({
            title: 'Thank You!',
            text: 'You have successfully subscribed to our newsletter. We appreciate your interest and will keep you updated with the latest news.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        setSubscribeEmail('');

        try {
            const response = await axios.post('https://online-course-be.vercel.app/email/subscribe', {
                subscriber_email: emailToSubscribe,
            });

        } catch (error) {
            console.error('There was an error!', error);
            swal.fire({
                title: 'Error',
                text: 'There was an error with the subscription. Please check your email and try again.',
                icon: 'error',
                confirmButtonText: 'OK'
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
                    height={"40"}
                    width={"70%"}
                    borderRadius={"10px"}
                >
                    <Flex
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        height={"100%"}
                        paddingX={"10"}
                    >
                        <Box className="w-2/5">
                            <Text fontSize={"xl"} fontWeight={"semibold"} color={"#FFC007"}>
                                Programmer
                            </Text>
                            <Text fontSize={"4xl"} fontWeight={"bold"}>Our Newsletter</Text>
                        </Box>
                        <Box className="w-3/5">
                            <FormControl width={"100%"}>
                                <FormLabel>Enter your email</FormLabel>
                                <Flex flexDirection={"row"} gap={"2"}>
                                    <Input type='email' placeholder="Skillbridge@gmail.com" borderRadius={"20px"} bgColor={"#EDEDED"} 
                                        value={subscribeEmail} onChange={(e) => setSubscribeEmail(e.target.value)}/>
                                    <Button px={"10"} colorScheme={"blue"} bgColor={"#004BAD"} borderRadius={"20px"} type="submit" onClick={handleSubscribe}>Mencoba</Button>
                                </Flex>
                            </FormControl>
                        </Box>

                    </Flex>
                </Box>
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
                    {/* Brand Logo and Payment Methods */}
                    <Box mb={{ base: "4", md: "0" }} display="flex" flexDirection="column" alignItems="start">
                        <Image src={LogoSkillbridge} alt="Brand Logo" objectFit="cover" />
                        <Text fontSize="lg" fontWeight="medium">
                            Rintis Karir Impian Bersama SkillBridge
                        </Text>
                        {/* Social Media */}
                        <Flex direction="row" gap={4} my={"15"}>
                            <Link href="https://www.instagram.com/skillbridge.id/" target="_blank">
                            <Image
                                src={LogoInstagram}
                                alt="Logo Instagram"
                                objectFit="cover"
                                boxSize={"25px"}
                            />
                            </Link>
                            <Link href="https://www.facebook.com/profile.php?id=61558652302818" target="_blank">
                            <Image
                                src={LogoFacebook}
                                alt="Logo Facebook"
                                objectFit="cover"
                                boxSize={"25px"}
                            />
                            </Link>
                            <Link href="https://wa.me/6282295345875">
                            <Image
                                src={LogoWhatsapp}
                                alt="Logo Whatsapp"
                                objectFit="cover"
                                boxSize={"25px"}
                            />
                            </Link>
                        </Flex>

                        <Text fontSize="lg" fontWeight="medium" mb={"2"}>
                            Metode Pembayaran
                        </Text>
                        <Flex direction="row" gap={4} mb={4} wrap="wrap">
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
                            <Image
                                src={LogoBCA}
                                alt="Logo BCA"
                            />
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
                            <Image
                                src={LogoBRI}
                                alt="Logo BRI"
                            />
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
                            <Image
                                src={LogoBNI}
                                alt="Logo BNI"
                            />
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
                            <Image
                                src={LogoMandiri}
                                alt="Logo Mandiri"
                            />
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
                            <Image
                                src={LogoPermataBank}
                                alt="Logo Permata"
                                objectFit={"fill"}
                            />
                            </Box>
                        </Flex>
                        <Flex direction="row" gap={4} mb={"30"} wrap="wrap">
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
                            <Image
                                src={LogoVisa}
                                alt="Logo Visa"
                            />
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
                            <Image
                                src={LogoMasterCard}
                                alt="Logo MasterCard"
                            />
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
                            <Image
                                src={LogoSupermarket}
                                alt="Logo Supermarket"
                            />  
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
                            <Image
                                src={LogoGopay}
                                alt="Logo Gopay"
                            />
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
                            <Image
                                src={LogoQris}
                                alt="Logo QRIS"
                            />
                            </Box>
                        </Flex>
                    </Box>

                    <Box>
                        
                    </Box>
                    <Box mb={{ base: "4", md: "0" }} alignItems="center">
                        <Text fontSize="lg" fontWeight="bold">
                            Skillbridge
                        </Text>
                        <Flex direction="column">
                            <Link href="#">Tentang</Link>
                            <Link href="#">Karir</Link>
                            <Link href="#">Kerjasama</Link>
                            <Link href="#">Blog</Link>
                        </Flex>
                    </Box>

                    <Box mb={{ base: "4", md: "0" }} alignItems="center">
                        <Text fontSize="lg" fontWeight="bold">
                            Lainnya
                        </Text>
                        <Flex direction="column">
                            <Link href="#">FAQ</Link>
                            <Link href="/terms">Syarat dan Ketentuan</Link>
                            <Link href="/privacy">Ketentuan Privasi</Link>
                        </Flex>
                        </Box>

                        <Box mb={{ base: "4", md: "0" }} alignItems="center">
                        <Text fontSize="lg" fontWeight="bold">
                            Skillbridge Location
                        </Text>
                        <Text whiteSpace="pre-line">
                            Kawasan Grage City Biz Center Oasis{"\n"}
                            Blok A VII No. 9, Pegambiran,{"\n"}
                            Lemahwungkuk, Kota Cirebon,{"\n"}
                            Jawa Barat 45113
                        </Text>
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
                    &copy; 2023 - 2024 Skillbridge. All rights reserved.
                    </Text>
                </Flex>
            </Box>

        </>
    );
};

export default Footer;
