import LogoSkillbridge from "@/components/LogoSkillbridge";
import { Button, Text, Divider, Image, Link, Stack, SimpleGrid, Center, Input, InputGroup, InputRightElement, useToast, IconButton } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import config from '@/config';

export default function ResetPassword() {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const baseUrl = config.apiBaseUrl;

    // Retrieve the email from the URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email') || '';

    const handleShow1 = () => setShow1(!show1);
    const handleShow2 = () => setShow2(!show2);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/email/reset_password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    new_password: password
                }),
            });

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Password has been reset successfully. Redirecting to login page.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                navigate('/auth/login');
            } else {
                const errorData = await response.json();
                toast({
                    title: "Error",
                    description: errorData.message || "Failed to reset password. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleCancel = () => {
        sessionStorage.clear();
        navigate('/auth/login');
    };

    return (
        <SimpleGrid 
            columns={{ base: 1, md: 2 }} 
            spacing={10} 
            mt={{ base: 6, md: 12 }} 
            px={{ base: 4, md: 10 }}
            >
            <Stack align={{ base: "center", md: "flex-start" }} width="100%">
                <LogoSkillbridge 
                width={{ base: "20vh", md: "30vh" }} 
                ml={{ base: 0, md: 12 }} 
                />
                <Text 
                fontSize={{ base: "2xl", md: "4xl" }} 
                as="b" 
                ml={{ base: 0, md: 12 }} 
                textAlign={{ base: "center", md: "left" }}
                >
                Ayo Bergabung dengan
                <br />SkillBridge
                </Text>
                <Center width={'100%'}>
                <Image 
                    src={'/src/assets/images/BookBridge.png'} 
                    alt='' 
                    width={{ base: "40vh", md: "50vh" }} 
                    height="auto" 
                    ml={{ base: 0, md: 10 }} 
                />
                </Center>
            </Stack>
            <Stack spacing={4} width="100%" mt={{ base: 4, md: 0 }} ml={{ base: 0, md: 10 }}>
                <Text 
                fontSize={{ base: "md", md: "2xl" }} 
                as="b" 
                textAlign={{ base: "center", md: "end" }} 
                mr={{ base: 0, md: 12 }} 
                >
                Sudah punya akun?{' '}
                <Link color="#7091f5" href="/auth/login">
                    Masuk disini
                </Link>
                </Text>
                <Text 
                fontSize={{ base: "xl", md: "3xl" }} 
                fontWeight="bold" 
                textAlign={{ base: "center", md: "left" }}
                >
                Reset Password
                </Text>
                <Text 
                fontSize={{ base: "lg", md: "2xl" }} 
                fontWeight="bold" 
                color="#545454" 
                textAlign={{ base: "center", md: "left" }}
                >
                Silakan masukkan informasi akun anda.
                </Text>
                <Center>
                <Stack spacing={4} width="100%" align="center">
                    <Text 
                    fontSize={{ base: "md", md: "2xl" }} 
                    fontWeight="bold" 
                    color="#545454" 
                    textAlign={{ base: "center", md: "left" }}
                    >
                    Email : {email}
                    </Text>
                    <InputGroup width={{ base: "90%", md: "65vh" }}>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        height="7vh"
                        fontSize="20px"
                        type={show1 ? "text" : "password"}
                        placeholder="New Password"
                        borderColor="#7091F5"
                    />
                    <InputRightElement height="100%" mr={2}>
                        <IconButton
                        variant="unstyled"
                        onClick={handleShow1}
                        color="#8A8A8A"
                        fontSize="24px"
                        icon={show1 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                        />
                    </InputRightElement>
                    </InputGroup>
                    <InputGroup width={{ base: "90%", md: "65vh" }}>
                    <Input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        height="7vh"
                        fontSize="20px"
                        type={show2 ? "text" : "password"}
                        placeholder="Confirm Password"
                        borderColor="#7091F5"
                    />
                    <InputRightElement height="100%" mr={2}>
                        <IconButton
                        variant="unstyled"
                        onClick={handleShow2}
                        color="#8A8A8A"
                        fontSize="24px"
                        icon={show2 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                        />
                    </InputRightElement>
                    </InputGroup>
                    <Button
                    width={{ base: "90%", md: "65vh" }}
                    height="7vh"
                    colorScheme="blue"
                    bgColor="#7091F5"
                    textColor="white"
                    shadow="lg"
                    fontSize="20px"
                    onClick={handleSubmit}
                    >
                    Ubah Password
                    </Button>
                    <Divider borderColor={"#108EE9"} />
                    <Button 
                    onClick={handleCancel} 
                    bg="white" 
                    color="#7091F5" 
                    border="2px solid" 
                    borderColor="#7091F5" 
                    borderRadius="2xl" 
                    height="7vh" 
                    width={{ base: "90%", md: "65vh" }}
                    _hover={{ bg: "gray.200" }}
                    >
                    Batal
                    </Button>
                </Stack>
                </Center>
            </Stack>
            </SimpleGrid>

    );
}
