import LogoSkillbridge from "@/components/LogoSkillbridge";
import { Button, Text, Divider, Image, Link, Stack, SimpleGrid, Center, Input, InputGroup, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import config from '@/config';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const toast = useToast();
    const baseUrl = config.apiBaseUrl;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${baseUrl}/email/send_password_reset_email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                toast({
                    title: "Email Sent!",
                    description: "A reset code has been sent to your email. Please enter it below.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                onOpen(); // Open the modal for entering reset code
            } else {
                const errorData = await response.json();
                toast({
                    title: "Error",
                    description: errorData.message || "Failed to send reset email. Please try again.",
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
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        setIsVerifying(true);
        try {
            const response = await fetch(`${baseUrl}/email/reset_code_check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, reset_code: resetCode }),
            });

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Code verified! Redirecting to change password page.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                window.location.href = `http://149.28.133.123:8302/auth/resetpassword?email=${encodeURIComponent(email)}`;
            } else {
                const errorData = await response.json();
                toast({
                    title: "Error",
                    description: errorData.message || "Invalid reset code.",
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
        } finally {
            setIsVerifying(false);
        }
    };

    const handleCancel = () => {
        sessionStorage.clear();
        navigate('/auth/login');
    };

    return (
        <>
            <SimpleGrid columns={2} spacing={10} mt={12}>
                <Stack align='flex-start' width="100%">
                    <LogoSkillbridge width='30vh' ml='12' />
                    <Text fontSize='4xl' as='b' ml='12'>
                        Come and Join 
                        <br />SkillBridge!
                    </Text>
                    <Center width={'100%'}>
                        <Image src={'/src/assets/images/BookBridge.png'} alt='' width="50vh" height='auto' ml={'10'} />
                    </Center>
                </Stack>
                <Stack spacing={4} mr={'10'}>
                    <Text fontSize='2xl' as='b' textAlign={'end'} mr={'12'} mt={'1hv'}>
                        Already have an account?{' '}
                        <Link color="#7091f5" href="/auth/login">
                            Log in here
                        </Link>
                    </Text>
                    <Text fontSize="3xl" fontWeight="bold" mt={'5vh'}>
                        Forgot Password
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="#545454" mt={'-4'}>
                        Please enter your account information.
                    </Text>

                    <Center mt={6}>
                        <Stack spacing={6} mr={'10'}>
                            <InputGroup mt={'35'}>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    width='65vh'
                                    height='7vh'
                                    fontSize="20px"
                                    borderColor="#7091F5"
                                    placeholder="Email"
                                />
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
                                isLoading={isLoading}  // Display loading spinner
                            >
                                Reset Password
                            </Button>
                            <Divider borderColor={"#108EE9"} />
                            <Button onClick={handleCancel} bg="white" color="#7091F5" border="2px solid" borderColor="#7091F5" borderRadius="2xl" height="7vh" _hover={{ bg: "gray.200" }} >
                                Cancel
                            </Button>
                        </Stack>
                    </Center>
                </Stack>
            </SimpleGrid>

            {/* Modal for entering reset code */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Enter Reset Code</ModalHeader>
                    <ModalBody>
                        <Text>A reset code has been sent to your email. Please enter it below to verify your identity.</Text>
                        <Input
                            mt={4}
                            placeholder="Enter reset code"
                            value={resetCode}
                            onChange={(e) => setResetCode(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleVerifyCode} isLoading={isVerifying}>
                            Verify Code
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
