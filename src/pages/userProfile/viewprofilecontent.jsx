import React, { useContext } from 'react';
import { Box, Text, Heading, Tag } from '@chakra-ui/react';
import AuthContext from '@/routes/authcontext';

const ViewProfileContent = () => {
  const { user } = useContext(AuthContext);

  const renderPlanBadge = (status) => {
    let text = "";
    let tagBg = "";
    let tagColor = "gray.700";
    let borderColor = "gray.300";

    if (status === "miniclass") {
      text = "MINICLASS";
      tagBg = "#E0E0E0"; // Light gray/silver-like background
      borderColor = "#B0B0B0"; // Darker gray border
      tagColor = "gray.800";
    } else if (status === "masterclass") {
      text = "MASTERCLASS";
      tagBg = "#FFEB3B"; // Light yellow/gold-like background
      borderColor = "#FFD700"; // Gold border
      tagColor = "gray.800";
    } else {
      return null;
    }

    return (
      <Tag
        size="md"
        ml={2} // Jarak dari teks "Current Plan:"
        px={2}
        py={0.5}
        borderRadius="sm"
        fontSize="0.8em"
        fontWeight="bold"
        textTransform="uppercase"
        bg={tagBg}
        color={tagColor}
        border="1px solid"
        borderColor={borderColor}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        whiteSpace="nowrap"
      >
        {text}
      </Tag>
    );
  };

  let profileBoxBorderProps = {
    backgroundColor: "white", // Default background putih
    borderWidth: "1px",       // Default border
    borderColor: "gray.200",  // Default warna border
    boxShadow: "md",          // Default shadow
    borderRadius: "lg",       // Default radius
  };

  if (user && user.status === "miniclass") { // Periksa user.status untuk Miniclass
    profileBoxBorderProps = {
      border: "3px solid transparent",
      bgImage: "linear-gradient(white, white), linear-gradient(135deg, #C0C0C0 0%, #AAA 50%, #888 100%)", // Gradien silver
      bgOrigin: "border-box",
      bgClip: "padding-box, border-box",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.15)", // Sedikit shadow
      borderRadius: "lg",
    };
  } else if (user && user.status === "masterclass") { // Periksa user.status untuk Masterclass
    profileBoxBorderProps = {
      border: "3px solid transparent",
      bgImage: "linear-gradient(white, white), linear-gradient(135deg, #FFD700 0%, #DAA520 50%, #B8860B 100%)", // Gradien emas
      bgOrigin: "border-box",
      bgClip: "padding-box, border-box",
      boxShadow: "0px 4px 15px rgba(0,0,0,0.25)", // Shadow lebih menonjol
      borderRadius: "lg",
    };
  }

  return (
    <Box 
      p={6} 
      width="full"
      {...profileBoxBorderProps} 
    >
      <Heading as="h2" size="lg" mb={4} color="blue.700">
        Detail Profil Saya
      </Heading>
      <Text fontSize="md" mb={2}>
        Nama Lengkap: {user ? user.name : 'Memuat...'}
      </Text>
      <Text fontSize="md" mb={2}>
        Email: {user ? user.email : 'Memuat...'}
      </Text>
      
      <Text fontSize="md" mb={2}>
        Current Plan: {" "}
        {user && user.status === 'basic' ? (
          <Text as="span">Basic Plan</Text>
        ) : user && (user.status === 'miniclass' || user.status === 'masterclass') ? (
          renderPlanBadge(user.status)
        ) : (
          <Text as="span">Memuat...</Text>
        )}
      </Text>

      <Text mt={4} color="gray.600">
        Ini adalah tampilan detail informasi profil Anda.
      </Text>
    </Box>
  );
};

export default ViewProfileContent;