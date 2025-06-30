import React, { useState, useContext } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  VStack,
} from '@chakra-ui/react';
import AuthContext from '@/routes/authcontext';
import config from '@/config';

const EditProfileContent = ({ onEditSuccess }) => {
  const { user, updateProfile } = useContext(AuthContext); 
  const [name, setName] = useState(user ? user.name : '');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const baseUrl = config.apiBaseUrl;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user || !user.email) {
      toast({
        title: 'Error',
        description: 'User data not available. Please log in again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/update_user_profile`, { // Pastikan URL ini sesuai dengan Django Anda
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          name: name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Profile updated.',
          description: data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        
        updateProfile({ name: name }); 

        if (onEditSuccess) {
          onEditSuccess('profile'); 
        }

      } else {
        toast({
          title: 'Update failed.',
          description: data.message || 'An error occurred during update.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Network error.',
        description: 'Could not connect to the server.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="md" width="full">
      <Heading as="h2" size="lg" mb={4} color="blue.700">
        Edit Profil
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="name">
            <FormLabel>Nama Lengkap</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap baru"
              required
            />
          </FormControl>
          <FormControl id="email" isDisabled>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={user ? user.email : ''} />
          </FormControl>
          <Button type="submit" colorScheme="blue" isLoading={isLoading} loadingText="Updating...">
            Simpan Perubahan
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EditProfileContent;