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
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'; // Untuk ikon show/hide password
import AuthContext from '@/routes/authcontext'; // Pastikan path ini benar
import config from '@/config'; // Import config untuk base URL API

const ChangePasswordContent = ({ onPasswordChangeSuccess }) => {
  const { user, authTokens } = useContext(AuthContext); // Ambil user dan authTokens dari context
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verifNewPassword, setVerifNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showVerifNewPassword, setShowVerifNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const baseUrl = config.apiBaseUrl;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user || !user.email) {
      toast({
        title: 'Kesalahan',
        description: 'Data pengguna tidak tersedia. Mohon login ulang.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    if (newPassword !== verifNewPassword) {
      toast({
        title: 'Kesalahan Validasi',
        description: 'Kata sandi baru dan verifikasi kata sandi baru tidak cocok.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    if (oldPassword === newPassword) {
        toast({
            title: 'Kesalahan Validasi',
            description: 'Kata sandi baru tidak boleh sama dengan kata sandi lama.',
            status: 'warning',
            duration: 5000,
            isClosable: true,
        });
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch(`${baseUrl}/change_user_password`, { // Sesuaikan URL API Anda
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email, // Kirim email pengguna untuk identifikasi di backend
          old_password: oldPassword,
          new_password: newPassword,
          verif_new_password: verifNewPassword, // Backend Anda mungkin tidak memerlukannya, tapi aman untuk dikirim
        }),
      });

      const data = await response.json();

      if (response.ok) { // Jika status 200 OK
        toast({
          title: 'Kata Sandi Berhasil Diganti',
          description: data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // Reset form setelah berhasil
        setOldPassword('');
        setNewPassword('');
        setVerifNewPassword('');
        // Kembali ke tampilan detail profil setelah berhasil
        if (onPasswordChangeSuccess) {
          onPasswordChangeSuccess('profile'); 
        }
      } else { // Jika status bukan 200 OK (misal 400, 404, 500)
        toast({
          title: 'Gagal Mengganti Kata Sandi',
          description: data.message || 'Terjadi kesalahan saat mengganti kata sandi.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) { // Menangani error jaringan atau error tak terduga lainnya
      console.error('Kesalahan jaringan saat mengganti kata sandi:', error);
      toast({
        title: 'Kesalahan Jaringan',
        description: 'Tidak dapat terhubung ke server. Mohon coba lagi.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Pastikan loading state selalu mati
    }
  };

  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="md" width="full">
      <Heading as="h2" size="lg" mb={4} color="blue.700">
        Ganti Kata Sandi
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          {/* Bidang Kata Sandi Lama */}
          <FormControl id="old-password" isRequired>
            <FormLabel>Kata Sandi Lama</FormLabel>
            <InputGroup>
              <Input
                type={showOldPassword ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Masukkan kata sandi lama Anda"
              />
              <InputRightElement>
                <IconButton
                  aria-label={showOldPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  icon={showOldPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  variant="ghost"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {/* Bidang Kata Sandi Baru */}
          <FormControl id="new-password" isRequired>
            <FormLabel>Kata Sandi Baru</FormLabel>
            <InputGroup>
              <Input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Masukkan kata sandi baru"
              />
              <InputRightElement>
                <IconButton
                  aria-label={showNewPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  icon={showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  variant="ghost"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {/* Bidang Verifikasi Kata Sandi Baru */}
          <FormControl id="verif-new-password" isRequired>
            <FormLabel>Verifikasi Kata Sandi Baru</FormLabel>
            <InputGroup>
              <Input
                type={showVerifNewPassword ? 'text' : 'password'}
                value={verifNewPassword}
                onChange={(e) => setVerifNewPassword(e.target.value)}
                placeholder="Ulangi kata sandi baru Anda"
              />
              <InputRightElement>
                <IconButton
                  aria-label={showVerifNewPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  icon={showVerifNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowVerifNewPassword(!showVerifNewPassword)}
                  variant="ghost"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button type="submit" colorScheme="blue" isLoading={isLoading} loadingText="Mengganti...">
            Ganti Kata Sandi
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ChangePasswordContent;