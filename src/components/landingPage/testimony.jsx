import { Flex, Text, SimpleGrid } from "@chakra-ui/react";
import CardTestimony from "../card/testimony";
import unsplash from "@/assets/images/unsplash.png"
import LogoBCA from "@/assets/images/logo_bca.png";
import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import config from "@/config";
import SwiperCore from "swiper";

SwiperCore.use([Navigation, Pagination]);

const Testimony = () => {
  
  const [reviews, setReviews] = useState([]);
  const baseUrl = config.apiBaseUrl;

  const fetchPublishedReviews = async () => {
    try {
      const response = await fetch(`${baseUrl}/course/get_all_published_review`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReviews(data);
      
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchPublishedReviews();
  }, []);

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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      ) : reviews.length > 2 && reviews.length <= 4 && window.innerWidth > 600 ? (
        renderGrid(2)
      ) : reviews.length > 2 && reviews.length <= 4 && window.innerWidth > 950 ? (
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
