import React, { useState, useEffect, useContext } from 'react';
import { Box, Image, Text, Badge, Button, Divider, Heading, Center, Tag, Flex, Spinner,
  VStack, HStack, Container, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, 
  Spacer, Icon, Toast, 
  useToast} from '@chakra-ui/react';
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
  const [ loading2, setLoading2 ] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [courseDetail, setCourseDetail] = useState({});
  const [userProgressVid, setUserProgressVid] = useState([]);
  const [userProgressQuiz, setUserProgressQuiz] = useState([]);
  const [userProgressPercentage, setUserProgressPercentage] = useState(0);
  const [certificateData, setCertificateData] = useState({});
  const location = useLocation();
  const courseId = location.state?.courseId;
  const toast = useToast();
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
    }else{
      setLoading2(false);
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
      navigate("/auth/login");
      return;
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
    if(user && isEnrolled) {
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
        
        const completedSubsections = data.completed_subsections.map(subsection => subsection.sub_section_id);
        setUserProgressVid(completedSubsections);
  
        const completedQuizzes = data.completed_quizzes.map(quiz => quiz.quiz_id);
        setUserProgressQuiz(completedQuizzes);

        if (courseDetail?.sections) {
          const totalSubsections = courseDetail.sections.reduce((acc, section) => acc + section.subsections.length, 0) || 0;
          const totalQuizzes = courseDetail.sections.reduce((acc, section) => acc + section.quizzes.length, 0) || 0;
          const totalItems = totalSubsections + totalQuizzes;
          const totalProgressPercentage = totalItems > 0 ? Math.round(((completedSubsections.length + completedQuizzes.length) / totalItems) * 100) : 0;

          setUserProgressPercentage(totalProgressPercentage);
          
          if (totalProgressPercentage === 100) {
            getCertificateURL();
          } else {
            setLoading2(false);
          }
        }
  
      } catch (error) {
        console.error(`Could not get user progress: ${error}`);
      }
    }else{
      setLoading2(false);
    }
  }

  const getCertificateURL = async () => {
    try {
      const response = await fetch(`${baseUrl}/certificate/get_course_certificate/${courseId}/${user.user_id}`);
      const data = await response.json();
      setCertificateData(data.certificate_details);
      setLoading2(false);
    } catch (error) {
      console.error(`Could not get certificate URL: ${error}`);
    }
  };

  const handleCertificateClick = () => {
    if (userProgressPercentage === 100) {
      if (certificateData) {
        navigate(`/certificate/${certificateData.unique_id}`);
      } else {
        toast({
          title: "Certificate Not Available",
          description: "Your course progress is complete. Please ensure you've reviewed the course to receive your certificate.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Course Incomplete",
        description: "Complete the course to 100% and review it to unlock your certificate.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleFree = async () => {
    setLoading(true); 
    try {
      const response = await fetch(`${baseUrl}/course/assign_course`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          courseid: courseId,
        }),
      });

      if (response.ok) {
        console.log('Course assigned successfully (FREE)!');
        // Refresh halaman setelah berhasil
        window.location.reload();
      } else {
        // Tangani error jika response tidak OK
        const errorData = await response.json(); // Coba parse error response
        console.error('Failed to assign course:', response.status, errorData);
        alert(`Gagal mendaftar kursus: ${errorData.message || 'Terjadi kesalahan'}`);
      }
    } catch (error) {
      console.error('Error assigning course:', error);
      alert('Terjadi kesalahan jaringan atau server.');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await Promise.all([getCourseDetail(), checkEnrollment()]);
    await getUserProgress();

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [courseId, isEnrolled]);

  if (loading || loading2) {
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
                  {user && user.status === 'masterclass' ? (
                    <><HStack spacing={2} align="baseline">
                      <Text fontSize="2xl" fontWeight="bold" textDecoration="line-through" color="gray.500">
                        Rp{courseDetail.course_price.toLocaleString('id-ID')}
                      </Text>
                      <Text fontSize="2xl" fontWeight="extrabold" color="green.400"> {/* Ukuran sama agar sejajar */}
                        FREE
                      </Text>
                      </HStack>
                      <Button bg="#3498DB" color="white" size="lg" onClick={handleFree}>
                        Enroll Now (FREE)
                      </Button></>
                  ) : (
                    // Kondisi default jika user BUKAN 'masterclass'
                    <>
                      <Text fontSize="2xl" fontWeight="bold" textAlign="left">
                        Price: Rp{courseDetail.course_price.toLocaleString('id-ID')}
                      </Text>
                      <Button bg="#3498DB" color="white" size="lg" onClick={handlePurchase}>
                        Enroll Now
                      </Button>
                    </>
                  )}
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
                    <Text color="teal.500" fontSize={'lg'} as="button" onClick={() =>
                      navigate(
                        `/e-learning/${generateSlug(
                          courseDetail.course_name
                        )}/review`,
                        { state: { courseId, courseName: courseDetail.course_name } }
                      )
                    }>Review Course</Text>
                    
                  </AccordionPanel>
                </AccordionItem>
                {isEnrolled && (
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left" fontWeight="bold" fontSize="xl">
                        Certificate
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Text
                        color={userProgressPercentage === 100 && certificateData ? "teal.500" : "gray.500"}
                        fontSize="lg"
                        as="button"
                        onClick={handleCertificateClick}
                      >
                        Course Certificate
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                )}
          </Accordion>
        </Flex>
      </VStack>

    </Layout>
  );
};

export default CourseDetailPage;