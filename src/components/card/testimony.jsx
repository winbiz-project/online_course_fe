// components/card/CardTestimony.jsx
import { useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Icon,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  Tag,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const CardTestimony = ({ review }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    review_id,
    review_course,
    review_user,
    review_rating,
    review_text,
    user_plan_status, // "basic", "miniclass", "masterclass"
    user_profile_picture, // URL gambar profil (opsional)
  } = review;

  // Render Plan Badge (Inline logic)
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
        size="sm"
        ml={2}
        px={1.5}
        py={0.5}
        borderRadius="sm"
        fontSize={{ base: "0.6em", md: "0.7em" }}
        fontWeight="bold"
        textTransform="uppercase"
        bg={tagBg}
        color={tagColor}
        border="1px solid"
        borderColor={borderColor}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
      >
        {text}
      </Tag>
    );
  };

  // Pure CSS Tag Avatar Logic
  let avatarContainerProps = {};
  let avatarInitialColor = "black";
  let avatarBgColor = "transparent";

  if (user_plan_status === "miniclass") {
    avatarContainerProps = {
      position: "relative",
      width: "50px",
      height: "60px",
      bg: "linear-gradient(135deg, #CCC 0%, #AAA 50%, #888 100%)", // Silver gradient
      borderRadius: "8px",
      boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      _after: {
        content: '""',
        position: "absolute",
        bottom: "-10px",
        left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
        width: "20px",
        height: "20px",
        bg: "linear-gradient(135deg, #CCC 0%, #AAA 50%, #888 100%)",
        borderRadius: "0 0 4px 0",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
      },
      _before: {
        content: '""',
        position: "absolute",
        top: "5px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        bg: "white", // Pastikan warna ini sesuai dengan background card
        zIndex: 1,
      }
    };
    avatarInitialColor = "black";
  } else if (user_plan_status === "masterclass") {
    avatarContainerProps = {
      position: "relative",
      width: "50px",
      height: "60px",
      bg: "linear-gradient(135deg, #FFD700 0%, #DAA520 50%, #B8860B 100%)", // Gold gradient
      borderRadius: "8px",
      boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      _after: {
        content: '""',
        position: "absolute",
        bottom: "-10px",
        left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
        width: "20px",
        height: "20px",
        bg: "linear-gradient(135deg, #FFD700 0%, #DAA520 50%, #B8860B 100%)",
        borderRadius: "0 0 4px 0",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
      },
      _before: {
        content: '""',
        position: "absolute",
        top: "5px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        bg: "white", // Pastikan warna ini sesuai dengan background card
        zIndex: 1,
      }
    };
    avatarInitialColor = "black";
  }

  // ==============================================================
  // Border dan Background untuk keseluruhan Card Testimony
  // ==============================================================
  let cardBgAndBorderProps = {
    backgroundColor: "white", // Default background putih untuk semua card
    borderWidth: "1px", // Default border untuk semua card
    borderColor: "gray.200", // Default warna border
    boxShadow: "lg", // Default shadow untuk semua card
  };

  if (user_plan_status === "miniclass") {
    cardBgAndBorderProps = {
      border: "2px solid transparent", // Border transparan sebagai placeholder
      bgImage: "linear-gradient(white, white), linear-gradient(135deg, #C0C0C0 0%, #A0A0A0 50%, #808080 100%)", // Gradien silver
      bgOrigin: "border-box",
      bgClip: "padding-box, border-box",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.15)", // Sedikit shadow untuk card
      borderRadius: "lg", // Pastikan borderRadius tetap ada
    };
  } else if (user_plan_status === "masterclass") {
    cardBgAndBorderProps = {
      border: "2px solid transparent",
      bgImage: "linear-gradient(white, white), linear-gradient(135deg, #FFD700 0%, #DAA520 50%, #B8860B 100%)", // Gradien emas
      bgOrigin: "border-box",
      bgClip: "padding-box, border-box",
      boxShadow: "0px 4px 15px rgba(0,0,0,0.25)", // Shadow lebih menonjol
      borderRadius: "lg", // Pastikan borderRadius tetap ada
    };
  }


  return (
    <>
      <Box
        key={review_id}
        mb="6"
        p="4"
        // Atur borderRadius di sini, agar selalu ada
        minHeight="250px"
        maxW="400px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
        {...cardBgAndBorderProps} // Terapkan props border & background di sini
      >
        {/* Judul Course */}
        <Flex mb="4">
          <Text fontSize="md" fontWeight="bold" color="gray.700">
            {review_course || "Judul Course Tidak Tersedia"}
          </Text>
        </Flex>

        {/* Flexbox untuk Avatar Tag, Nama, Bintang, dan Badge */}
        <Flex alignItems="center" mb="2">
          {/* Container untuk Tag Background dan Avatar/Inisial */}
          {(user_plan_status === "miniclass" || user_plan_status === "masterclass") ? (
            <Box {...avatarContainerProps} mr="2">
              <Avatar
                name={review_user}
                size="sm" // Ukuran Avatar, sesuaikan agar pas di tengah tag
                src={user_profile_picture} // Jika ada URL gambar
                bg={avatarBgColor}
                color={avatarInitialColor}
                children={<Text fontSize="xl" fontWeight="bold">{review_user.charAt(0)}</Text>}
              />
            </Box>
          ) : (
            // Fallback jika status basic atau tidak ada plan (avatar default)
            <Avatar name={review_user} size="sm" mr="2" src={user_profile_picture} />
          )}

          <Text fontWeight="bold">{review_user}</Text>
          
          <HStack ml="4" spacing={0.5}>
            {/* Rating Bintang */}
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                as={StarIcon}
                boxSize={3}
                color={
                  i < Math.round(parseFloat(review_rating))
                    ? "yellow.400"
                    : "gray.300"
                }
              />
            ))}
            {/* Badge Status Plan */}
            {renderPlanBadge(user_plan_status)}
          </HStack>
        </Flex>

        <Box flex="1">
          <Text noOfLines={3} overflow="hidden" textOverflow="ellipsis">
            {review_text}
          </Text>
          {review_text && review_text.length > 100 && (
            <Button
              size="sm"
              colorScheme="blue"
              variant="link"
              onClick={onOpen}
              mt={2}
            >
              Baca Selengkapnya
            </Button>
          )}
        </Box>
      </Box>

      {/* Modal untuk teks lengkap */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{review_course}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems="center" mb="4">
              {/* Avatar Tag di Modal */}
              {(user_plan_status === "miniclass" || user_plan_status === "masterclass") ? (
                <Box {...avatarContainerProps} w="60px" h="70px" mr="3">
                  <Avatar
                    name={review_user}
                    size="md"
                    src={user_profile_picture}
                    bg={avatarBgColor}
                    color={avatarInitialColor}
                    children={<Text fontSize="2xl" fontWeight="bold">{review_user.charAt(0)}</Text>}
                  />
                </Box>
              ) : (
                <Avatar name={review_user} size="md" mr="3" src={user_profile_picture} />
              )}
              <Box ml="3">
                <Text fontWeight="bold">{review_user}</Text>
                <HStack spacing={0.5}>
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      as={StarIcon}
                      boxSize={4}
                      color={
                        i < Math.round(parseFloat(review_rating))
                          ? "yellow.400"
                          : "gray.300"
                      }
                    />
                  ))}
                  {renderPlanBadge(user_plan_status)}
                </HStack>
              </Box>
            </Flex>
            <Text>{review_text}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardTestimony;