import LogoSkillbridge from "@/components/LogoSkillbridge";
import { Button, Checkbox, Divider, Flex, Image, Link, Spacer, Text, Stack, Box, SimpleGrid , Center, InputGroup, InputRightElement, IconButton} from "@chakra-ui/react";
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'
import React, {useState, useContext} from 'react';
import InputText from "@/components/InputText";
import AuthContext from "@/routes/authcontext";
import { useBreakpointValue } from "@chakra-ui/react";


export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {loginUser, GoogleLogin} = useContext(AuthContext);

  const inputWidth = useBreakpointValue({ base: "90vw", md: "65vh" });
  const contentAlign = useBreakpointValue({ base: "center", md: "flex-start" });
  const textAlign = useBreakpointValue({ base: "center", md: "left" });
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      loginUser(email, password, navigate);
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      GoogleLogin (navigate);
    }finally{
      setLoading(false);
    }
  }

//   return (
//     <SimpleGrid columns={2} spacing={10} mt={12}>
//       <Stack align='flex-start' width="100%">
//         <LogoSkillbridge width='30vh' ml='12'/>

//         <Text fontSize='4xl' as='b' ml='12'>
//           Halo! Selamat Datang
//           <br />Kembali di SkillBridge</Text>

//         <Image src={'/src/assets/images/tijiko_3d.png'} alt='' height={'100%'} />
//       </Stack>
//       <Stack spacing={4}mr={'10'}>
//         <Text fontSize='2xl' as='b' textAlign={'end'} mr={'12'} mt={'1hv'}>
//           Belum memiliki akun?{' '}
//           <Link color="#7091f5" href="/auth/register">
//             Daftar disini
//           </Link>
//         </Text>
//         <Text fontSize="3xl" fontWeight="bold" mt={'5vh'}>
//           Masuk ke Skillbridge
//         </Text>
//         <Text fontSize="2xl" fontWeight="bold" color="#545454" mt={'-4'}>
//           Silakan masukkan informasi akun anda.
//         </Text>

//         <Center mt={6}>
//           <Stack spacing={6}mr={'10'}> 
//             <InputText width='65vh' height='7vh' fontSize="20px"
//               placeholder="Email" onChange={(e) => setEmail(e.target.value)}
//             />
//             <InputGroup >
//               <InputText width='65vh' height='7vh'
//                 type={show ? "text" : "password"}
//                 placeholder="Password"
//                 fontSize="20px"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <InputRightElement  height="100%" display="flex" alignItems="center" mr={2}>
//                 <IconButton
//                   variant="unstyled"
//                   onClick={handleShow}
//                   color="#8A8A8A"
//                   fontSize="24px"
//                   icon={show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
//                 />
//               </InputRightElement>
//           </InputGroup>
//             <Flex justifyContent="flex-end">
//               <Link color="#7091F5" fontWeight={600} fontSize="20px">
//                 Lupa Password?
//               </Link>
//             </Flex>
//             <Button onClick={handleLogin} width='65vh' height='7vh' colorScheme="blue" bgColor="#7091F5" textColor="white" shadow="lg" fontSize='20px'>
//               Masuk
//             </Button>
//             <Divider borderColor={"#108EE9"} />
//             <Button onClick={handleGoogleLogin} bg="white" color="#7091F5" border="2px solid" borderColor="#7091F5" borderRadius="2xl" height="7vh" _hover={{ bg: "gray.200" }} leftIcon={<FcGoogle size="24px" />}>
//               Masuk Dengan Google
//             </Button>
//           </Stack>
//         </Center>
//       </Stack>
//     </SimpleGrid>
//   )
// }
return (
  <Flex direction={{ base: "column", md: "row" }} mt={{ base: 6, md: 0 }} px={{ base: 4, md: 0 }}>
    <Stack align={contentAlign} width="100%" spacing={4}>
      <LogoSkillbridge width={useBreakpointValue({ base: "20vh", md: "30vh" })} ml={{ base: 0, md: 12 }} />

      <Text fontSize={{ base: "2xl", md: "4xl" }} as="b" ml={{ base: 0, md: 12 }} textAlign={textAlign}>
        Halo! Selamat Datang
        <br />Kembali di SkillBridge
      </Text>

      <Center display={{ base: "none", md: "block" }} p={0} m={0} width="100%">
        <Image src={'/src/assets/images/tijiko_3d.png'} alt='' height="100%" width="100%" objectFit="cover" />
      </Center>
    </Stack>

    <Stack spacing={4} width="100%" mr={{ base: 0, md: 10 }} mt={{ base: 6, md: 0 }} ml={{ base: 0, md: 40 }}>
      <Text fontSize={{ base: "md", md: "2xl" }} as="b" textAlign="end" mr={{ base: 0, md: 12 }} mt={{ base: 4, md: '1vh' }}>
        Belum memiliki akun?{' '}
        <Link color="#7091f5" href="/auth/register">
          Daftar disini
        </Link>
      </Text>
      <Text fontSize={{ base: "xl", md: "3xl" }} fontWeight="bold" mt={{ base: 2, md: '5vh' }}>
        Masuk ke Skillbridge
      </Text>
      <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold" color="#545454" mt={{ base: -1, md: -4 }}>
        Silakan masukkan informasi akun anda.
      </Text>

      <Center mt={6}>
        <Stack spacing={4} width="100%">
          <InputText width={inputWidth} height='7vh' fontSize="20px"
            placeholder="Email" onChange={(e) => setEmail(e.target.value)}
          />
          <InputGroup width={inputWidth}>
            <InputText height='7vh'
              type={show ? "text" : "password"}
              placeholder="Password"
              fontSize="20px"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement height="100%" display="flex" alignItems="center" mr={4}>
              <IconButton
                variant="unstyled"
                onClick={handleShow}
                color="#8A8A8A"
                fontSize="24px"
                icon={show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              />
            </InputRightElement>
          </InputGroup>
          <Flex justifyContent="space-between" width={inputWidth}>
            <Box />
            <Link color="#7091F5" fontWeight={600} fontSize="20px">
              Lupa Password?
            </Link>
          </Flex>
          <Button onClick={handleLogin} width={inputWidth} height='7vh' colorScheme="blue" bgColor="#7091F5" textColor="white" shadow="lg" fontSize='20px' borderRadius="2xl">
            Masuk
          </Button>
          <Divider borderColor={"#108EE9"} width={inputWidth} />
          <Button onClick={handleGoogleLogin} width={inputWidth} height="7vh" bg="white" color="#7091F5" border="2px solid" borderColor="#7091F5" borderRadius="2xl" fontSize="20px" shadow="lg" _hover={{ bg: "gray.200" }} leftIcon={<FcGoogle size="24px" />}>
            Masuk Dengan Google
          </Button>
        </Stack>
      </Center>
    </Stack>
  </Flex>
);
}