import Layout from "@/components/layout";
import { HStack, Box, Text, Heading, UnorderedList, ListItem, Link, Image } from "@chakra-ui/react";
import LogoWhatsapp from "@/assets/images/logo_whatsapp.png";

const Privacy = () => {
  return (
    <Layout>
        <Box p={4} maxW="800px" mx="auto">
            <Heading as="h1" size="xl" mb={4}>
                Privacy Policy
            </Heading>
            <Text fontSize="lg" mb={4}>
                Skillbridge is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you access and use the Skillbridge website.
            </Text>
            <Text fontSize='lg' mb={4}>
                You are required to carefully read the Terms of Service and Privacy Policy before using or accessing our website. All provisions in this Privacy Policy apply to and are binding on website users. By visiting, registering, or accessing an account on the website, you are considered to have accepted and agreed to all Terms of Service and the Privacy Policy.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                1. Information We Collect
            </Text>
            <Box>
                <Text fontWeight={"bold"} fontSize="xl" mb={2}>
                    1.1 Information You Provide
                </Text>
                <Text fontSize="lg" mb={1}>
                    We may collect information that you provide directly to us, such as when you register for an account, subscribe to courses, fill out forms, or communicate with us. This information may include:
                </Text>
                <UnorderedList spacing={1} fontSize="lg" mb={2}>
                <ListItem>
                    Full name
                </ListItem>
                <ListItem>
                    Email address
                </ListItem>
                <ListItem>
                    Phone number
                </ListItem>
                <ListItem>
                    Payment information
                </ListItem>
                <ListItem>
                    Other information you choose to provide
                </ListItem>
                </UnorderedList>
            </Box>
            <Box>
                <Text fontWeight={"bold"} fontSize="xl" mb={2}>
                    1.2 Information Collected Automatically
                </Text>
                <Text fontSize="lg" mb={1}>
                    We may also collect certain information automatically when you visit our site, including:
                </Text>
                <UnorderedList spacing={1} fontSize="lg" mb={2}>
                <ListItem>
                    IP address
                </ListItem>
                <ListItem>
                    Browser type
                </ListItem>
                <ListItem>
                    Pages you visit
                </ListItem>
                <ListItem>
                    Date and time of your visit
                </ListItem>
                <ListItem>
                    Other browsing activities
                </ListItem>
                </UnorderedList>
            </Box>
            <Text fontSize='lg' mb={4}>
                This information is used to provide general statistics about the use of the website or application.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                2. How We Use Your Information
            </Text>
            <Text fontSize="lg" mb={2}>
                We use the information we collect for various purposes, including:
            </Text>
            <UnorderedList spacing={3} fontSize="lg" mb={2}>
            <ListItem>
                Providing and managing our services
            </ListItem>
            <ListItem>
                Processing transactions and sending confirmations
            </ListItem>
            <ListItem>
                Managing your account and providing customer service
            </ListItem>
            <ListItem>
                Sending marketing communications, if you choose to receive them
            </ListItem>
            <ListItem>
                Improving our website and services
            </ListItem>
            <ListItem>
                Complying with legal and regulatory obligations
            </ListItem>
            </UnorderedList>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                3. Sharing Your Information
            </Text>
            <Text fontSize="lg" mb={2}>
                We will not share your personal information with third parties except in the following situations:
            </Text>
            <UnorderedList spacing={3} fontSize="lg" mb={2}>
            <ListItem>
                With your consent
            </ListItem>
            <ListItem>
                To comply with legal obligations
            </ListItem>
            <ListItem>
                With service providers working on our behalf
            </ListItem>
            <ListItem>
                To protect the rights, property, or safety of Skillbridge, our users, or the public
            </ListItem>
            </UnorderedList>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                4. Protection and Security of Information
            </Text>
            <Text fontSize="lg" mb={2}>
                We are committed to maintaining the confidentiality and security of your Personal Data using physical, technical, and administrative security measures in line with industry standards. We will not share your Personal Data with third parties unless stated in this Privacy Notice or required under special circumstances, such as physical threats to you or others, as permitted by applicable law. However, since the Internet is not a completely secure environment, we cannot guarantee the absolute security of your Personal Data. There is a risk that unauthorized third parties may circumvent our security systems or intercept your information during transmission over the Internet. You are responsible for safeguarding the security of your login information.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                5. Your Rights
            </Text>
            <Text fontSize="lg" mb={2}>
                You have the right to:
            </Text>
            <UnorderedList spacing={3} fontSize="lg" mb={2}>
            <ListItem>
                Access the personal information we hold about you
            </ListItem>
            <ListItem>
                Correct inaccurate or incomplete information
            </ListItem>
            <ListItem>
                Request the deletion of your personal information
            </ListItem>
            <ListItem>
                Object to the processing of your personal information for specific purposes
            </ListItem>
            <ListItem>
                Request restrictions on the processing of your personal information
            </ListItem>
            </UnorderedList>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                6. Updates to This Privacy Policy
            </Text>
            <Text fontSize="lg" mb={2}>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with the latest update date. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your personal information.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                7. Contact Us
            </Text>
            <Text fontSize="lg" mb={2}>
                If you have any questions, information requests, or complaints regarding this Privacy Policy, or if you want to inquire about collaborations or face any issues, please contact us via:
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
