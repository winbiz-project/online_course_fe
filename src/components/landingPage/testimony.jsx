import { Flex, Text, SimpleGrid } from "@chakra-ui/react";
import CardTestimony from "../card/testimony";
import unsplash from "@/assets/images/unsplash.png"
import LogoBCA from "@/assets/images/logo_bca.png";
import React, { useState } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import SwiperCore from "swiper";

SwiperCore.use([Navigation, Pagination]);

const Testimony = () => {
  
  const [reviews, setReviews] = useState([
    {
      review_id: 1,
      review_text:
        "This course was very insightful and inspirational! The materials I've learned here will definitely help me understand Python better.",
      review_rating: "4.0",
      review_published: true,
      review_user: "Alia",
      course_origin: "100 Days of Code: The Complete Python Pro Bootcamp"
    },
    {
      review_id: 2,
      review_text:
        "Good course! The content is well-structured and the examples are easy to follow.",
      review_rating: "5.0",
      review_published: true,
      review_user: "David",
      course_origin: "100 Days of Code: The Complete Python Pro Bootcamp"
    },
    {
      review_id: 3,
      review_text:
        "Decent course, but some sections could use more detail. Overall, it was helpful!",
      review_rating: "3.0",
      review_published: true,
      review_user: "Sophia",
      course_origin: "100 Days of Code: The Complete Python Pro Bootcamp"
    },
    {
      review_id: 4,
      review_text:
        "Amazing course! I learned a lot and feel confident about Python now.",
      review_rating: "5.0",
      review_published: true,
      review_user: "Liam",
      course_origin: "100 Days of Code: The Complete Python Pro Bootcamp"
    },
    {
      review_id: 5,
      review_text:
        "The course was okay, but I expected more practical examples.",
      review_rating: "3.0",
      review_published: true,
      review_user: "Emma",
      course_origin: "100 Days of Code: The Complete Python Pro Bootcamp"
    }
  ]);

  const renderGrid = (columns) => (
    <SimpleGrid
      columns={columns}
      spacing={6}
      mt={10}
      justifyItems="center"
      justifyContent="center"
    >
      {reviews.map((review, index) => (
        <CardTestimony key={index} review={review} />
      ))}
    </SimpleGrid>
  );

  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (reviews.length !==0 ){
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      px={4}
      py={10}
      bgColor="#9AC5F4"
    >
      <Text fontSize="xl" fontWeight="bold" color="#1450A3">
        TESTIMONY
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        User, Tutor, and Partner Stories
      </Text>

      {reviews.length === 1 ? (
        renderGrid(1)
      ): reviews.length === 2 && window.innerWidth > 640 ? (
        renderGrid(2)
      ) : reviews.length > 2 && reviews.length <= 4 && window.innerWidth > 768 ? (
        renderGrid(reviews.length)
      ) : (
        <Box w='100%'  mt='5' p={4} display='flex' flexDirection='row' alignItems="center">
          <IconButton
            icon={<ChevronLeftIcon />}
            onClick={() => swiperInstance?.slidePrev()} // Navigasi ke slide sebelumnya
            bg="white"
            borderRadius="full"
            boxShadow="lg"
            _hover={{ bg: "gray.200" }}
            isDisabled={isBeginning}
            mr={2}
          />
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            style={{ flex: 1 }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <CardTestimony review={review} />
              </SwiperSlide>
            ))}
          </Swiper>

          <IconButton
            icon={<ChevronRightIcon/>}
            onClick={() => swiperInstance?.slideNext()}
            bg="white"
            borderRadius="full"
            boxShadow="lg"
            _hover={{ bg: "gray.200" }}
            aria-label="Next Slide"
            isDisabled={isEnd}
            ml={2}
          />

        </Box>
      )}
    </Flex>
  );
};
}

export default Testimony;
