// components/profile/ProfileSidebar.jsx
import React from 'react';
import { Box, VStack, Button, Text, Heading, Divider } from '@chakra-ui/react';
import { FaUser, FaChartLine } from 'react-icons/fa'; // Contoh ikon

const ProfileSidebar = ({ activeSection, onSectionChange }) => {
  return (
    <Box
      width={{ base: 'full', md: '250px' }} // Lebar penuh di mobile, 250px di desktop
      minH="calc(100vh - 120px)" // Tinggi minimal (sesuaikan dengan tinggi header & footer)
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="md"
      mr={{ base: 0, md: 6 }} // Margin kanan di desktop
      mb={{ base: 6, md: 0 }} // Margin bawah di mobile
    >
      <Heading as="h3" size="md" mb={6} color="gray.700">
        Profil Saya
      </Heading>

      <VStack align="stretch" spacing={4}>
        {/* My Profile Section */}
        <Box>
          <Button
            leftIcon={<FaUser />}
            variant="ghost"
            justifyContent="flex-start"
            width="full"
            colorScheme={activeSection === 'profile' ? 'blue' : 'gray'}
            onClick={() => onSectionChange('profile')}
            p={3}
            _hover={{ bg: 'blue.50', color: 'blue.700' }}
          >
            My Profile
          </Button>
          {activeSection === 'profile' && (
            <Button
              size="sm"
              colorScheme="blue"
              variant="outline"
              mt={2}
              ml={8} // Indentasi tombol edit
              width="calc(100% - 64px)" // Sesuaikan lebar tombol edit
              onClick={() => alert('Tombol Edit Profile ditekan!')} // Placeholder action
            >
              Edit Profile
            </Button>
          )}
        </Box>

        <Divider /> {/* Pemisah antar bagian */}

        {/* My Status Section */}
        <Box>
          <Button
            leftIcon={<FaChartLine />}
            variant="ghost"
            justifyContent="flex-start"
            width="full"
            colorScheme={activeSection === 'status' ? 'blue' : 'gray'}
            onClick={() => onSectionChange('status')}
            p={3}
            _hover={{ bg: 'blue.50', color: 'blue.700' }}
          >
            My Status
          </Button>
          {activeSection === 'status' && (
            <Button
              size="sm"
              colorScheme="teal" // Warna berbeda untuk status
              variant="outline"
              mt={2}
              ml={8}
              width="calc(100% - 64px)"
              onClick={() => alert('Tombol My Status ditekan!')} // Placeholder action
            >
              Lihat Status
            </Button>
          )}
        </Box>

        {/* Anda bisa menambahkan item navigasi lain di sini */}
        {/* <Divider />
        <Button leftIcon={<FaBook />} variant="ghost" justifyContent="flex-start" width="full">
          My Courses
        </Button> */}

      </VStack>
    </Box>
  );
};

export default ProfileSidebar;