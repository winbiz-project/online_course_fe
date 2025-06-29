// components/Testimony.jsx
import { Flex, Text, Box, IconButton } from "@chakra-ui/react"; // Hapus SimpleGrid jika tidak lagi digunakan
import CardTestimony from "../card/testimony"; // Pastikan path ini benar
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import React, { useState, useEffect } from 'react';
import SwiperCore from "swiper";
import config from "@/config"; // Import config

SwiperCore.use([Navigation, Pagination]);

const Testimony = () => {
  const [reviews, setReviews] = useState([]); // State akan diisi dari API
  const baseUrl = config.apiBaseUrl; // Mengambil baseUrl dari config

  // Fungsi untuk mengambil review dari API
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

  // Panggil fungsi fetchPublishedReviews saat komponen dimuat
  useEffect(() => {
    fetchPublishedReviews();
  }, []); // Array kosong berarti hanya dijalankan sekali setelah render pertama

  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); 

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (reviews.length === 0) {
    return null; // Tampilkan loading spinner atau pesan jika tidak ada review
  }

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

      <Box w='100%' mt='5' p={4} display='flex' flexDirection='row' alignItems="center">
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={() => swiperInstance?.slidePrev()}
          bg="white"
          borderRadius="full"
          boxShadow="lg"
          _hover={{ bg: "gray.200" }}
          isDisabled={isBeginning}
          mr={2}
        />
        <Swiper
          spaceBetween={30} // Jarak antar slide
          slidesPerView={1} // Default untuk mobile
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          
          breakpoints={{
            640: { // Di layar > 640px
              slidesPerView: 1, // Misalnya, tetap 1 card per view
            },
            768: { // Di layar > 768px
              slidesPerView: 2, // Tampilkan 2 card per view
            },
            1024: { // Di layar > 1024px
              slidesPerView: 4, // Tampilkan 4 card per view
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
          icon={<ChevronRightIcon />}
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
    </Flex>
  );
};

export default Testimony;