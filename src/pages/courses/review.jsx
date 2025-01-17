import Layout from "@/components/layout";
import React, {useState, useEffect, useContext} from 'react';
import { Box, Text, Button, Divider, Flex, Progress, Stack, Avatar, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input, Textarea,
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, IconButton } from '@chakra-ui/react';
import { useParams, useSearchParams, useLocation, useNavigate  } from "react-router-dom";
import { StarIcon, ChevronRightIcon } from '@chakra-ui/icons';
import config from '@/config';
import AuthContext from '@/routes/authcontext'
import { Spinner } from "@chakra-ui/react";
import { use } from "react";
import Course from "@/components/landingPage/course";

const Review = () => {
    const navigate = useNavigate();
    const { courseSlug } = useParams();
    const location = useLocation();
    const courseId = location.state?.courseId;
    const courseName = location.state?.courseName;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const baseUrl = config.apiBaseUrl;
    const { user } = useContext(AuthContext);

    const [reviews, setReviews] = useState([]);
    const [visibleReviews, setVisibleReviews] = useState(5);
    const [hasReviewed, setHasReviewed] = useState(null);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
      try {
        const response = await fetch(`${baseUrl}/course/get_all_review_on_course/${courseId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReviews(data);
        if (user){
          setHasReviewed(data.some((review) => review.review_user_email === user.email));
          if (data.some((review) => review.review_user_email === user.email)){
            setReviewComment(data.find((review) => review.review_user_email === user.email).review_text);
            setReviewRating(data.find((review) => review.review_user_email === user.email).review_rating);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    useEffect(() => {
      fetchReviews();
    }, []);
  
    const averageRating = (
      reviews.reduce((sum, review) => sum + parseFloat(review.review_rating), 0) /
      reviews.length
    ).toFixed(1);
  
    const showMoreReviews = () => {
      setVisibleReviews((prev) => Math.min(prev + 2, reviews.length));
    };

    const addReview = () => {
      try {
        const response = fetch(`${baseUrl}/course/add_rating_course`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseid : courseId,
            email : user.email,
            rating: reviewRating,
            testimonial: reviewComment,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        window.location.reload();
      } catch (error) {
        console.error("Error submitting review:", error);
      } finally {
        onClose();
      }
    }

    const createCertificate = async () => {
      try {
        const response = await fetch(`${baseUrl}/course/create_certificate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            course_id: courseId,
          }),
        });
      } catch (error) {
        console.error("Error creating certificate:", error);
      }
    };

    const handleSubmitReview = () => {
      createCertificate();
      addReview();
    };

    const resetReviewForm = () => {
      setReviewRating(0);
      setReviewComment("");
    }
  
    return (
      <Layout>
        {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Spinner size="xl" />
                </Box>
            ):(
        <>
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
            <Text fontSize="2xl" fontWeight="bold" mb="4" display={{base: "block", md: "none"}}>
                {courseName}
            </Text>
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
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          as={StarIcon}
                          color={i < stars ? "yellow.400" : "gray.300"}
                          boxSize={4}
                          cursor="pointer"
                        />
                      ))}
                      <Progress
                        value={percentage}
                        size="sm"
                        w="200px"
                        colorScheme="yellow"
                        mr="2"
                        ml="10px"
                      />
                      <Text fontSize="sm">{percentage.toFixed(0)}%</Text>
                    </Flex>
                  );
                })}
              </Stack>
            </Box>
    
            <Box flex="2">
              <Text fontSize="2xl" fontWeight="bold" mb="4" display={{base: "none", md: "block"}}>
                {courseName}
              </Text>
              <Flex justifyContent="flex-end" mb="4">
                {hasReviewed !== null && (
                  <Button colorScheme="blue" onClick={onOpen}>
                    {hasReviewed ? "Show Your Review" : "Review Course"}
                  </Button>
                )}
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
        </>
            )}
        {!hasReviewed && (
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
                <Button variant="ghost" onClick={() => { 
                  resetReviewForm(); 
                  onClose(); 
                }}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}


        {hasReviewed && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Your Review</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text mb="4">Thank you for reviewing this course!</Text>
                <Text fontWeight="bold" mb="2">Your Rating:</Text>
                <Flex mb="4">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      as={StarIcon}
                      color={i < reviewRating ? "yellow.400" : "gray.300"}
                      boxSize={6}
                    />
                  ))}
                </Flex>
                <Text fontWeight="bold" mb="2">Your Comment:</Text>
                <Text>{reviewComment || "No comment provided."}</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

      </Layout>
    );
  };
export default Review;