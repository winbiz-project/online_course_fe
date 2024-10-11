import { Flex, Text, Grid } from "@chakra-ui/react";
import CardTestimony from "../card/testimony";
import unsplash from "@/assets/images/unsplash.png"
import LogoBCA from "@/assets/images/logo_bca.png";
import React, { useState } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import SwiperCore from "swiper";

SwiperCore.use([Navigation, Pagination]);

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
    image: unsplash, // replace with actual image
  },
  {
    title: "Jumpstart Karier, dari Hukum ke Codywriter (3)",
    description: "ik yang jumpstart karier, dari hukum ke codywriter, tapi karena ikut Bootcamp Myskill",
    material: "React Native",
    image: unsplash, // replace with actual image
  },
  {
    title: "Jumpstart Karier, dari Hukum ke Codywriter (4)",
    description: "ik yang jumpstart karier, dari hukum ke codywriter, tapi karena ikut Bootcamp Myskill",
    material: "React Native",
    image: unsplash, // replace with actual image
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
        <CardTestimony colspan={1} testimony={testimonys[0]} />
        <CardTestimony colspan={1} testimony={testimonys[1]} />
        <CardTestimony colspan={1} testimony={testimonys[2]} />
        <CardTestimony colspan={1} testimony={testimonys[3]} />
      </Grid>
      <Box w='100%' display={{base: 'block', md: "none"}} mt='5'>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
        >
          {testimonys.map((testimony, index) => (
            <SwiperSlide key={index}>
              <CardTestimony testimony={testimony} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      {/* <Flex direction="column" alignItems="center" display={{base: 'block', md: 'none'}}>
        <CardTestimony colspan={1} testimony={testimonys[currentIndex]} />
        <Flex mt={4}>
          <IconButton icon={<ArrowLeftIcon />} onClick={prevSlide} />
          <IconButton icon={<ArrowRightIcon />} onClick={nextSlide} ml={2} />
        </Flex>
      </Flex> */}
    </Flex>
  );
};

export default Testimony;
