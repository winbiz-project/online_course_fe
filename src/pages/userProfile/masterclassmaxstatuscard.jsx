// src/pages/userProfile/MasterclassMaxStatusCard.jsx
import React from 'react';
import { Box, Heading, Text, VStack, Icon, Flex, HStack } from '@chakra-ui/react';
import { FaCheckCircle, FaStar, FaCrown } from 'react-icons/fa'; // Contoh ikon

const MasterclassMaxStatusCard = () => {
  const masterclassBenefitsSummary = [
    "Akses Tak Terbatas ke SEMUA Course Premium",
    "Bimbingan Mentor Eksklusif",
    "Akses ke Kelas Eksklusif",
    "Sertifikasi Eksklusif Tingkat Lanjut",
    "Akses ke Grup Belajar Eksklusif ",
    "Prioritas Dukungan Teknis",
    "Promo Diskon Event Khusus",
  ];

  return (
    <Box
      p={6}
      borderRadius="xl"
      boxShadow="xl"
      textAlign="center"
      bgGradient="linear(to-br, #FFD700 0%, #DAA520 50%, #B8860B 100%)" // Gradien warna hijau untuk status max
      color="white"
      width={{ base: '90%', sm: '80%', md: '500px' }} // Lebar yang lebih besar
      minH="300px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      overflow="hidden"
      position="relative"
    >
      {/* Ilustrasi Mahkota Besar di Latar Belakang */}
      <Icon
        as={FaCrown}
        boxSize={{ base: '120px', md: '150px' }}
        color="whiteAlpha.400"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%) rotate(-15deg)"
        zIndex="0"
      />

      <VStack spacing={4} align="stretch" zIndex="1">
        <Heading as="h3" size="xl" textTransform="uppercase">
          Selamat!
        </Heading>
        <Text fontSize="2xl" fontWeight="bold">
          Anda adalah Masterclass!
        </Text>
        <Text fontSize="md" color="whiteAlpha.800">
          Anda telah mencapai puncak pembelajaran di Skillbridge. Nikmati semua keistimewaan yang Anda miliki!
        </Text>
        
        <VStack align="flex-start" spacing={1} mt={4} textAlign="left">
          {masterclassBenefitsSummary.map((benefit, index) => (
            <HStack key={index} align="flex-start">
              <Icon as={FaCheckCircle} color="yellow.200" boxSize={4} mt={1} />
              <Text fontSize="sm" color="whiteAlpha.900">{benefit}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default MasterclassMaxStatusCard;