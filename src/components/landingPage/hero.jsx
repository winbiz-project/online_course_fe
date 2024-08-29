// import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
// import bg_hero from "@/assets/images/bg-hero-2.png";
// import { FaAngleRight } from "react-icons/fa6";
// import { useNavigate } from 'react-router-dom'

// const Hero = () => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/courses');
//   };

//   return (
//     <Box width={"100%"} height={"100%"} position="relative">
//       <Image
//         src={bg_hero}
//         width={"100%"}
//         height={"100%"}
//         objectFit="cover"
//         filter={"blur(5px)"}
//       />

//       <Flex
//         position="absolute"
//         top="50%"
//         left="50%"
//         transform="translate(-80%, -50%)"
//         flexDirection={"column"}
//       >
//         <Text
//           fontSize="6xl"
//           color="white"
//           fontWeight={"semibold"}
//           className="drop-shadow-lg"
//         >
//           Jadi Ahli di Bidang Anda. Belajar dari yang Terbaik.{" "}
//         </Text>
//         <Text fontSize="3xl" color={"white"} className="drop-shadow-2xl">
//           Dapatkan akses ke ratusan kursus yang dikembangkan oleh
//           para profesional. Belajar kapan saja, di mana saja, dan dapatkan
//           dukungan langsung dari mentor.{" "}
//         </Text>
//         <Button
//           mt={4}
//           bgColor={"#1450A3"}
//           color={"white"}
//           size="lg"
//           width={"fit-content"}
//           onClick={handleClick}
//         >
//           Lihat Ratusan Materi Tersedia <FaAngleRight className="ms-3" />
//         </Button>
//       </Flex>
//     </Box>
//   );
// };

// export default Hero;

import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import bg_hero from "@/assets/images/bg-hero-2.png";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/courses');
  };

  return (
    <Box width="100%" height={{ base: "35vh", md: "60vh", lg: "100vh" }} position="relative">
      <Image
        src={bg_hero}
        width="100%"
        height="100%"
        objectFit="cover"
        filter="blur(5px)"
      />

      <Flex
        position="absolute"
        top="50%"
        left="20%"
        transform="translate(-20%, -50%)"
        flexDirection="column"
        textAlign="left"
        px={4}
        width={{ base: "90%", md: "80%", lg: "60%" }}
      >
        <Text
          fontSize={{ base: "xl", md: "4xl", lg: "6xl" }}
          color="white"
          fontWeight="semibold"
        >
          Jadi Ahli di Bidang Anda. Belajar dari yang Terbaik.
        </Text>
        <Text fontSize={{ base: "sm", md: "lg", lg: "3xl" }} color="white" mt={4}>
          Dapatkan akses ke ratusan kursus yang dikembangkan oleh para profesional.
          Belajar kapan saja, di mana saja, dan dapatkan dukungan langsung dari mentor.
        </Text>
        <Button
          mt={6}
          bgColor="#1450A3"
          color="white"
          size={{base: "sm", md:"md", lg:"lg"}}
          width="fit-content"
          onClick={handleClick}
        >
          Lihat Ratusan Materi Tersedia <FaAngleRight className="ms-3" />
        </Button>
      </Flex>
    </Box>
  );
};

export default Hero;
