// components/profile/ProfileSidebar.jsx
import React from 'react';
import { Box, VStack, Button, Text, Heading, Divider } from '@chakra-ui/react';
import { FaUser, FaChartLine, FaEdit, FaLock } from 'react-icons/fa'; // Import ikon baru

const ProfileSidebar = ({ activeSection, onSectionChange }) => {
  const isProfileSectionActive = activeSection === 'profile' ||
                                 activeSection === 'edit-profile' ||
                                 activeSection === 'change-password'; 

  return (
    <Box
      width={{ base: 'full', md: '250px' }}
      minH={{base: 'auto', md: 'calc(100vh - 120px)'}}
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="md"
      mr={{ base: 0, md: 6 }}
      mb={{ base: 6, md: 0 }}
    >
      <Heading as="h3" size="md" mb={6} color="gray.700">
        Profil Saya
      </Heading>

      <VStack align="stretch" spacing={4}>
        <Box>
          <Button
            leftIcon={<FaUser />}
            variant="ghost"
            justifyContent="flex-start"
            width="full"
            colorScheme={isProfileSectionActive ? 'blue' : 'gray'}
            onClick={() => onSectionChange('profile')}
            p={3}
            _hover={{ bg: 'blue.50', color: 'blue.700' }}
          >
            My Profile
          </Button>

          {isProfileSectionActive && (
            <>
              <Button
                size="sm"
                colorScheme="blue"
                variant={activeSection === 'edit-profile' ? 'solid' : 'outline'}
                mt={2}
                ml={8}
                width="calc(100% - 64px)"
                onClick={() => onSectionChange('edit-profile')}
                leftIcon={<FaEdit />}
              >
                Edit Profile
              </Button>

              <Button
                size="sm"
                colorScheme="red" 
                variant={activeSection === 'change-password' ? 'solid' : 'outline'}
                mt={2}
                ml={8}
                width="calc(100% - 64px)"
                onClick={() => onSectionChange('change-password')}
                leftIcon={<FaLock />}
              >
                Ganti Password
              </Button>
            </>
          )}
        </Box>

        <Divider />

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
        </Box>

      </VStack>
    </Box>
  );
};

export default ProfileSidebar;