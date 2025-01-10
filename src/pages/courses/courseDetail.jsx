import React, { useState, useEffect, useContext } from 'react';
import { Box, Image, Text, Badge, Button, Divider, Heading, Center, Tag, Flex, Spinner,
  VStack, HStack, Container, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, 
  Spacer, Icon } from '@chakra-ui/react';
import { StarIcon, LockIcon, CheckIcon } from '@chakra-ui/icons';
import { json, useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '@/routes/authcontext'
import Layout from '@/components/layout';
import config from '@/config';
import generateSlug from '@/routes/generateslug';
import swal from 'sweetalert2';

const CourseDetailPage = () => {
  const baseUrl = config.apiBaseUrl;
  const { courseSlug } = useParams();
  const { user } = useContext(AuthContext);
  const [ loading, setLoading ] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [courseDetail, setCourseDetail] = useState({});
  const [userProgressVid, setUserProgressVid] = useState([]);
  const [userProgressQuiz, setUserProgressQuiz] = useState([]);
  const location = useLocation();
  const courseId = location.state?.courseId;
  const navigate = useNavigate();

  const getCourseDetail = async () => {
    try {
      const response = await fetch(`${baseUrl}/course/get_course_by_id/${courseId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCourseDetail(data.response);
    } catch (error) {
      console.error(`Could not get courses: ${error}`);
    }
  };

  const checkEnrollment = async () => {
    if (user) {
      try {
      const response = await fetch(`${baseUrl}/course/check_user_enrolled/${user.email}/${courseId}`);
      if (!response.ok) {
        throw new Error('Failed to check enrollment status');
      }
      const data = await response.json();
      setIsEnrolled(data.response);
      } catch (error) {
      console.error('Error:', error);
      }
    }
  };

  const handlePurchase = async () => {
    if(!user) {
      swal.fire({
        title: 'Please login',
        icon: 'warning',
        text: 'You need to be logged in to access this action',
        timer: 6000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
      navigate("/auth/login"); // Arahkan ke halaman login
      return; // Hentikan eksekusi lebih lanjut
    }
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/transaction/create_xendit_invoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          courseid: courseId,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to enroll course');
      }

      const data = await response.json();
      
      if (data.invoice && data.invoice.invoice_url) {
        window.location.href = data.invoice.invoice_url;
      } else {
        throw new Error('Invoice URL not found');
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
    finally{      
      setLoading(false);
    }
  };

  const getUserProgress = async () => {
    try {
      const response = await fetch(`${baseUrl}/course/get_user_progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      
      // Mengumpulkan data dari `completed_subsections` ke array sementara
      const completedSubsections = data.completed_subsections.map(subsection => subsection.sub_section_id);
      setUserProgressVid(completedSubsections);

      // Mengumpulkan data dari `completed_quizzes` ke array sementara
      const completedQuizzes = data.completed_quizzes.map(quiz => quiz.quiz_id);
      setUserProgressQuiz(completedQuizzes);


      console.log(userProgressVid);
      console.log(userProgressQuiz);

    } catch (error) {
      console.error(`Could not get user progress: ${error}`);
    }
  }

  const fetchData = async () => {
    await Promise.all([
      getCourseDetail(),
      checkEnrollment(),
      getUserProgress()
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [courseId, isEnrolled]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Layout>
      <VStack spacing={4} w="100%">
        <Box bg="#2D2F31" color="white" w="100%" py={8} px={{ base: 4, md: 8 }}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'center', md: 'flex-start' }}
            justify="space-between"
            maxW="1200px"
            mx="auto"
          >
            <VStack spacing={4} align="flex-start" w={{ base: '100%', md: '50%' }}>
              <Heading as="h1" size="xl" textAlign={{ base: 'center', md: 'left' }}>
                {courseDetail.course_name}
              </Heading>

              <Image
                borderRadius="lg"
                src={courseDetail.course_photo}
                alt={courseDetail.course_name}
                width={{ base: "100%", md: "65%" }}
                display={{ base: "block", md: "none" }} // Hanya tampil di mobile
              />

              <HStack spacing={2}>
                <Text fontSize="lg">{courseDetail.course_rating}</Text>
                <StarIcon color="yellow.400" />
                <Text fontSize="lg">({courseDetail.rating_users_count} reviews)</Text>
              </HStack>
              <HStack wrap="wrap">
                {courseDetail.course_categories?.map((category) => (
                  <Badge key={category.category_id} bg="#2ECC71" textColor="white" mb={2}>
                    {category.category_name}
                  </Badge>
                ))}
              </HStack>
              <Text fontSize="lg" textAlign={{ base: 'center', md: 'left' }}>
                {courseDetail.course_desc}
              </Text>

              {!isEnrolled && (
                <>
                  <Text fontSize="2xl" fontWeight="bold" textAlign="left">
                    Price: Rp{courseDetail.course_price.toLocaleString('id-ID')}
                  </Text>
                  <Button bg="#3498DB" color="white" size="lg" onClick={handlePurchase}>
                    Enroll Now
                  </Button>
                </>
              )}
            </VStack>

            <Box w={{ base: '100%', md: '45%' }} mt={{ base: 8, md: 0 }} >
              <Image
                borderRadius="lg"
                src={courseDetail.course_photo}
                alt={courseDetail.course_name}
                maxW="100%"
                objectFit="contain"
                display={{ base: "none", md: "block" }} // Hanya tampil di desktop
              />
            </Box>
          </Flex>
        </Box>

        <Flex direction="column" align="center" w="full" px={4} py={8}>
          <Heading size="lg" mb={4} textAlign="left" alignSelf={{base: '',md: "flex-start"}} ml={{base: 0, md: 4}}>
            Course Content
          </Heading>
          <Accordion mt={4} allowMultiple w="100%">
            {courseDetail.sections?.map((section, idxSection) => (
              <AccordionItem key={section.section_id}>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="bold" fontSize="xl">
                    {section.section_name}
                  </Box>
                  {isEnrolled ? <AccordionIcon /> : <LockIcon color="gray.500" />}
                </AccordionButton>
                <AccordionPanel>
                  {section.subsections?.map((subsection) => (
                    <React.Fragment key={subsection.subsection_id}>
                      {isEnrolled ? (
                        <Flex alignItems='center'>
                          <Box 
                            borderRadius="full" 
                            border="2px solid #CBD5E0" 
                            bgColor='#F8F9FA' 
                            w="20px" 
                            h="20px" 
                            mr="5px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            >
                            {userProgressVid.includes(parseInt(subsection.subsection_id)) && 
                              <Icon as={CheckIcon} color="teal" p='2px'>
                              </Icon>
                            }
                          </Box>
                          <Text
                            as="button"
                            color="teal"
                            onClick={() =>
                              navigate(
                                `/e-learning/${generateSlug(
                                  courseDetail.course_name
                                )}/${generateSlug(subsection.subsection_name)}?section=${idxSection}`,
                                {
                                  state: {
                                    courseId: courseDetail.course_id,
                                    subsectionId: subsection.subsection_id,
                                  },
                                }
                              )
                            }
                          >
                            {subsection.subsection_name}
                          </Text>
                        </Flex>
                      ) : (
                        <Text color="gray.500">{subsection.subsection_name}</Text>
                      )}
                      <Divider mt={2} />
                    </React.Fragment>
                  ))}

                  {section.quizzes?.map((quiz) => (
                    <React.Fragment key={quiz.quiz_id}>
                      {isEnrolled ? (
                        <Flex alignItems='center'>
                          <Box
                            borderRadius="full" 
                            border="2px solid #CBD5E0" 
                            bgColor='#F8F9FA' 
                            w="20px" 
                            h="20px" 
                            mr="5px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            >
                            {userProgressQuiz.includes(parseInt(quiz.quiz_id)) && 
                                <Icon as={CheckIcon} color="teal" p='2px'>

                                </Icon>
                              }
                          </Box>
                          <Text
                            as="button"
                            color="teal"
                            onClick={() =>
                              navigate(
                                `/e-learning/${generateSlug(
                                  courseDetail.course_name
                                )}/quiz/${quiz.quiz_id}/start?section=${idxSection}`,
                                { state: { courseId } }
                              )
                            }
                          >
                            [Quiz] {quiz.quiz_title}
                          </Text>
                        </Flex>
                      ) : (
                        <Text color="gray.500">[Quiz] {quiz.quiz_title}</Text>
                      )}
                      <Divider mt={2} />
                    </React.Fragment>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
              <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight={'bold'} fontSize={'xl'}>
                      Review
                    </Box>
                    {isEnrolled ? <AccordionIcon /> : <LockIcon color="gray.500" />}
                  </AccordionButton>
                  <AccordionPanel>
                    {isEnrolled ? (
                      <Text color="teal.500" fontSize={'lg'} as="button" onClick={() =>
                        navigate(
                          `/e-learning/${generateSlug(
                            courseDetail.course_name
                          )}/review`,
                          { state: { courseId } }
                        )
                      }>Review Course</Text>
                    ) : (
                      <Text color="gray.500" fontSize={'lg'}>Review Course</Text>
                    )}
                    
                  </AccordionPanel>
                </AccordionItem>
          </Accordion>
        </Flex>
      </VStack>

    </Layout>
  );
};

export default CourseDetailPage;