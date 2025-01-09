import Layout from "@/components/layout";
import React, {useState, useEffect, useContext} from 'react';
import { Box, Text, Button, Divider, Flex, Progress, Stack, Avatar, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input, Textarea,
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, IconButton } from '@chakra-ui/react';
import { useParams, useSearchParams, useLocation, useNavigate  } from "react-router-dom";
import { StarIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Review = () => {
    const navigate = useNavigate();
    const { courseSlug } = useParams();
    const location = useLocation();
    const courseId = location.state?.courseId;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [reviews, setReviews] = useState([
      {
        review_id: 1,
        review_text:
          "This course was very insightful and inspirational! The materials I've learned here will definitely help me understand Python better.",
        review_rating: "4.0",
        review_published: true,
        review_user: "Alia",
      },
      {
        review_id: 2,
        review_text:
          "Good course! The content is well-structured and the examples are easy to follow.",
        review_rating: "5.0",
        review_published: true,
        review_user: "David",
      },
      {
        review_id: 3,
        review_text:
          "Decent course, but some sections could use more detail. Overall, it was helpful!",
        review_rating: "3.0",
        review_published: true,
        review_user: "Sophia",
      },
      {
        review_id: 4,
        review_text:
          "Amazing course! I learned a lot and feel confident about Python now.",
        review_rating: "5.0",
        review_published: true,
        review_user: "Liam",
      },
      {
        review_id: 5,
        review_text:
          "The course was okay, but I expected more practical examples.",
        review_rating: "3.0",
        review_published: true,
        review_user: "Emma",
      }
    ]);
  
    const [visibleReviews, setVisibleReviews] = useState(2);
    const [hasReviewed, setHasReviewed] = useState(true); // Dummy
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState("");
  
    const averageRating = (
      reviews.reduce((sum, review) => sum + parseFloat(review.review_rating), 0) /
      reviews.length
    ).toFixed(1);
  
    const showMoreReviews = () => {
      setVisibleReviews((prev) => Math.min(prev + 2, reviews.length));
    };

    const handleSubmitReview = () => {
      console.log("User Rating:", reviewRating);
      console.log("User Comment:", reviewComment);
      onClose();
    };
  
    return (
      <Layout>
        <Flex justifyContent="space-between" maxW="1200px" mx="auto" p="4" pb="2" direction={{ base: "column", md: "row" }}>
            <Breadcrumb separator={<ChevronRightIcon color="gray.500" />} mb={4}>
            <BreadcrumbItem>
                <BreadcrumbLink href="/mycourses" display="flex" alignItems="center">
                <Text fontSize={{base: 'xs', md: 'md'}}>Home</Text>
                </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink
                onClick={(e) => {
                    e.preventDefault();
                    navigate(`/e-learning/${courseSlug}`, {
                    state: { courseId: courseId },
                    });
                }}
                fontSize={{ base: 'xs', md: 'md' }}
                >
                    Review
                </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <Text fontSize={{base: 'xs', md: 'md'}}>Review Course & Certificate</Text>
            </BreadcrumbItem>
            </Breadcrumb>

            <Flex alignItems="center" justifyContent="space-between" mb={4} width={{ base: "150px", md: "250px" }}>
            </Flex>
        </Flex>
        <Flex maxW="1200px" mx="auto" p="4" pt="0" direction={{ base: "column", md: "row" }}>
          {/* Left Section: Ratings Summary */}
          <Box flex="1" pr={{ base: "0", md: "8" }} mb={{ base: "8", md: "0" }}>
            <Flex alignItems="center" mb="4">
              <StarIcon color="yellow.400" mr="2" boxSize={7}/>
              <Text fontSize="4xl" fontWeight="bold" mr="2">
                {averageRating}
              </Text>
              <Text fontSize="2xl" color="gray.500">
                ({reviews.length} reviews)
              </Text>
            </Flex>
            <Stack spacing="4">
              {[5, 4, 3, 2, 1].map((stars) => {
                const percentage =
                  (reviews.filter(
                    (review) => Math.round(parseFloat(review.review_rating)) === stars
                  ).length /
                    reviews.length) *
                  100;
                return (
                  <Flex key={stars} alignItems="center">
                    <Text fontSize="sm" w="20px">
                      {stars}
                    </Text>
                    <StarIcon color="yellow.400" mr="2" />
                    <Progress
                      value={percentage}
                      size="sm"
                      w="200px"
                      colorScheme="yellow"
                      mr="2"
                    />
                    <Text fontSize="sm">{percentage.toFixed(0)}%</Text>
                  </Flex>
                );
              })}
            </Stack>
          </Box>
  
          {/* Right Section: Reviews List */}
          <Box flex="2">
            <Text fontSize="2xl" fontWeight="bold" mb="4">
              Course Title
            </Text>
            <Flex justifyContent="flex-end" mb="4"> {/* Menambahkan Flex untuk memindahkan tombol ke kanan */}
              <Button colorScheme="blue" onClick={onOpen}>
                {hasReviewed ? "Show Your Review" : "Review Course"}
              </Button>
            </Flex>
            <Divider mb="4" />
  
            {reviews.slice(0, visibleReviews).map((review) => (
              <Box
                key={review.review_id}
                mb="6"
                p="4"
                borderWidth="1px"
                borderRadius="lg"
              >
                <Flex alignItems="center" mb="2">
                  <Avatar name={review.review_user} size="sm" mr="4" />
                  <Text fontWeight="bold">{review.review_user}</Text>
                </Flex>
  
                <Flex alignItems="center" mb="2">
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
  
                <Text>{review.review_text}</Text>
              </Box>
            ))}
  
            {visibleReviews < reviews.length && (
                <Button onClick={showMoreReviews} colorScheme="blue" variant="outline" width="100%">
                    Show More Reviews
                </Button>
            )}
          </Box>
        </Flex>

        {/* Modal for Reviewing Course */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Review This Course</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb="4">Rate this course:</Text>
              <Flex mb="4">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    as={StarIcon}
                    color={i < reviewRating ? "yellow.400" : "gray.300"}
                    boxSize={6}
                    cursor="pointer"
                    onClick={() => setReviewRating(i + 1)}
                  />
                ))}
              </Flex>
              <Textarea
                placeholder="Write your comment here..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmitReview}>
                Submit
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Layout>
    );
  };
export default Review;