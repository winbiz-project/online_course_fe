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

//   return (
//     <SimpleGrid columns={2} spacing={10} mt={12}>
//       <Stack align='flex-start' width="100%">
//         <LogoSkillbridge width='30vh' ml='12'/>

//         <Text fontSize='4xl' as='b' ml='12'>
//             Ayo Bergabung dengan
//             <br />SkillBridge</Text>
//             <Center width={'100%'}>
//                 <Image src={'/src/assets/images/BookBridge.png'} alt='' width="50vh" height='auto' ml={'10'}/>
//             </Center>
//       </Stack>
//       <Stack spacing={4}mr={'10'}>
//         <Text fontSize='2xl' as='b' textAlign={'end'} mr={'12'} mt={'1hv'}>
//           Sudah punya akun?{' '}
//           <Link color="#7091f5" href="/auth/login">
//             Masuk disini
//           </Link>
//         </Text>
//         <Text fontSize="3xl" fontWeight="bold" mt={'5vh'}>
//           Daftar ke Skillbridge
//         </Text><Text fontSize="2xl" fontWeight="bold" color="#545454" mt={'-4'}>
//           Silakan masukkan informasi akun anda.
//         </Text>

//         <Center mt={6}>
//           <Stack spacing={6}mr={'10'}> 
//             <Input value={email} onChange={(e) => setEmail(e.target.value)} width='65vh' height='7vh' fontSize="20px" _placeholder={{ color: "#8A8A8A", fontWeight: "500" }} borderColor="#7091F5"
//               placeholder="Email"
//             />
//             <Input value={username} onChange={(e) => setUsername(e.target.value)} width='65vh' height='7vh' fontSize="20px" _placeholder={{ color: "#8A8A8A", fontWeight: "500" }} borderColor="#7091F5"
//               placeholder="Username"
//             />
//             <InputGroup>
//               <Input value={password} onChange={(e) => setPassword(e.target.value)} width='65vh' height='7vh' fontSize="20px"
//                 type={show1 ? "text" : "password"} _placeholder={{ color: "#8A8A8A", fontWeight: "500" }} borderColor="#7091F5"
//                 placeholder="Password"
//               />
//               <InputRightElement  height="100%" display="flex" alignItems="center" mr={2}>
//                 <IconButton
//                   variant="unstyled"
//                   onClick={handleShow1}
//                   color="#8A8A8A"
//                   fontSize="24px"
//                   icon={show1 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
//                 />
//               </InputRightElement>
//             </InputGroup>
//             <InputGroup>
//                 <Input
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     width="65vh"
//                     height="7vh"
//                     fontSize="20px"
//                     type={show2 ? "text" : "password"}
//                     _placeholder={{ color: "#8A8A8A", fontWeight: "500" }}
//                     borderColor="#7091F5"
//                     placeholder="Confirm Password"
//                 />
//                 <InputRightElement height="100%" display="flex" alignItems="center" mr={2}>
//                     <IconButton
//                     variant="unstyled"
//                     onClick={handleShow2}
//                     color="#8A8A8A"
//                     fontSize="24px"
//                     icon={show2 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
//                     />
//                 </InputRightElement>
//                 </InputGroup>
//             <Button width='65vh' height='7vh' colorScheme="blue" bgColor="#7091F5" textColor="white" shadow="lg" fontSize='20px' onClick={handleSubmit}>
//               Daftar
//             </Button>
//             <Divider borderColor={"#108EE9"} />
//             <Button bg="white" color="#7091F5" border="2px solid" borderColor="#7091F5" borderRadius="2xl" height="7vh" _hover={{ bg: "gray.200" }} leftIcon={<FcGoogle size="24px" />}>Masuk Dengan Google
//             </Button>
//           </Stack>
//         </Center>
//       </Stack>
//     </SimpleGrid>
//   )
// }

return (
  <Flex direction={{ base: "column", md: "row" }} mt={{ base: 6, md: 12 }} px={{ base: 4, md: 0 }}>
    <Stack align="flex-start" width="100%" spacing={4}>
      <LogoSkillbridge width={useBreakpointValue({ base: "20vh", md: "30vh" })} ml={{ base: 0, md: 12 }} />

      <Text fontSize={{ base: "2xl", md: "4xl" }} as="b" ml={{ base: 0, md: 12 }} textAlign="left">
        Ayo Bergabung dengan
        <br />SkillBridge
      </Text>

      <Center width="100%" ml={{base: 6, md:0}} display={{ base: "none", md: "block" }}>
        <Image src={LogoRegister} alt='' width={useBreakpointValue({ base: "80%", md: "50vh" })} height="auto" />
      </Center>
    </Stack>

    <Stack spacing={4} width="100%" mr={{ base: 0, md: 10 }} mt={{ base: 6, md: 0 }} ml={{ base: 0, md:40 }}>
      <Text fontSize={{ base: "lg", md: "2xl" }} as="b" textAlign="end" mr={{ base: 2, md: 12 }} mt={{ base: 2, md: '1vh' }}>
        Sudah punya akun?{' '}
        <Link color="#7091f5" href="/auth/login">
          Masuk disini
        </Link>
      </Text>
      
      <Text fontSize={{ base: "xl", md: "3xl" }} fontWeight="bold" mt={{ base: 2, md: '5vh' }}>
        Daftar ke Skillbridge
      </Text>
      
      <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold" color="#545454" mt={{ base: -1, md: -4 }}>
        Silakan masukkan informasi akun anda.
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
          />
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            width={inputWidth}
            height="7vh"
            fontSize="20px"
            _placeholder={{ color: "#8A8A8A", fontWeight: "500" }}
            borderColor="#7091F5"
            placeholder="Username"
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
            Daftar
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
            Masuk Dengan Google
          </Button>
        </Stack>
      </Center>
    </Stack>
  </Flex>
);
}