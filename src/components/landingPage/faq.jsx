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
        Frequently Asked Questions
      </Text>
      <Accordion defaultIndex={[0]} allowMultiple w={{ base: "100%", md: "78%" }}>
      <FaqItem 
          question="What is SkillBridge?"
          answer={
            <>
              “SkillBridge is an online course platform that offers a variety of skills training in areas such as <Text as="b">export business</Text>, <Text as="b">work in Japan</Text>, <Text as="b">study abroad</Text>, <Text as="b">marketing</Text>, <Text as="b">finance & accounting</Text>, <Text as="b">office productivity</Text>, <Text as="b">personal development</Text> and more. We aim to help individuals improve their skills through high-quality content and expert instructors.
            </>
          }
        />
        <FaqItem 
          question="What payment methods are used at Skillbridge?"
          answer="Payments can be made through various methods, including e-wallet, QRIS, bank transfer, as well as payment at the nearest convenience store."
        />
        <FaqItem 
          question="Where can I contact for cooperation information or if I experience problems?"
          answer={
            <>
              You can contact Skillbridge via WhatsApp{" "}
              <Link href="https://wa.me/62811201218" isExternal color="#1155CC">
                wa.me/62811201218
              </Link>{" "} 
                or you can email{" "}
              <Link href="mailto:mei.annisa@skillbridge.id" color="#1155CC">
                mei.annisa@skillbridge.id
              </Link>.
            </>
          }
        />
        <FaqItem 
          question="Do I get a certificate after completing the course?"
          answer="Yes, you will get a certificate after completing all course materials and passing the tests provided."
        />
        <FaqItem
          question="How long can I access the course after purchasing it?"
          answer="You can access the purchased course indefinitely (lifetime access) and can return at any time to re-watch the course material."
        />
      </Accordion>
    </Flex>
  );
};

export default Faq;
