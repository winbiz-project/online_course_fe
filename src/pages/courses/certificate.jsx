import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from '@/components/layout';
import { Spinner } from "@chakra-ui/react";

const Certificate = () => {
    const { uniqueIdCertificate } = useParams(); // Mengambil parameter dari URL
    const [certificateLink, setCertificateLink] = useState(null);
    const [loading, setLoading] = useState(true);

    


    return (
        <Layout>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Spinner size="xl" />
                </Box>
            ):(
                <>
                    <div>
                        <h1>Certificate</h1>
                    </div>
                </>
            )}
        </Layout>
    );
};

export default Certificate;