import Layout from "@/components/layout";
import { HStack, Box, Text, Heading, UnorderedList, ListItem, Link, Image } from "@chakra-ui/react";
import LogoWhatsapp from "@/assets/images/logo_whatsapp.png";

const Terms = () => {
  return (
    <Layout>
        <Box p={4} maxW="800px" mx="40">
            <Heading as="h1" size="xl" mb={4}>
                Syarat dan Ketentuan
            </Heading>
            <Text fontSize="lg" mb={4}>
                Skillbridge merupakan sebuah platform kursus online yang tepat untuk membantu mengembangkan keahlian profesional langsung dari ahlinya. Skillbridge dikelola oleh PT D&W Internasional.
            </Text>
            <Text fontSize="lg" mb={4}>
                Ketentuan Penggunaan ini mengatur penggunaan Anda atas situs web, konten, serta fitur pada Skillbridge. Harap baca Ketentuan ini dengan cermat, dan hubungi kami jika Anda memiliki pertanyaan, permintaan informasi, atau keluhan. Dengan mengakses dan menggunakan situs Skillbridge, berarti Anda telah memahami dan menyetujui untuk terikat dan tunduk dengan semua peraturan yang berlaku di situs ini.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                1. Layanan yang Ditawarkan
            </Text>
            <Text fontSize="lg" mb={4}>
                Skillbridge menyediakan kursus online yang dirancang untuk mengembangkan keahlian profesional dalam berbagai bidang. Kami berhak untuk mengubah, memperbarui, atau menghentikan layanan kami kapan saja tanpa pemberitahuan terlebih dahulu.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                2. Akun Pengguna
            </Text>
            <Box>
                <Text fontWeight={"bold"} fontSize="xl" mb={2}>
                    2.1 Pendaftaran
                </Text>
                <Text fontSize="lg" mb={4}>
                    Untuk mengakses kursus, Anda harus mendaftar dan membuat akun di Skillbridge. Anda setuju untuk memberikan informasi yang akurat, terbaru, dan lengkap selama proses pendaftaran.
                </Text>
            </Box>
            <Box>
                <Text fontWeight={"bold"} fontSize="xl" mb={2}>
                    2.2 Keamanan Akun
                </Text>
                <Text fontSize="lg" mb={4}>
                    Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun Anda, termasuk kata sandi. Anda setuju untuk segera memberitahu kami tentang setiap penggunaan tidak sah atas akun Anda.
                </Text>
            </Box>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                3. Pengunaan Konten
            </Text>
            <Box>
                <Text fontWeight={"bold"} fontSize="xl" mb={2}>
                    3.1 Hak Cipta
                </Text>
                <Text fontSize="lg" mb={4}>
                    Semua konten yang tersedia di Skillbridge, termasuk tetapi tidak terbatas pada teks, grafik, logo, dan video, dilindungi oleh hak cipta dan hak kekayaan intelektual lainnya. Anda tidak diperbolehkan untuk menyalin, mendistribusikan, atau menggunakan konten kami tanpa izin tertulis dari kami.
                </Text>
            </Box>
            <Box>
                <Text fontWeight={"bold"} fontSize="xl" mb={2}>
                    3.2 Lisensi Pengguna
                </Text>
                <Text fontSize="lg" mb={4}>
                    Kami memberikan Anda lisensi terbatas, tidak eksklusif, tidak dapat dialihkan, dan dapat dicabut untuk mengakses dan menggunakan konten kursus kami untuk penggunaan pribadi dan non-komersial.
                </Text>
            </Box>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                4. Pembayaran dan Langganan
            </Text>
            <Box>
                <Text fontWeight={"bold"} fontSize="xl" mb={2}>
                    4.1 Harga dan Pembayaran
                </Text>
                <Text fontSize="lg" mb={4}>
                    Harga untuk kursus kami tercantum di situs web dan dapat berubah sewaktu-waktu. Pembayaran dilakukan melalui metode yang tersedia di situs web kami.
                </Text>
            </Box>
            <Box>
                <Text fontWeight={"bold"} fontSize="xl" mb={2}>
                    4.2 Kebijakan Pengembalian Dana
                </Text>
                <Text fontSize="lg" mb={4}>
                    Pengembalian dana hanya berlaku jika terjadi kesalahan teknis yang sepenuhnya berada di bawah kendali Skillbridge dan menyebabkan gangguan layanan. Kesalahan teknis yang memenuhi syarat untuk pengembalian dana termasuk, namun tidak terbatas pada, masalah server, gangguan sistem, atau gangguan teknis serupa yang disebabkan oleh Skillbridge. Pengembalian dana tidak berlaku jika masalah atau kesalahan terjadi akibat tindakan atau kelalaian pengguna, seperti memilih produk yang tidak sesuai, kesalahan saat mengisi data pribadi, atau memasukkan alamat email yang tidak benar.
                </Text>
                <Text fontSize="lg" mb={4}>
                    Jika Anda mengalami kesalahan teknis, Anda dapat menghubungi customer service kami melalui WhatsApp untuk memulai proses pengembalian dana.
                </Text>
                <Text fontSize="lg" mb={4}>
                    Biaya berlangganan, biaya transaksi, dan biaya lainnya yang sudah dibayarkan tidak dapat ditukar, dibatalkan, dikembalikan, diganti, atau ditransfer ke pihak lain.
                </Text>
            </Box>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                5. Kode Etik Pengguna
            </Text>
            <Text fontSize="lg" mb={2}>
                Anda setuju untuk tidak menggunakan platform ini untuk melakukan hal-hal berikut:
            </Text>
            <UnorderedList spacing={3} fontSize="lg" mb={2}>
            <ListItem>
                Mengunggah, memposting, atau mengirimkan konten yang melanggar hukum, menyinggung, atau melanggar hak kekayaan intelektual orang lain.
            </ListItem>
            <ListItem>
                Mengunduh, menyimpan, membuat salinan, membagikan, mengunggah ulang, maupun menyebarluaskan dengan cara apapun juga dan media apapun juga isi dari situs web baik tanpa atau dengan mendapatkan keuntungan komersial.
            </ListItem>
            <ListItem>
                Menggunakan Skillbridge dalam kondisi atau cara apapun yang dapat merusak, melumpuhkan, membebani, atau mengganggu server atau jaringan Skillbridge. Anda juga tidak diperbolehkan untuk mengakses layanan, akun pengguna, sistem komputer atau jaringan secara tidak sah, dengan cara hacking, password mining, atau cara tidak sah lainnya.
            </ListItem>
            </UnorderedList>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                6. Pembatasan Tanggung Jawab
            </Text>
            <Text fontSize="lg" mb={4}>
                Kami tidak bertanggung jawab atas kerugian atau kerusakan yang mungkin timbul dari penggunaan situs kami atau ketidakmampuan untuk mengakses situs kami. Kami juga tidak menjamin bahwa situs kami akan bebas dari kesalahan atau gangguan.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                7. Perubahan Syarat dan Ketentuan
            </Text>
            <Text fontSize="lg" mb={4}>
                Kami berhak untuk mengubah syarat dan ketentuan ini kapan saja. Perubahan akan diberlakukan segera setelah diposting di situs web. Penggunaan berkelanjutan Anda atas situs setelah perubahan menandakan persetujuan Anda terhadap syarat dan ketentuan yang diperbarui.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                8. Hukum yang Berlaku
            </Text>
            <Text fontSize="lg" mb={4}>
                Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum yang berlaku di Indonesia. Setiap sengketa yang timbul dari atau terkait dengan syarat dan ketentuan ini akan diselesaikan di pengadilan yang berwenang di Jakarta, Indonesia.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                9. Hubungi Kami
            </Text>
            <Text fontSize="lg" mb={2}>
                Jika Anda memiliki pertanyaan mengenai Ketentuan Layanan ini, Anda dapat menghubungi Kami melalui:
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

export default Terms;
