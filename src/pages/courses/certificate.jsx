import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout";
import { Spinner, Box, Image, Text, Button, useToast } from "@chakra-ui/react";
import AuthContext from "@/routes/authcontext";
import config from "@/config";

const Certificate = () => {
    const baseUrl = config.apiBaseUrl;
    const { user } = useContext(AuthContext);
    const { uniqueIdCertificate } = useParams();
    const [certificateDetails, setCertificateDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const getCertificateURL = async () => {
        try {
            const response = await fetch(
                `${baseUrl}/certificate/get_course_certificate_by_uniqueid/${uniqueIdCertificate}`
            );
            const data = await response.json();
            setCertificateDetails(data.certificate_details);
            setLoading(false);
        } catch (error) {
            console.error(`Could not get certificate URL: ${error}`);
            setLoading(false);
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            toast({
                title: "Link copied!",
                description: "The certificate link has been copied to your clipboard.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        });
    };


    const handleDownload = async (uniqueId) => {
        try {
            const response = await fetch(certificateDetails.certificate_link);
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `Certificate_${certificateDetails.certificate_course_origin}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getCertificateURL();
    }, []);

    if (loading) {
        return (
            <Layout>
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Spinner size="xl" />
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            {certificateDetails ? (
                <Box textAlign="center" py={10}>
                    <Text fontSize="2xl" fontWeight="bold" mb={5}>
                        Certificate of Completion
                    </Text>
                    <Box
                        display="inline-block"
                        maxWidth="800px"
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="lg"
                        mx="auto"
                        mb={5}
                        position="relative"
                    >
                        <Image
                            src={certificateDetails.certificate_link}
                            alt="Certificate"
                            width="100%"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            style={{
                                pointerEvents: "none",
                            }}
                        />
                    </Box>
                    <Text fontSize="lg" fontWeight="medium" color="gray.600" mb={5}>
                        Issued to: <b>{certificateDetails.certificate_user_origin}</b> <br />
                        For completing: <b>{certificateDetails.certificate_course_origin}</b> <br />
                        Date: {certificateDetails.issued_date}
                    </Text>
                    {certificateDetails.certificate_user_origin === user?.email && (
                        <Box display="flex" justifyContent="center" gap={4}>
                            <Button colorScheme="teal" onClick={handleShare}>
                                Share
                            </Button>
                            <Button colorScheme="blue" onClick={handleDownload}>
                                Download
                            </Button>
                        </Box>
                    )}
                </Box>
            ) : (
                <Box textAlign="center" py={10}>
                    <Text fontSize="lg" fontWeight="medium" color="gray.500">
                        Certificate not found or you do not have access to it.
                    </Text>
                </Box>
            )}
        </Layout>
    );
};

export default Certificate;
