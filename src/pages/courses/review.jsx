import Layout from "@/components/layout";
import React, {useState, useEffect, useContext} from 'react';
import { Box, Text, Button, Divider, Flex, Progress, Stack, Avatar, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input, Textarea,
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, IconButton, Tag, HStack } from '@chakra-ui/react';
import { useParams, useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { StarIcon, ChevronRightIcon } from '@chakra-ui/icons';
import config from '@/config';
import AuthContext from '@/routes/authcontext'
import { Spinner } from "@chakra-ui/react";

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
    const [enrollment_and_completion, setEnrollment_and_completion] = useState(false);
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

    const fetchEnrollmentAndCompletion = async () => {
      try {
        const response = await fetch(`${baseUrl}/course/check_enrollment_and_completion`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            courseid: courseId,
          }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        setEnrollment_and_completion(data.response);
      } catch (error) {
        console.error("Error checking enrollment and completion:", error);
      }
    };

    useEffect(() => {
      fetchReviews();
      
      if (user) {
        fetchEnrollmentAndCompletion();
      }
    }, [user, courseId]); 
    
    // Perbaiki perhitungan averageRating agar tidak NaN jika tidak ada review
    const averageRating = reviews.length > 0 ? (
      reviews.reduce((sum, review) => sum + parseFloat(review.review_rating), 0) /
      reviews.length
    ).toFixed(1) : "0.0"; 
    
    const showMoreReviews = () => {
      setVisibleReviews((prev) => Math.min(prev + 2, reviews.length));
    };

    const addReview = async () => {
      try {
        const response = await fetch(`${baseUrl}/course/add_rating_course`, {
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
        const response = await fetch(`${baseUrl}/certificate/generate_and_save_certificate`, {
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
      if (reviewRating === 0 || reviewComment.trim() === "") {
        alert("Please provide a rating and a comment.");
        return;
      }
      createCertificate();
      addReview();
    };

    const resetReviewForm = () => {
      setReviewRating(0);
      setReviewComment("");
    }

    // Fungsi renderPlanBadge (Disalin dari CardTestimony)
    const renderPlanBadge = (status) => {
        let text = "";
        let tagBg = "";
        let tagColor = "gray.700";
        let borderColor = "gray.300";

        if (status === "miniclass") {
            text = "MINICLASS";
            tagBg = "#E0E0E0";
            borderColor = "#B0B0B0";
            tagColor = "gray.800";
        } else if (status === "masterclass") {
            text = "MASTERCLASS";
            tagBg = "#FFEB3B";
            borderColor = "#FFD700";
            tagColor = "gray.800";
        } else {
            return null;
        }

        return (
            <Tag
                size="sm"
                px={1.5}
                py={0.5}
                borderRadius="sm"
                fontSize={{ base: "0.5em", sm: "0.6em", md: "0.7em" }}
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
                flexShrink={0}
            >
                {text}
            </Tag>
        );
    };

    // LOGIKA TAG AVATAR PURE CSS (Disalin dari CardTestimony)
    const renderAvatarTag = (reviewUser, reviewUserStatus, userProfilePicture) => {
        let avatarContainerProps = {};
        let avatarInitialColor = "black";
        let avatarBgColor = "transparent";

        if (reviewUserStatus === "miniclass") {
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
                    bg: "white",
                    zIndex: 1,
                }
            };
            avatarInitialColor = "black";
        } else if (reviewUserStatus === "masterclass") {
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
                    bg: "white",
                    zIndex: 1,
                }
            };
            avatarInitialColor = "black";
        }

        if (reviewUserStatus === "miniclass" || reviewUserStatus === "masterclass") {
            return (
                <Box {...avatarContainerProps} mr="2" flexShrink={0}>
                    <Avatar
                        name={reviewUser}
                        size="sm"
                        src={userProfilePicture}
                        bg={avatarBgColor}
                        color={avatarInitialColor}
                        children={<Text fontSize="xl" fontWeight="bold">{reviewUser.charAt(0)}</Text>}
                    />
                </Box>
            );
        } else {
            return <Avatar name={reviewUser} size="sm" mr="2" flexShrink={0} />;
        }
    };

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
                  // === PERBAIKAN DI SINI: Hindari NaN ===
                  const count = reviews.filter(
                    (review) => Math.round(parseFloat(review.review_rating)) === stars
                  ).length;
                  const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  // ====================================
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
                {(hasReviewed || enrollment_and_completion) && (
                  <Button colorScheme="blue" onClick={onOpen}>
                    {hasReviewed ? "Show Your Review" : "Review Course"}
                  </Button>
                )}
              </Flex>
              <Divider mb="4" />
    
              {reviews.length === 0 ? (
                <Flex direction="column" alignItems="center" justifyContent="center" minH="200px" py={10} textAlign="center">
                  <Text fontSize="xl" fontWeight="semibold" color="gray.600" mb={4}>
                    Course ini belum memiliki ulasan.
                  </Text>
                  <Text fontSize="lg" color="gray.500">
                    Jadilah yang pertama berbagi pengalaman Anda!
                  </Text>
                </Flex>
              ) : (
                <> 
                  {reviews.slice(0, visibleReviews).map((review) => {
                    let reviewCardBorderProps = {
                      backgroundColor: "white",
                      borderWidth: "1px",
                      borderColor: "gray.200",
                      boxShadow: "lg",
                      borderRadius: "lg",
                    };

                    if (review.review_user_status === "miniclass") {
                      reviewCardBorderProps = {
                        border: "2px solid transparent",
                        bgImage: "linear-gradient(white, white), linear-gradient(135deg, #C0C0C0 0%, #AAA 50%, #888 100%)", // Gradien silver
                        bgOrigin: "border-box",
                        bgClip: "padding-box, border-box",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                        borderRadius: "lg",
                      };
                    } else if (review.review_user_status === "masterclass") {
                      reviewCardBorderProps = {
                        border: "2px solid transparent",
                        bgImage: "linear-gradient(white, white), linear-gradient(135deg, #FFD700 0%, #DAA520 50%, #B8860B 100%)", // Gradien emas
                        bgOrigin: "border-box",
                        bgClip: "padding-box, border-box",
                        boxShadow: "0px 4px 15px rgba(0,0,0,0.25)",
                        borderRadius: "lg",
                      };
                    }
                    return (
                      <Box
                        key={review.review_id}
                        mb="6"
                        p="4"
                        {...reviewCardBorderProps} // Terapkan border props
                      >
                        <Flex alignItems="center" mb="2">
                          {/* Render Avatar Tag atau Avatar biasa */}
                          {renderAvatarTag(review.review_user, review.review_user_status, review.review_user_profile_picture)} {/* Asumsi review.review_user_profile_picture ada */}
                          
                          {/* Area untuk Nama, Bintang, dan Badge (Responsif) */}
                          <Flex
                            flexDirection={{ base: 'column', sm: 'row' }}
                            alignItems={{ base: 'flex-start', sm: 'center' }}
                            flexGrow={1}
                            minWidth="0"
                            flexWrap="wrap"
                            gap={{ base: 0, sm: 2 }}
                          >
                            <Text fontWeight="bold" flexShrink={0} noOfLines={1} mr={{ base: 0, sm: 2 }}>
                              {review.review_user}
                            </Text>
                            
                            {/* INNER FLEX: Bintang dan Badge */}
                            <Flex
                              flexDirection={{ base: 'column', lg: 'row' }} // Stacking di mobile, row di desktop besar
                              alignItems={{ base: 'flex-start', lg: 'center' }}
                              mt={{ base: 1, sm: 0 }}
                              flexWrap="wrap"
                              flexGrow={1}
                              minWidth="0"
                              gap={{ base: 0, lg: 2 }}
                            >
                              <HStack spacing={0.5} flexShrink={0}>
                                {[...Array(5)].map((_, i) => (
                                  <Icon
                                    key={i}
                                    as={StarIcon}
                                    boxSize={3}
                                    color={
                                      i < Math.round(parseFloat(review.review_rating))
                                        ? "yellow.400"
                                        : "gray.300"
                                    }
                                  />
                                ))}
                              </HStack>
                              {/* Badge Status Plan */}
                              {renderPlanBadge(review.review_user_status)}
                            </Flex>
                          </Flex>
                        </Flex>
            
                        <Text>{review.review_text}</Text>
                      </Box>
                    );
                  })}
        
                  {visibleReviews < reviews.length && (
                      <Button onClick={showMoreReviews} colorScheme="blue" variant="outline" width="100%">
                          Show More Reviews
                      </Button>
                  )}
                </>
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