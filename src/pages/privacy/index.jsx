import Layout from "@/components/layout";
import { HStack, Box, Text, Heading, UnorderedList, ListItem, Link, Image } from "@chakra-ui/react";
import LogoWhatsapp from "@/assets/images/logo_whatsapp.png";

const Privacy = () => {
  return (
    <Layout>
        <Box p={4} maxW="800px" mx="40">
            <Heading as="h1" size="xl" mb={4}>
                Kebijakan Privacy
            </Heading>
            <Text fontSize="lg" mb={4}>
                PT D&W Internasional ( <Text as={'span'} fontWeight={'bold'}>"kami"</Text> atau <Text as={'span'} fontWeight={'bold'}> "Skillbridge"</Text>) berkomitmen untuk melindungi dan menghormati privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda ketika Anda mengakses dan menggunakan situs web Skillbridge.
            </Text>
            <Text fontSize='lg' mb={4}>
                Anda diwajibkan untuk membaca Ketentuan Layanan dan Kebijakan Privasi dengan cermat sebelum mulai menggunakan atau mengakses situs web kami. Semua ketentuan dalam Kebijakan Privasi ini berlaku dan mengikat bagi pengguna situs web. Dengan mengunjungi, mendaftar, atau mengakses akun di situs web, Anda dianggap menerima dan menyetujui seluruh Ketentuan Layanan dan Kebijakan Privasi.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                1. Informasi yang Kami Kumpulkan
            </Text>
            <Box>
                <Text fontWeight={"bold"} fontSize="xl" mb={2}>
                    1.1 Informasi yang Anda Berikan
                </Text>
                <Text fontSize="lg" mb={1}>
                    Kami dapat mengumpulkan informasi yang Anda berikan secara langsung kepada kami, seperti saat Anda mendaftar untuk sebuah akun, berlangganan kursus, mengisi formulir, atau berkomunikasi dengan kami. Informasi ini mungkin termasuk:
                </Text>
                <UnorderedList spacing={1} fontSize="lg" mb={2}>
                <ListItem>
                    Nama lengkap
                </ListItem>
                <ListItem>
                    Alamat email
                </ListItem>
                <ListItem>
                    Nomor telepon
                </ListItem>
                <ListItem>
                    Informasi pembayaran
                </ListItem>
                <ListItem>
                    Informasi lainnya yang Anda pilih untuk berikan
                </ListItem>
                </UnorderedList>
            </Box>
            <Box>
                <Text fontWeight={"bold"} fontSize="xl" mb={2}>
                    1.2 Informasi yang Dikumpulkan Secara Otomatis
                </Text>
                <Text fontSize="lg" mb={1}>
                    Kami juga dapat mengumpulkan informasi tertentu secara otomatis ketika Anda mengunjungi situs kami, termasuk:
                </Text>
                <UnorderedList spacing={1} fontSize="lg" mb={2}>
                <ListItem>
                    Alamat IP
                </ListItem>
                <ListItem>
                    Jenis browser
                </ListItem>
                <ListItem>
                    Halaman yang Anda kunjungi
                </ListItem>
                <ListItem>
                    Waktu dan tanggal kunjungan
                </ListItem>
                <ListItem>
                    Aktivitas penelusuran lainnya
                </ListItem>
                </UnorderedList>
            </Box>
            <Text fontSize='lg' mb={4}>
                Informasi ini digunakan untuk memberikan statistik umum tentang penggunaan situs web atau aplikasi.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                2. Penggunaan Informasi
            </Text>
            <Text fontSize="lg" mb={2}>
                Kami menggunakan informasi yang kami kumpulkan untuk berbagai tujuan, termasuk:
            </Text>
            <UnorderedList spacing={3} fontSize="lg" mb={2}>
            <ListItem>
                Menyediakan dan mengelola layanan kami
            </ListItem>
            <ListItem>
                Memproses transaksi dan mengirimkan konfirmasi
            </ListItem>
            <ListItem>
                Mengelola akun Anda dan menyediakan layanan pelanggan
            </ListItem>
            <ListItem>
                Mengirimkan komunikasi pemasaran, jika Anda memilih untuk menerimanya
            </ListItem>
            <ListItem>
                Meningkatkan situs web dan layanan kami
            </ListItem>
            <ListItem>
                Mematuhi kewajiban hukum dan peraturan
            </ListItem>
            </UnorderedList>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                3. Berbagi Informasi
            </Text>
            <Text fontSize="lg" mb={2}>
                Kami tidak akan membagikan informasi pribadi Anda kepada pihak ketiga kecuali dalam situasi berikut:
            </Text>
            <UnorderedList spacing={3} fontSize="lg" mb={2}>
            <ListItem>
                Dengan persetujuan Anda
            </ListItem>
            <ListItem>
                Untuk mematuhi kewajiban hukum
            </ListItem>
            <ListItem>
                Dengan penyedia layanan yang bekerja atas nama kami
            </ListItem>
            <ListItem>
                Untuk melindungi hak, kepemilikan, atau keamanan Skillbridge, pengguna kami, atau publik
            </ListItem>
            </UnorderedList>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                4. Perlindungan dan Keamanan Informasi
            </Text>
            <Text fontSize="lg" mb={2}>
                Kami berkomitmen untuk melindungi kerahasiaan dan keamanan Data Pribadi Anda menggunakan langkah-langkah keamanan fisik, teknis, dan administratif sesuai standar industri. Kami tidak akan membagikan Data Pribadi Anda dengan pihak ketiga kecuali dinyatakan dalam Pemberitahuan Privasi ini atau jika diperlukan dalam situasi khusus, seperti ancaman fisik terhadap Anda atau orang lain, sesuai hukum yang berlaku. Namun, karena Internet bukanlah lingkungan yang sepenuhnya aman, kami tidak dapat menjamin keamanan absolut Data Pribadi Anda. Ada risiko bahwa pihak ketiga yang tidak berwenang dapat menghindari sistem keamanan kami atau mencegat transmisi informasi Anda melalui Internet. Anda bertanggung jawab untuk melindungi keamanan informasi login Anda.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                5. Hak-Hak Anda
            </Text>
            <Text fontSize="lg" mb={2}>
                Anda memiliki hak untuk:
            </Text>
            <UnorderedList spacing={3} fontSize="lg" mb={2}>
            <ListItem>
                Mengakses informasi pribadi yang kami miliki tentang Anda
            </ListItem>
            <ListItem>
                Memperbaiki informasi yang tidak akurat atau tidak lengkap
            </ListItem>
            <ListItem>
                Meminta penghapusan informasi pribadi Anda
            </ListItem>
            <ListItem>
                Menolak pemrosesan informasi pribadi Anda untuk tujuan tertentu
            </ListItem>
            <ListItem>
                Meminta pembatasan pemrosesan informasi pribadi Anda
            </ListItem>
            </UnorderedList>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                6. Perubahan Kebijakan Privasi 
            </Text>
            <Text fontSize="lg" mb={2}>
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan diposting di halaman ini dengan tanggal pembaruan yang terbaru. Kami mendorong Anda untuk meninjau Kebijakan Privasi ini secara berkala untuk tetap mendapatkan informasi tentang bagaimana kami melindungi informasi pribadi Anda.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                7. Hubungi Kami 
            </Text>
            <Text fontSize="lg" mb={2}>
            Jika Anda memiliki pertanyaan, permintaan informasi, atau keluhan mengenai Kebijakan Privasi ini, atau jika Anda ingin mendapatkan informasi untuk kerjasama atau mengalami kendala, silakan hubungi kami di:
            </Text>
            <HStack spacing={2}>
                <Text fontSize="lg">WhatsApp :</Text>
                <Link href="https://wa.me/6282295345875">
                    <HStack>
                        <Text>+62 822-9534-5875</Text>
                        <Image
                            src={LogoWhatsapp}
                            alt="Logo Whatsapp"
                            objectFit="cover"
                            boxSize={"25px"}
                        />
                    </HStack>
                </Link>
            </HStack>
        </Box>
    </Layout>
  );
};

export default Privacy;
