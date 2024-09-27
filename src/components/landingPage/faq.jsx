import { Flex, Text, Accordion,Link } from "@chakra-ui/react";
import FaqItem from "./faqItem";

const Faq = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      p={4}
      bgColor="white"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={10}>
        Pertanyaan yang Sering Diajukan
      </Text>
      <Accordion defaultIndex={[0]} allowMultiple w={{ base: "100%", md: "78%" }}>
      <FaqItem 
          question="Apa itu Skillbridge?"
          answer={
            <>
              SkillBridge merupakan platform kursus online yang menawarkan berbagai pelatihan keterampilan dalam berbagai bidang seperti <Text as="i">export business</Text>, <Text as="i">work in Japan</Text>, <Text as="i">study abroad</Text>, <Text as="i">marketing</Text>, <Text as="i">finance & accounting</Text>, <Text as="i">office productivity</Text>, <Text as="i">personal development</Text> dan banyak lagi. Kami bertujuan untuk membantu individu meningkatkan keterampilan mereka melalui konten berkualitas tinggi dan instruktur ahli.
            </>
          }
        />
        <FaqItem 
          question="Metode pembayaran apa saja yang digunakan pada Skillbridge?"
          answer="Pembayaran dapat dilakukan melalui berbagai metode, termasuk e-wallet, QRIS, transfer bank, serta pembayaran di swalayan terdekat."
        />
        <FaqItem 
          question="Ke mana saya dapat menghubungi untuk informasi kerjasama atau jika mengalami kendala?"
          answer={
            <>
              Anda dapat menghubungi Skillbridge melalui WhatsApp{" "}
              <Link href="https://wa.me/62811201218" isExternal color="#1155CC">
                wa.me/62811201218
              </Link>{" "} 
              atau Anda bisa email ke{" "}
              <Link href="mailto:mei.annisa@skillbridge.id" color="#1155CC">
                mei.annisa@skillbridge.id
              </Link>.
            </>
          }
        />
        <FaqItem 
          question="Apakah saya mendapatkan sertifikat setelah menyelesaikan kursus?"
          answer="Ya, Anda akan mendapatkan sertifikat setelah menyelesaikan semua materi kursus dan lulus dari tes yang disediakan."
        />
        <FaqItem
          question="Berapa lama saya bisa mengakses kursus setelah membelinya?"
          answer="Anda bisa mengakses kursus yang sudah dibeli tanpa batas waktu (lifetime access) dan dapat kembali kapan saja untuk menonton ulang materi kursus."
        />
      </Accordion>
    </Flex>
  );
};

export default Faq;
