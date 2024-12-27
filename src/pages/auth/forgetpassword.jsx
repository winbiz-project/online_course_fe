import LogoSkillbridge from "@/components/LogoSkillbridge";
import { Button, Text, Flex, Divider, Image, Link, Stack, SimpleGrid, Center, Input, InputGroup, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
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
        // <>
        //     <SimpleGrid columns={2} spacing={10} mt={12}>
        //         <Stack align='flex-start' width="100%">
        //             <LogoSkillbridge width='30vh' ml='12' />
        //             <Text fontSize='4xl' as='b' ml='12'>
        //                 Come and Join 
        //                 <br />SkillBridge!
        //             </Text>
        //             <Center width={'100%'}>
        //                 <Image src={'/src/assets/images/BookBridge.png'} alt='' width="50vh" height='auto' ml={'10'} />
        //             </Center>
        //         </Stack>
        //         <Stack spacing={4} mr={'10'}>
        //             <Text fontSize='2xl' as='b' textAlign={'end'} mr={'12'} mt={'1hv'}>
        //                 Already have an account?{' '}
        //                 <Link color="#7091f5" href="/auth/login">
        //                     Log in here
        //                 </Link>
        //             </Text>
        //             <Text fontSize="3xl" fontWeight="bold" mt={'5vh'}>
        //                 Forgot Password
        //             </Text>
        //             <Text fontSize="2xl" fontWeight="bold" color="#545454" mt={'-4'}>
        //                 Please enter your account information.
        //             </Text>

        //             <Center mt={6}>
        //                 <Stack spacing={6} mr={'10'}>
        //                     <InputGroup mt={'35'}>
        //                         <Input
        //                             value={email}
        //                             onChange={(e) => setEmail(e.target.value)}
        //                             width='65vh'
        //                             height='7vh'
        //                             fontSize="20px"
        //                             borderColor="#7091F5"
        //                             placeholder="Email"
        //                         />
        //                     </InputGroup>
        //                     <Button
        //                         width='65vh'
        //                         height='7vh'
        //                         colorScheme="blue"
        //                         bgColor="#7091F5"
        //                         textColor="white"
        //                         shadow="lg"
        //                         fontSize='20px'
        //                         onClick={handleSubmit}
        //                         isLoading={isLoading}  // Display loading spinner
        //                     >
        //                         Reset Password
        //                     </Button>
        //                     <Divider borderColor={"#108EE9"} />
        //                     <Button onClick={handleCancel} bg="white" color="#7091F5" border="2px solid" borderColor="#7091F5" borderRadius="2xl" height="7vh" _hover={{ bg: "gray.200" }} >
        //                         Cancel
        //                     </Button>
        //                 </Stack>
        //             </Center>
        //         </Stack>
        //     </SimpleGrid>

        //     {/* Modal for entering reset code */}
        //     <Modal isOpen={isOpen} onClose={onClose}>
        //         <ModalOverlay />
        //         <ModalContent>
        //             <ModalHeader>Enter Reset Code</ModalHeader>
        //             <ModalBody>
        //                 <Text>A reset code has been sent to your email. Please enter it below to verify your identity.</Text>
        //                 <Input
        //                     mt={4}
        //                     placeholder="Enter reset code"
        //                     value={resetCode}
        //                     onChange={(e) => setResetCode(e.target.value)}
        //                 />
        //             </ModalBody>
        //             <ModalFooter>
        //                 <Button colorScheme="blue" mr={3} onClick={handleVerifyCode} isLoading={isVerifying}>
        //                     Verify Code
        //                 </Button>
        //                 <Button onClick={onClose}>Cancel</Button>
        //             </ModalFooter>
        //         </ModalContent>
        //     </Modal>
        // </>
        
        <>
        <Flex direction={{ base: "column", md: "row" }} mt={{ base: 6, md: 12 }} px={{ base: 4, md: 0 }}>
        {/* Bagian Kiri */}
        <Stack align={{ base: "center", md: "flex-start" }} width="100%" spacing={6}>
            <LogoSkillbridge width={{ base: "20vh", md: "30vh" }} ml={{ base: 0, md: 12 }} />

            <Text
            fontSize={{ base: "2xl", md: "4xl" }}
            as="b"
            ml={{ base: 0, md: 12 }}
            textAlign={{ base: "center", md: "left" }}
            >
            Come and Join
            <br />
            SkillBridge!
            </Text>

            <Center width="100%" ml={{ base: 0, md: 10 }} display={{ base: "none", md: "block" }}>
            <Image
                src={"/src/assets/images/BookBridge.png"}
                alt=""
                width={{ base: "80%", md: "50vh" }}
                height="auto"
            />
            </Center>
        </Stack>

        {/* Bagian Kanan */}
        <Stack
            spacing={4}
            width="100%"
            mt={{ base: 6, md: 0 }}
            align="center"
        >
            <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "center", md: "flex-end" }}
            width="100%"
            textAlign={{ base: "center", md: "end" }}
            justify="center"
            fontSize={{ base: "md", md: "lg" }}
            >
                <Text
                    fontSize={{ base: "lg", md: "2xl" }}
                    as="b"
                    textAlign={{ base: "center", md: "end" }}
                    mr={{ base: 0, md: 4 }}
                    >
                    Already have an account?{" "}
                    <Link
                        color="#7091f5"
                        href="/auth/login"
                        // as='b'
                        fontSize={{ base: "lg", md: "2xl" }}
                        textAlign={{ base: "center", md: "end" }}
                    >
                        Log in here
                    </Link>
                </Text>
                
            </Flex>

            <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
                Forgot Password
            </Text>
            <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold" color="#545454">
            Please enter your account information.
            </Text>

            <Center mt={6}>
            <Stack spacing={6} width="100%" align="center">
                <InputGroup width={{ base: "90%", md: "65vh" }}>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    width="100%"
                    height="7vh"
                    fontSize="20px"
                    borderColor="#7091F5"
                    placeholder="Email"
                    paddingX={4} // Pastikan padding horizontal sesuai
                />
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
                isLoading={isLoading}
                >
                Reset Password
                </Button>
                <Divider borderColor={"#108EE9"} width={{ base: "90%", md: "65vh" }} />
                <Button
                onClick={handleCancel}
                bg="white"
                color="#7091F5"
                border="2px solid"
                borderColor="#7091F5"
                borderRadius="2xl"
                height="7vh"
                _hover={{ bg: "gray.200" }}
                width={{ base: "90%", md: "65vh" }}
                >
                Cancel
                </Button>
            </Stack>
            </Center>
        </Stack>
        </Flex>

        {/* Modal for entering reset code */}
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Enter Reset Code</ModalHeader>
            <ModalBody>
            <Text>
                A reset code has been sent to your email. Please enter it below to verify your identity.
            </Text>
            <Input
                mt={4}
                placeholder="Enter reset code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                width="100%"
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
