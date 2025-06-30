// src/pages/userProfile/myprofile.jsx (nama file MyProfilePage Anda)
import React, { useState, useEffect, useContext } from "react";
import { Box, Flex, Container, Text, Heading } from '@chakra-ui/react';
import ProfileSidebar from './profilesidebar'; 
import Layout from '@/components/layout';
import AuthContext from '@/routes/authcontext';

// Import komponen konten yang baru dibuat
import ViewProfileContent from './viewprofilecontent';
import EditProfileContent from "./editprofilecontent";
import MyStatusContent from './mystatuscontent'; 
import ChangePasswordContent from "./changepasswordcontent";

const MyProfilePage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <Layout>
        <Container maxW="container.xl" py={10}>
          <Text>Memuat profil...</Text>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={10}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'center', md: 'stretch' }}
        >
          {/* Sidebar Kiri */}
          <ProfileSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

          {/* Area Konten Utama */}
          <Box flex="1" width="full">
            {activeSection === 'profile' && <ViewProfileContent />}
            {activeSection === 'edit-profile' && <EditProfileContent onEditSuccess={setActiveSection} />}
            {activeSection === 'status' && <MyStatusContent />}
            {activeSection === 'change-password' && <ChangePasswordContent onPasswordChangeSuccess={setActiveSection} />} {/* <--- Tambahkan ini */}
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default MyProfilePage;