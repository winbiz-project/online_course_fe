import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react';
import {
  FaCheckCircle,
} from 'react-icons/fa'; // Pastikan Anda menginstal react-icons

const UpgradePlanCard = ({
  planName,
  price,
  perks,
  bgColorGradient, // Array of two colors, e.g., ['#4A00E0', '#8E2DE2']
  buttonText,
  buttonColorScheme,
  buttonVariant = 'solid',
  onSubscribe, // Ini akan menjadi fungsi yang memicu window.open
  illustrationIcon, // Icon untuk ilustrasi di pojok kanan atas
  textColor = 'black', // Warna teks default
}) => {
  return (
    <Box
      p={6}
      borderRadius="xl" // Lebih melengkung seperti Discord Nitro
      boxShadow="xl"
      textAlign="center"
      bgGradient={`linear(to-br, ${bgColorGradient[0]}, ${bgColorGradient[1]})`}
      color={textColor}
      width={{ base: '90%', sm: '80%', md: '45%', lg: '300px' }} // Lebar responsif
      minH="450px" // Tinggi minimum kartu
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      overflow="hidden" // Untuk ilustrasi
      position="relative"
    >
      {/* Ilustrasi di pojok kanan atas */}
      {illustrationIcon && (
        <Icon
          as={illustrationIcon}
          boxSize={{ base: '80px', md: '100px' }}
          color="whiteAlpha.400"
          position="absolute"
          top="0"
          right="0"
          transform="translate(20px, -20px)" // Sedikit keluar dari kotak
          zIndex="0"
        />
      )}

      <VStack spacing={4} align="stretch" zIndex="1">
        <Heading as="h3" size="lg" textTransform="uppercase">
          {planName}
        </Heading>
        <Text fontSize="2xl" fontWeight="bold">
          {price}
        </Text>

        <VStack align="flex-start" spacing={2} my={4} textAlign="left">
          {perks.map((perk, index) => (
            <HStack key={index} align="flex-start">
              <Icon as={FaCheckCircle} color="green.100" boxSize={4} mt={1} />
              <Text fontSize="sm">{perk}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>

      <Button
        colorScheme={buttonColorScheme}
        variant={buttonVariant}
        size="lg"
        width="full"
        mt={4} // Margin top jika konten kurang
        onClick={onSubscribe} // <-- Ini akan memanggil fungsi window.open dari parent
        color={textColor}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default UpgradePlanCard;