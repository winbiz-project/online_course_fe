import LogoSkillbridge from "@/components/LogoSkillbridge";
import { Button, Checkbox, Divider, Flex, Image, Link, Spacer, Text, VStack } from "@chakra-ui/react";
import { FcGoogle } from 'react-icons/fc';
import InputText from "@/components/InputText";
import InputPassword from "@/components/InputPassword";

export default function Login() {
  return (
    <Flex
      py={"2rem"}
    >

      <Flex flex={1} hideBelow={'md'}>
        <VStack>
          <LogoSkillbridge ml={-12} />

          <Text fontSize='xl' as='b'>
            Halo! Selamat Datang
            <br />Kembali di SkillBridge</Text>

          <Image src={'/src/assets/images/tijiko_3d.png'} alt='' height={'64vh'} />
        </VStack>
      </Flex>

      <Flex flex={1} justifyContent={'center'}>
        <VStack spacing={4}>
          <Text fontSize="lg" fontWeight="bold" ml={-20}>
            Masuk ke Skillbridge
          </Text>

          <Text fontSize="sm" fontWeight="bold" color="#545454">
            Silakan masukkan informasi akun anda.
          </Text>

          <InputText
            placeholder="Username/Email"
          />
          <InputPassword />

          <Flex w="100%">
            <Checkbox>
              <Text fontSize="xs">Ingat Saya</Text>
            </Checkbox>
            <Spacer />

            <Link color="#7091F5" fontWeight={600} fontSize="xs">
              Lupa Password?
            </Link>
          </Flex>

          <Button
            colorScheme="blue"
            bgColor="#7091F5"
            textColor="white"
            shadow="lg"
            w="100%"
          >
            Masuk
          </Button>

          <Divider borderColor={"#108EE9"} />

          <Button
            colorScheme="white"
            textColor="#7091F5"
            variant="outline"
            leftIcon={<FcGoogle />}
            w="100%"
          >
            Masuk dengan Google
          </Button>

          <Text fontSize="sm" fontWeight="semibold" mt={7}>
            Belum memiliki akun?
            <Link color="#7091F5"> Daftar Sekarang.</Link>
          </Text>

          <Text fontSize="sm" fontWeight="semibold">
            Lupa password?
            <Link color="#7091F5"> Reset Passwordmu disini.</Link>
          </Text>
        </VStack>
      </Flex>

    </Flex>
  )
}