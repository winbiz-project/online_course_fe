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
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const CardTestimony = ({ review }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        key={review.review_id}
        mb="6"
        p="4"
        borderWidth="1px"
        borderRadius="lg"
        backgroundColor={"white"}
        minHeight="250px"
        maxW="400px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%" // Menjaga semua card sejajar
      >
        <Flex mb="4">
          <Text as={"b"}>{review.review_course}</Text>
        </Flex>

        <Flex alignItems="center" mb="2">
          <Avatar name={review.review_user} size="sm" mr="2" />
          <Text fontWeight="bold">{review.review_user}</Text>
          <Flex alignItems="center" ml="4">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                as={StarIcon}
                color={
                  i < Math.round(parseFloat(review.review_rating))
                    ? "yellow.400"
                    : "gray.300"
                }
              />
            ))}
          </Flex>
        </Flex>

        <Box flex="1"> {/* Ini memastikan konten utama ada di atas */}
          <Text noOfLines={3} overflow="hidden" textOverflow="ellipsis">
            {review.review_text}
          </Text>
          {review.review_text.length > 100 && (
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
          <ModalHeader>{review.review_course}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems="center" mb="4">
              <Avatar name={review.review_user} size="md" mr="3" />
              <Box>
                <Text fontWeight="bold">{review.review_user}</Text>
                <Flex>
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      as={StarIcon}
                      color={
                        i < Math.round(parseFloat(review.review_rating))
                          ? "yellow.400"
                          : "gray.300"
                      }
                    />
                  ))}
                </Flex>
              </Box>
            </Flex>
            <Text>{review.review_text}</Text>
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
