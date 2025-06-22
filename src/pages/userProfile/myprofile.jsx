// pages/MyProfilePage.jsx
import React, { useState } from 'react';
import { Box, Flex, Container, Text, Heading } from '@chakra-ui/react';
import ProfileSidebar from './profilesidebar';
import Layout from '@/components/layout';

const MyProfilePage = () => {
  const [activeSection, setActiveSection] = useState('profile'); // State untuk section aktif

  // Konten placeholder untuk My Profile
  const MyProfileContent = () => (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="md" width="full">
      <Heading as="h2" size="lg" mb={4} color="blue.700">
        Detail Profil Saya
      </Heading>
      <Text fontSize="md" mb={2}>
        Nama Lengkap: user1
      </Text>
      <Text fontSize="md" mb={2}>
        Email: user1@gmail.com
      </Text>
      <Text fontSize="md" mb={2}>
        Status: Basic Plan
      </Text>
      {/* Tambahkan lebih banyak detail profil di sini */}
      <Text mt={4} color="gray.600">
        Testing deskripsi
      </Text>
    </Box>
  );

  // Konten placeholder untuk My Status
  const MyStatusContent = () => (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="md" width="full">
      <Heading as="h2" size="lg" mb={4} color="teal.700">
        Status Akun Saya
      </Heading>
      <Text fontSize="md" mb={2}>
        **Current Plan:** Basic Plan
      </Text>
      <Text fontSize="md" mb={2}>
        **Progress Kursus:** 50%
      </Text>
      {/* Tambahkan detail status lain, seperti statistik, riwayat progress, dll. */}
      <Text mt={4} color="gray.600">
        Ini adalah gambaran singkat tentang status akun dan progress belajar pengguna.
      </Text>
    </Box>
  );

  return (
    <Layout>

      <Container maxW="container.xl" py={10}>
        <Flex
          direction={{ base: 'column', md: 'row' }} // Stack vertikal di mobile, horizontal di desktop
          align={{ base: 'center', md: 'flex-start' }} // Pusatkan di mobile, align start di desktop
          >
          {/* Sidebar Kiri */}
          <ProfileSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

          {/* Area Konten Utama */}
          <Box flex="1" width="full"> {/* flex="1" agar mengambil sisa ruang */}
            {activeSection === 'profile' && <MyProfileContent />}
            {activeSection === 'status' && <MyStatusContent />}
            {/* Tambahkan conditional rendering untuk section lain di sini */}
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default MyProfilePage;