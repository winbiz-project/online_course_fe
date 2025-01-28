import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout";
import { Spinner, Box, Image, Text, Button, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import AuthContext from "@/routes/authcontext";
import config from "@/config";

const Certificate = () => {
    const baseUrl = config.apiBaseUrl;
    const { user } = useContext(AuthContext);
    const { uniqueIdCertificate } = useParams();
    const [certificateDetails, setCertificateDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const link = window.location.href;
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
                        Issued to: <b>{certificateDetails.certificate_user_origin_name}</b> <br />
                        For completing: <b>{certificateDetails.certificate_course_origin}</b> <br />
                        Date: {certificateDetails.issued_date}
                    </Text>
                    {certificateDetails.certificate_user_origin === user?.email && (
                        <Box display="flex" justifyContent="center" gap={4}>
                            <Button colorScheme="teal" onClick={onOpen}>
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
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Share Your Certificate</ModalHeader>
                    <ModalBody>
                        <p className="mb-4 text-gray-600">
                            Copy the link below to share your certificate:
                        </p>
                        <div className="px-4 py-2 border rounded-lg bg-gray-100">
                            <span className="text-sm text-gray-800 break-words">{link}</span>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="gray" onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Layout>
    );
};

export default Certificate;
