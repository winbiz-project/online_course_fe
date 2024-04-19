import LogoSkillbridge from "@/components/LogoSkillbridge";
import { Button, Checkbox, Divider, Flex, Image, Link, Spacer, Text, Stack, Box, SimpleGrid , Center, InputGroup, InputRightElement, IconButton} from "@chakra-ui/react";
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'
import React, {useState, useContext} from 'react';
import InputText from "@/components/InputText";
import AuthContext from "@/routes/authcontext";


export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {loginUser, GoogleLogin} = useContext(AuthContext)
  

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

  return (
    <SimpleGrid columns={2} spacing={10} mt={12}>
      <Stack align='flex-start' width="100%">
        <LogoSkillbridge width='30vh' ml='12'/>

        <Text fontSize='4xl' as='b' ml='12'>
          Halo! Selamat Datang
          <br />Kembali di SkillBridge</Text>

        <Image src={'/src/assets/images/tijiko_3d.png'} alt='' height={'100%'} />
      </Stack>
      <Stack spacing={4}mr={'10'}>
        <Text fontSize='2xl' as='b' textAlign={'end'} mr={'12'} mt={'1hv'}>
          Belum memiliki akun?{' '}
          <Link color="#7091f5" href="/auth/register">
            Daftar disini
          </Link>
        </Text>
        <Text fontSize="3xl" fontWeight="bold" mt={'5vh'}>
          Masuk ke Skillbridge
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="#545454" mt={'-4'}>
          Silakan masukkan informasi akun anda.
        </Text>

        <Center mt={6}>
          <Stack spacing={6}mr={'10'}> 
            <InputText width='65vh' height='7vh' fontSize="20px"
              placeholder="Email" onChange={(e) => setEmail(e.target.value)}
            />
            <InputGroup >
              <InputText width='65vh' height='7vh'
                type={show ? "text" : "password"}
                placeholder="Password"
                fontSize="20px"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement  height="100%" display="flex" alignItems="center" mr={2}>
                <IconButton
                  variant="unstyled"
                  onClick={handleShow}
                  color="#8A8A8A"
                  fontSize="24px"
                  icon={show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                />
              </InputRightElement>
          </InputGroup>
            <Flex justifyContent="flex-end">
              <Link color="#7091F5" fontWeight={600} fontSize="20px">
                Lupa Password?
              </Link>
            </Flex>
            <Button onClick={handleLogin} width='65vh' height='7vh' colorScheme="blue" bgColor="#7091F5" textColor="white" shadow="lg" fontSize='20px'>
              Masuk
            </Button>
            <Divider borderColor={"#108EE9"} />
            <Button onClick={handleGoogleLogin} bg="white" color="#7091F5" border="2px solid" borderColor="#7091F5" borderRadius="2xl" height="7vh" _hover={{ bg: "gray.200" }} leftIcon={<FcGoogle size="24px" />}>
              Masuk Dengan Google
            </Button>
          </Stack>
        </Center>
      </Stack>
    </SimpleGrid>
  )
}