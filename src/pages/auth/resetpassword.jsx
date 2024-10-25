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
        <SimpleGrid columns={2} spacing={10} mt={12}>
            <Stack align='flex-start' width="100%">
                <LogoSkillbridge width='30vh' ml='12' />
                <Text fontSize='4xl' as='b' ml='12'>
                    Ayo Bergabung dengan
                    <br />SkillBridge
                </Text>
                <Center width={'100%'}>
                    <Image src={'/src/assets/images/BookBridge.png'} alt='' width="50vh" height='auto' ml={'10'} />
                </Center>
            </Stack>
            <Stack spacing={4} mr={'10'}>
                <Text fontSize='2xl' as='b' textAlign={'end'} mr={'12'} mt={'1hv'}>
                    Sudah punya akun?{' '}
                    <Link color="#7091f5" href="/auth/login">
                        Masuk disini
                    </Link>
                </Text>
                <Text fontSize="3xl" fontWeight="bold" mt={'5vh'}>
                    Reset Password
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="#545454" mt={'-4'}>
                    Silakan masukkan informasi akun anda.
                </Text>

                <Center mt={6}>
                    <Stack spacing={6} mr={'10'}>
                        <Text fontSize="2xl" fontWeight="bold" color="#545454">
                            Email : {email}
                        </Text>

                        <InputGroup>
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                width='65vh'
                                height='7vh'
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

                        <InputGroup>
                            <Input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                width="65vh"
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
                            width='65vh'
                            height='7vh'
                            colorScheme="blue"
                            bgColor="#7091F5"
                            textColor="white"
                            shadow="lg"
                            fontSize='20px'
                            onClick={handleSubmit}
                        >
                            Ubah Password
                        </Button>
                        <Divider borderColor={"#108EE9"} />
                        <Button onClick={handleCancel} bg="white" color="#7091F5" border="2px solid" borderColor="#7091F5" borderRadius="2xl" height="7vh" _hover={{ bg: "gray.200" }}>
                            Batal
                        </Button>
                    </Stack>
                </Center>
            </Stack>
        </SimpleGrid>
    );
}
