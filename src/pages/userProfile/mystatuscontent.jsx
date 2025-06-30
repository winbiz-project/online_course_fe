// src/pages/userProfile/MyStatusContent.jsx
import React, { useContext } from 'react';
import { Box, Text, Heading, Tag, VStack, HStack, Flex, Spacer } from '@chakra-ui/react';
import AuthContext from '@/routes/authcontext';
import UpgradePlanCard from './upgradeplancard';
import MasterclassMaxStatusCard from './masterclassmaxstatuscard';
import { FaGraduationCap, FaCrown } from 'react-icons/fa'; // Contoh ikon ilustrasi

const MyStatusContent = () => {
  const { user } = useContext(AuthContext);

  // Fungsi renderPlanBadge (tetap sama)
  const renderPlanBadge = (status) => {
    let text = "";
    let tagBg = "";
    let tagColor = "gray.700";
    let borderColor = "gray.300";

    if (status === "miniclass") {
      text = "MINICLASS";
      tagBg = "#E0E0E0";
      borderColor = "#B0B0B0";
      tagColor = "gray.800";
    } else if (status === "masterclass") {
      text = "MASTERCLASS";
      tagBg = "#FFEB3B";
      borderColor = "#FFD700";
      tagColor = "gray.800";
    } else {
      return null;
    }

    return (
      <Tag
        size="md"
        ml={2}
        px={2}
        py={0.5}
        borderRadius="sm"
        fontSize="0.8em"
        fontWeight="bold"
        textTransform="uppercase"
        bg={tagBg}
        color={tagColor}
        border="1px solid"
        borderColor={borderColor}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        whiteSpace="nowrap"
      >
        {text}
      </Tag>
    );
  };

  // Properti Border untuk Seluruh Kotak Status (tetap sama)
  let statusBoxBorderProps = {
    backgroundColor: "white",
    borderWidth: "1px",
    borderColor: "gray.200",
    boxShadow: "md",
    borderRadius: "lg",
  };

  if (user && user.status === "miniclass") {
    statusBoxBorderProps = {
      border: "2px solid transparent",
      bgImage: "linear-gradient(white, white), linear-gradient(135deg, #C0C0C0 0%, #AAA 50%, #888 100%)",
      bgOrigin: "border-box",
      bgClip: "padding-box, border-box",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
      borderRadius: "lg",
    };
  } else if (user && user.status === "masterclass") {
    statusBoxBorderProps = {
      border: "2px solid transparent",
      bgImage: "linear-gradient(white, white), linear-gradient(135deg, #FFD700 0%, #DAA520 50%, #B8860B 100%)",
      bgOrigin: "border-box",
      bgClip: "padding-box, border-box",
      boxShadow: "0px 4px 15px rgba(0,0,0,0.25)",
      borderRadius: "lg",
    };
  }

  const miniclassPerks = [
    "Akses ke beberapa Course Pilihan Premium",
    "Dukungan Komunitas Aktif",
    "Materi Tambahan Eksklusif (PDF, Template)",
    "Sertifikat Eksklusif Miniclass",
  ];

  const masterclassPerks = [
    "Akses Tak Terbatas ke SEMUA Course Premium",
    "Bimbingan Mentor Eksklusif",
    "Akses ke Kelas Eksklusif",
    "Sertifikasi Eksklusif Tingkat Lanjut",
    "Akses ke Grup Belajar Eksklusif ",
    "Prioritas Dukungan Teknis",
    "Promo Diskon Event Khusus",
  ];

  // Link WhatsApp untuk tombol Upgrade
  const whatsappLink = "https://wa.me/6282295345875";

  return (
    <Box width="full">
      {/* Kotak Status Akun Saya (yang sudah ada) */}
      <Box 
        p={6} 
        width="full"
        {...statusBoxBorderProps}
        mb={8} // Margin bawah untuk memisahkan dari kartu upgrade
      >
        <Heading as="h2" size="lg" mb={4} color="teal.700">
          Status Akun Saya
        </Heading>
        
        <Text fontSize="md" mb={2}>
          Current Plan: {" "}
          {user && user.status === 'basic' ? (
            <Text as="span">Basic Plan</Text>
          ) : user && (user.status === 'miniclass' || user.status === 'masterclass') ? (
            renderPlanBadge(user.status)
          ) : (
            <Text as="span">Memuat...</Text>
          )}
        </Text>

        <Text mt={4} color="gray.600">
          {user && user.status === 'masterclass' ? (
            <Text as="span">Selamat! Anda telah mencapai <Text as="span" fontWeight="bold">Status Masterclass</Text> yang paling bergengsi. Nikmati akses penuh ke semua materi eksklusif dan bimbingan premium. Anda saat ini sudah berada di puncak pembelajaran!</Text>
          ) : user && user.status === 'miniclass' ? (
            <Text as="span">Status Anda adalah <Text as="span" fontWeight="bold">Miniclass</Text>. Buka potensi penuh Anda dengan meningkatkan ke <Text as="span" fontWeight="bold">Masterclass</Text> dan dapatkan akses tak terbatas ke seluruh <Text as="span" fontStyle="italic">course</Text>, sertifikasi eksklusif, serta <Text as="span" fontStyle="italic">class eksklusif</Text> yang akan melesatkan karier Anda.</Text>
          ) : user && user.status === 'basic' ? (
            <Text as="span">Status Anda adalah <Text as="span" fontWeight="bold">Basic Plan</Text>. Tingkatkan pengalaman belajar Anda! Segera <Text as="span" fontWeight="bold">upgrade</Text> ke <Text as="span" fontWeight="bold">Miniclass</Text> untuk materi pilihan, atau langsung menuju <Text as="span" fontWeight="bold">Masterclass</Text> untuk akses ke semua <Text as="span" fontStyle="italic">kursus premium</Text> dan dukungan penuh dari mentor ahli. Raih kesuksesan lebih cepat!</Text>
          ) : (
            <Text as="span">Memuat informasi status Anda...</Text>
          )}
        </Text>
      </Box>

      {/* Bagian Penawaran Upgrade Plan atau Status Max */}
      <VStack spacing={8} align="center" mt={10}>
        {user && user.status === 'masterclass' ? (
          // Jika user adalah Masterclass, tampilkan kartu status tertinggi
          <MasterclassMaxStatusCard />
        ) : (
          // Jika Basic atau Miniclass, tampilkan heading dan kartu upgrade
          <>
            <Heading as="h2" size="xl" color="gray.700" textAlign="center">
              Tingkatkan Pengalaman Belajar Anda!
            </Heading>
            <Text fontSize="lg" color="gray.600" textAlign="center" maxW="600px">
              Pilih plan yang sesuai untuk membuka potensi penuh Anda dan melesatkan karier bersama Skillbridge.
            </Text>

            <Flex
              direction={{ base: 'column', md: 'row' }} // Kolom di mobile, baris di desktop
              justify="center"
              align="stretch" // Pastikan kartu memiliki tinggi yang sama
              wrap="wrap" // Memungkinkan wrapping jika layar terlalu sempit
              gap={6} // Jarak antar kartu
              width="full"
            >
              {user && user.status === 'basic' && (
                // Hanya tampilkan kartu Miniclass jika status user adalah 'basic'
                <UpgradePlanCard
                  planName="Miniclass"
                  perks={miniclassPerks}
                  bgColorGradient={['#6A0DAD', '#8A2BE2']} // Ungu
                  buttonText="Upgrade ke Miniclass"
                  buttonColorScheme="purple"
                  onSubscribe={() => window.open(whatsappLink, '_blank')} // Langsung ke WhatsApp
                  illustrationIcon={FaGraduationCap} // Icon untuk Miniclass
                />
              )}

              {/* Tampilkan kartu Masterclass jika Basic atau Miniclass */}
              {user && (user.status === 'basic' || user.status === 'miniclass') && (
                <UpgradePlanCard
                  planName="Masterclass"
                  perks={masterclassPerks}
                  bgColorGradient={['#E65239', '#FF4E50']} // Oranye/Merah
                  buttonText="Upgrade ke Masterclass"
                  buttonColorScheme="red"
                  onSubscribe={() => window.open(whatsappLink, '_blank')} // Langsung ke WhatsApp
                  illustrationIcon={FaCrown} // Icon untuk Masterclass
                />
              )}
            </Flex>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default MyStatusContent;