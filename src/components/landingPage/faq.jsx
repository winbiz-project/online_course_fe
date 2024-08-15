import { Box, Flex, Image, Text, Button, Accordion, AccordionButton, AccordionItem, AccordionIcon, AccordionPanel } from "@chakra-ui/react";
import FaqItem from "./faqItem";


const Faq = () => {
    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            p={"20"}
            pb={"5"}
            bgColor={'white'}
        >
{/* 
            <Flex
                direction="column"
                w={'100%'}
                justifyContent="center"
                alignItems="center"
                bgColor={'white'}
                mt={-10}
                borderRadius={"10px"}
            > */}
            <Text fontSize={'2xl'} fontWeight={'bold'} mb={10} mt={-10}>Pertanyaan yang Sering Diajukan</Text>
            <Accordion defaultIndex={[0]} allowMultiple w='78%'>
                <FaqItem 
                    question={"Apa itu Skillbridge?"}
                    answer={"SkillBridge merupakan platform kursus online yang menawarkan berbagai pelatihan keterampilan dalam berbagai bidang seperti ________, ______, _______, dan banyak lagi. Kami bertujuan untuk membantu individu meningkatkan keterampilan mereka melalui konten berkualitas tinggi dan instruktur ahli."}
                />

                <FaqItem 
                    question={"Metode pembayaran apa saja yang digunakan pada Skillbridge?"}
                    answer={"Pembayaran dapat dilakukan melalui berbagai metode, termasuk e-wallet, QRIS, transfer bank, serta pembayaran di swalayan terdekat."}
                />

                <FaqItem 
                    question={"Ke mana saya dapat menghubungi untuk informasi kerjasama atau jika mengalami kendala?"}
                    answer={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                />

                <FaqItem 
                    question={"Section 2 title"}
                    answer={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                />

                <FaqItem 
                    question={"Section 2 title"}
                    answer={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                />

        
            </Accordion>
            {/* </Flex> */}
            
        </Flex>
    )
}

export default Faq