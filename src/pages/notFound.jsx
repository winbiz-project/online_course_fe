import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// NotFound component to be used for 404 pages
const NotFound = () => {
    return (
        <Box textAlign="center" mt="20">
            <Heading as="h1" fontSize="6xl" color={"#1450A3"}>
                404 Not Found
            </Heading>
            <Text mt="4" fontSize="xl" fontWeight="semibold">
                Oops! Looks like you're lost.
            </Text>
            <Button mt={4} bgColor={"#1450A3"} color={"white"} size="lg" width={"fit-content"} as={Link} to="/">
                Kembali ke Halaman Utama
            </Button>
        </Box>
    );
};

export default NotFound;