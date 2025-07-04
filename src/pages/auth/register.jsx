import LogoSkillbridge from "@/components/LogoSkillbridge";
import LogoRegister from "@/assets/images/BookBridge.png";
import { Button, Checkbox, Divider, Flex, Image, Link, Spacer, Text, Stack, IconButton, SimpleGrid, Center, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc';
import {useNavigate} from 'react-router-dom';
import React, { useState, useContext } from 'react';
import swal from 'sweetalert2';
import { registerUser } from "@/routes/authcontext";
import { useBreakpointValue } from "@chakra-ui/react";

import AuthContext from "@/routes/authcontext";

export default function Register() {
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const handleShow1 = () => {
        setShow1(!show1)
    }
    const handleShow2 = () => {
        setShow2(!show2)
    }

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const {loginUser, GoogleLogin} = useContext(AuthContext)
    const navigate = useNavigate();

    const inputWidth = useBreakpointValue({ base: "90vw", md: "65vh" });

    const emailRegex = /^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$/;

    // Fungsi Validasi
    function isValidEmail(email) {
      return emailRegex.test(email);
    }

    const handleGoogleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      try{
        GoogleLogin (navigate);
      }finally{
        setLoading(false);
      }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !username || !password || !confirmPassword) {
          swal.fire({
            title:"Please fill out all fields.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: 'OK'
          })
        }

        if (!isValidEmail(email)){
          swal.fire({
            title: "Invalid Email Address",
            text: "Please enter a valid email address in the format: user@example.com.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: 'OK'
          })
        }

        if (password !== confirmPassword) {
            swal.fire({
                title: 'Error',
                text: 'Password dan Confirm Password tidak sama',
                icon: 'error',
                showCloseButton: true,
                confirmButtonText: 'OK'
            })
        }else {            
            registerUser(username, email, password, confirmPassword,navigate)
        }

    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit(e);
      }
    }


return (
  <Flex direction={{ base: "column", md: "row" }} mt={{ base: 6, md: 12 }} px={{ base: 4, md: 0 }} overflowY="auto">
  <Stack align={{ base: "center", md: "flex-start" }} width="100%" spacing={4}>
    <LogoSkillbridge width={useBreakpointValue({ base: "20vh", md: "30vh" })} ml={{ base: 0, md: 12 }} />

    <Text
      fontSize={{ base: "lg", sm: "xl", md: "4xl" }}
      as="b"
      ml={{ base: 0, md: 12 }}
      textAlign={{ base: "center", md: "left" }}
    >
      Come and Join
      <br />
      SkillBridge!
    </Text>

    <Center width="100%" ml={{ base: 6, md: 10 }} display={{ base: "none", md: "block" }}>
      <Image src={LogoRegister} alt="" width={useBreakpointValue({ base: "80%", md: "50vh" })} height="auto" />
    </Center>
  </Stack>

  <Stack spacing={4} width="100%" mr={{ base: 0, md: 10 }} mt={{ base: 6, md: 0 }} ml={{ base: 0, md: 40 }}>
    <Text
      fontSize={{ base: "sm", sm: "md", md: "2xl" }}
      as="b"
      textAlign="end"
      mr={{ base: 2, md: 12 }}
      mt={{ base: 2, md: "1vh" }}
      wordBreak="break-word"
    >
      Already have an account?{" "}
      <Link color="#7091f5" href="/auth/login">
        Log in here
      </Link>
    </Text>

    <Text
      fontSize={{ base: "lg", sm: "xl", md: "3xl" }}
      fontWeight="bold"
      mt={{ base: 2, md: "5vh" }}
      textAlign={{ base: "center", md: "left" }}
      wordBreak="break-word"
    >
      Register to Skillbridge
    </Text>

    <Text
      fontSize={{ base: "sm", sm: "md", md: "2xl" }}
      fontWeight="bold"
      color="#545454"
      mt={{ base: -1, md: -4 }}
      textAlign={{ base: "center", md: "left" }}
      wordBreak="break-word"
    >
      Please enter your account information.
    </Text>

    <Center mt={6}>
      <Stack spacing={4} width="100%">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          width={inputWidth}
          height="7vh"
          fontSize="20px"
          _placeholder={{ color: "#8A8A8A", fontWeight: "500" }}
          borderColor="#7091F5"
          placeholder="Email"
          onKeyDown={handleKeyDown}
        />
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          width={inputWidth}
          height="7vh"
          fontSize="20px"
          _placeholder={{ color: "#8A8A8A", fontWeight: "500" }}
          borderColor="#7091F5"
          placeholder="Full Name"
          onKeyDown={handleKeyDown}
        />
        <InputGroup width={inputWidth}>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            height="7vh"
            fontSize="20px"
            type={show1 ? "text" : "password"}
            _placeholder={{ color: "#8A8A8A", fontWeight: "500" }}
            borderColor="#7091F5"
            placeholder="Password"
            onKeyDown={handleKeyDown}
          />
          <InputRightElement height="100%" display="flex" alignItems="center" mr={2}>
            <IconButton
              variant="unstyled"
              onClick={handleShow1}
              color="#8A8A8A"
              fontSize="24px"
              icon={show1 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            />
          </InputRightElement>
        </InputGroup>
        <InputGroup width={inputWidth}>
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            height="7vh"
            fontSize="20px"
            type={show2 ? "text" : "password"}
            _placeholder={{ color: "#8A8A8A", fontWeight: "500" }}
            borderColor="#7091F5"
            placeholder="Confirm Password"
            onKeyDown={handleKeyDown}
          />
          <InputRightElement height="100%" display="flex" alignItems="center" mr={2}>
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
          width={inputWidth}
          height="7vh"
          colorScheme="blue"
          bgColor="#7091F5"
          textColor="white"
          shadow="lg"
          fontSize="20px"
          onClick={handleSubmit}
        >
          Register
        </Button>
        <Divider borderColor={"#108EE9"} width={inputWidth} />
        <Button
          bg="white"
          color="#7091F5"
          border="2px solid"
          borderColor="#7091F5"
          borderRadius="2xl"
          height="7vh"
          fontSize="20px"
          width={inputWidth}
          shadow="lg"
          _hover={{ bg: "gray.200" }}
          leftIcon={<FcGoogle size="24px" />}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>
      </Stack>
    </Center>
  </Stack>
</Flex>

);
}