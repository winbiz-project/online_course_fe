// import {
//     Box,
//     Flex,
//     Image,
//     Text,
//     Button,
//     Grid,
// } from "@chakra-ui/react";

// import unsplash from "@/assets/images/unsplash.png";
// import { FaCartFlatbedSuitcase } from "react-icons/fa6";
// import CardTestimony from "../card/testimony";

// const Testimony = () => {
//     const testimony = {
//         title: "jumpstart karier, dari hukum ke codywriter",
//         description: "ik yang jumpstart karier, dari hukum ke codywriter, tapi karena ikut Bootcamp Myskill",
//         material: "React Native",
//         image: unsplash,
//     }

//     return (
//         <Flex
//             direction="column"
//             justifyContent="center"
//             alignItems="center"
//             px={"20"}
//             pt={"10"}
//             bgColor={"#9AC5F4"}
//             height={"fit-content"}
//         >
//             <Text fontSize={"xl"} fontWeight={"bold"} color={"#FFC007"}>
//                 TESTIMONI
//             </Text>
//             <Text fontSize={"3xl"} fontWeight={"bold"}>
//                 Cerita Pengguna, Tutor, dan Mitra
//             </Text>
//             <Grid
//                 templateColumns="repeat(2, 1fr)"
//                 py={"10"}
//                 gap={"5"}
//             >
//                 <CardTestimony colspan={1} testimony={testimony} />
//                 <CardTestimony colspan={1} testimony={testimony} />
//                 <CardTestimony colspan={1} testimony={testimony} />
//                 <CardTestimony colspan={1} testimony={testimony} />
//             </Grid>
//         </Flex>
//     )
// }

// export default Testimony

import { Flex, Text, Grid } from "@chakra-ui/react";
import CardTestimony from "../card/testimony";
import unsplash from "@/assets/images/unsplash.png"
import LogoBCA from "@/assets/images/logo_bca.png";
import React, { useState } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const testimonys = [
  {
    title: "Jumpstart Karier, dari Hukum ke Codywriter (1)",
    description: "ik yang jumpstart karier, dari hukum ke codywriter, tapi karena ikut Bootcamp Myskill",
    material: "React Native",
    image: unsplash, // replace with actual image
  },
  {
    title: "Jumpstart Karier, dari Hukum ke Codywriter (2)",
    description: "ik yang jumpstart karier, dari hukum ke codywriter, tapi karena ikut Bootcamp Myskill",
    material: "React Native",
    image: LogoBCA, // replace with actual image
  },

]

const Testimony = () => {
  const testimony = {
    title: "Jumpstart Karier, dari Hukum ke Codywriter",
    description: "ik yang jumpstart karier, dari hukum ke codywriter, tapi karena ikut Bootcamp Myskill",
    material: "React Native",
    image: unsplash, // replace with actual image
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonys.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonys.length - 1 ? 0 : prev + 1));
  };

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      px={4}
      py={10}
      bgColor="#9AC5F4"
    >
      <Text fontSize="xl" fontWeight="bold" color="#FFC007">
        TESTIMONI
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        Cerita Pengguna, Tutor, dan Mitra
      </Text>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        display={{base: 'none', md:'grid'}}
        gap={5}
        py={10}
      >
        <CardTestimony colspan={1} testimony={testimony} />
        <CardTestimony colspan={1} testimony={testimony} />
        <CardTestimony colspan={1} testimony={testimony} />
        <CardTestimony colspan={1} testimony={testimony} />
      </Grid>
      <Flex direction="column" alignItems="center" display={{base: 'block', md: 'none'}}>
        <CardTestimony colspan={1} testimony={testimonys[currentIndex]} />
        <Flex mt={4}>
          <IconButton icon={<ArrowLeftIcon />} onClick={prevSlide} />
          <IconButton icon={<ArrowRightIcon />} onClick={nextSlide} ml={2} />
        </Flex>
    </Flex>
    </Flex>
  );
};

export default Testimony;
