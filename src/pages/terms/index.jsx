import Layout from "@/components/layout";
import { HStack, Box, Text, Heading, UnorderedList, ListItem, Link, Image } from "@chakra-ui/react";
import LogoWhatsapp from "@/assets/images/logo_whatsapp.png";

const Terms = () => {
  return (
    <Layout>
        <Box p={4} maxW="800px" mx="auto">
            <Heading as="h1" size="xl" mb={4}>
                Terms and Conditions
            </Heading>
            <Text fontSize="lg" mb={4}>
                Skillbridge is an online course platform designed to help develop professional skills directly from experts. Skillbridge is managed by PT D&W International.
            </Text>
            <Text fontSize="lg" mb={4}>
                These Terms of Use govern your access to and use of the Skillbridge website, content, and features. Please read these Terms carefully, and contact us if you have any questions, requests for information, or complaints. By accessing and using the Skillbridge website, you agree to be bound by and comply with all applicable rules on this site.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                1. Services Offered
            </Text>
            <Text fontSize="lg" mb={4}>
            Skillbridge provides online courses designed to develop professional skills in various fields. We reserve the right to modify, update, or discontinue our services at any time without prior notice.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                2. User Accounts
            </Text>
            <Box>
                <Text fontWeight={"bold"} fontSize="xl" mb={2}>
                    2.1 Registration
                </Text>
                <Text fontSize="lg" mb={4}>
                    To access courses, you must register and create an account on Skillbridge. You agree to provide accurate, up-to-date, and complete information during the registration process.
                </Text>
            </Box>
            <Box>
                <Text fontWeight={"bold"} fontSize="xl" mb={2}>
                    2.2 Account Security
                </Text>
                <Text fontSize="lg" mb={4}>
                    You are responsible for maintaining the confidentiality of your account information, including your password. You agree to notify us immediately of any unauthorized use of your account.
                </Text>
            </Box>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                3. Use of Content
            </Text>
            <Box>
                <Text fontWeight={"bold"} fontSize="xl" mb={2}>
                    3.1 Copyright
                </Text>
                <Text fontSize="lg" mb={4}>
                    All content available on Skillbridge, including but not limited to text, graphics, logos, and videos, is protected by copyright and other intellectual property rights. You may not copy, distribute, or use our content without written permission from us.
                </Text>
            </Box>
            <Box>
                <Text fontWeight={"bold"} fontSize="xl" mb={2}>
                    3.2 User License
                </Text>
                <Text fontSize="lg" mb={4}>
                    We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use our course content for personal and non-commercial purposes.
                </Text>
            </Box>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                4. Payments and Subscriptions
            </Text>
            <Box>
                <Text fontWeight={"bold"} fontSize="xl" mb={2}>
                    4.1 Pricing and Payment
                </Text>
                <Text fontSize="lg" mb={4}>
                    Course prices are listed on the website and are subject to change at any time. Payments are made through the methods available on our website.
                </Text>
            </Box>
            <Box>
                <Text fontWeight={"bold"} fontSize="xl" mb={2}>
                    4.2 Refund Policy
                </Text>
                <Text fontSize="lg" mb={4}>
                    Refunds are only applicable in the event of technical errors entirely under Skillbridge’s control that disrupt service. Technical errors eligible for refunds include, but are not limited to, server issues, system disruptions, or similar technical issues caused by Skillbridge. Refunds are not available for issues or errors caused by user actions or omissions, such as selecting an unsuitable product, errors in personal data input, or entering an incorrect email address.
                </Text>
                <Text fontSize="lg" mb={4}>
                    If you experience a technical error, you may contact our customer service via WhatsApp to initiate the refund process.
                </Text>
                <Text fontSize="lg" mb={4}>
                    Subscription fees, transaction fees, and other charges paid are non-refundable, non-cancelable, non-exchangeable, and non-transferable to other parties.
                </Text>
            </Box>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                5. User Code of Conduct
            </Text>
            <Text fontSize="lg" mb={2}>
                You agree not to use the platform for the following purposes:
            </Text>
            <UnorderedList spacing={3} fontSize="lg" mb={2}>
            <ListItem>
                Uploading, posting, or transmitting content that is unlawful, offensive, or infringes upon the intellectual property rights of others.
            </ListItem>
            <ListItem>
                Downloading, storing, copying, sharing, reposting, or distributing any content from the website in any way or through any medium, whether for commercial purposes or not.
            </ListItem>
            <ListItem>
                Using Skillbridge in any condition or manner that may damage, disable, overburden, or interfere with Skillbridge servers or networks. You are also prohibited from unauthorized access to services, user accounts, computer systems, or networks through hacking, password mining, or other unauthorized methods
            </ListItem>
            </UnorderedList>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                6. Limitation of Liability
            </Text>
            <Text fontSize="lg" mb={4}>
                We are not liable for any losses or damages arising from your use of our website or your inability to access it. We also do not guarantee that our site will be error-free or uninterrupted.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                7. Changes to Terms and Conditions
            </Text>
            <Text fontSize="lg" mb={4}>
                We reserve the right to amend these terms and conditions at any time. Changes will take effect immediately upon posting on the website. Your continued use of the website after such changes constitutes your acceptance of the updated terms and conditions.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                8. Governing Law
            </Text>
            <Text fontSize="lg" mb={4}>
                These terms and conditions are governed by and construed in accordance with the applicable laws of Indonesia. Any disputes arising from or related to these terms and conditions will be resolved in a competent court in Jakarta, Indonesia.
            </Text>
            <Text fontWeight={"bold"} fontSize="2xl" mb={2}>
                9. Contact Us
            </Text>
            <Text fontSize="lg" mb={2}>
                If you have any questions regarding these Terms of Service, you can contact us via:
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
