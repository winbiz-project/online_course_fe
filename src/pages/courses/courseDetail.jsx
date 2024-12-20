import React, { useState, useEffect, useContext } from 'react';
import { Box, Image, Text, Badge, Button, Divider, Heading, Center, Tag, Flex, Spinner,
  VStack, HStack, Container, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, 
  Spacer} from '@chakra-ui/react';
import { StarIcon, LockIcon } from '@chakra-ui/icons';
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

  const fetchData = async () => {
    await Promise.all([
      getCourseDetail(),
      checkEnrollment()
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
      {/* <VStack spacing={4}>
        <Center w='100%'>
          <Box bg="#2D2F31" p={8} color="white" w="100vw">
            <HStack spacing={8} margin={'3%'} >
              <VStack spacing={3} >
                <Heading as="h1" size={'2xl'} textAlign="left" alignSelf={"flex-start"}>{courseDetail.course_name}</Heading>
                <HStack justify="center" alignSelf={"flex-start"}>
                  <Text fontSize="lg">{courseDetail.course_rating}</Text>
                  <StarIcon color="yellow.400" />
                  <Text fontSize="lg">({courseDetail.rating_users_count} reviews)</Text>
                </HStack>
                <HStack justify="left" alignSelf={"flex-start"}>
                  {courseDetail.course_categories && courseDetail.course_categories.map((category) => (
                    <Badge key={category.category_id} bg={'#2ECC71'} textColor={'white'}>{category.category_name}</Badge>
                  ))}
                </HStack>
                <Text fontSize="lg" textAlign="left">{courseDetail.course_desc}</Text>
                
                {!isEnrolled && (
                  <><Text fontSize="2xl" fontWeight="bold" textAlign="left" alignSelf={"flex-start"}>Price: Rp{courseDetail.course_price.toLocaleString('id-ID')}</Text>
                  <Button onClick={handlePurchase} bg={'#3498DB'} color='white' size="lg" alignSelf="flex-start">Enroll Now</Button></>
                )}
              </VStack>
              <Box width={["100%", "65%"]}>
                <Image
                  borderRadius="lg"
                  src={courseDetail.course_photo}
                  alt={courseDetail.course_name}
                />
              </Box>
            </HStack>
          </Box>

          <Divider orientation="hoizontal" />
          
        </Center>

        <Flex direction="column" align="center" w="full" p={8}>
          <Heading size="lg" mb={4} textAlign="left" alignSelf="flex-start" textShadow="2px 2px 4px rgba(0, 0, 0, 0.25)">Course Content</Heading>
          <Accordion mt={'5'} allowMultiple w="100%">
            {courseDetail.sections.map((section, idxSection) => (
              <AccordionItem key={section.section_id}>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight={'bold'} fontSize={'xl'}>
                    {section.section_name}
                  </Box>
                  {isEnrolled ? <AccordionIcon /> : <LockIcon color="gray.500" />}
                </AccordionButton>
                <AccordionPanel>
                  {section.subsections.map((subsection, index) => {
                    const courseslug = generateSlug(courseDetail.course_name);
                    const subsectionslug = generateSlug(subsection.subsection_name);  
                    
                    return(
                      <React.Fragment key={subsection.subsection_id}>
                        {isEnrolled ? (
                          <Text
                            as="button"
                            color="teal"
                            onClick={() =>
                              navigate(`/e-learning/${courseslug}/${subsectionslug}?section=${idxSection}`, { 
                                state: { courseId: courseDetail.course_id, subsectionId: subsection.subsection_id } 
                              })
                            }
                          >
                            {subsection.subsection_name}
                          </Text>
                        ) : (
                          <Text color="gray.500">{subsection.subsection_name}</Text>
                        )}
                        <Divider mt={'2'} />
                      </React.Fragment>
                    )
                  })}

                  {section.quizzes && section.quizzes.length > 0 && (
                    <>
                      {section.quizzes.map((quiz, index) => (
                        <React.Fragment key={quiz.quiz_id}>
                          {isEnrolled ? (
                            // <Link to={`/e-learning/${courseId}/${subsection.subsection_id}`} style={{ color: 'teal' }}>{subsection.subsection_name}</Link>
                            <Text
                              as="button"
                              color="teal"
                              onClick={() =>
                                navigate(`/e-learning/${generateSlug(courseDetail.course_name)}/quiz/${quiz.quiz_id}/start?section=${idxSection}`, {
                                  state: {
                                    courseId: courseId,
                                  },
                                })
                              }
                            >
                              {'[Quiz]'} {quiz.quiz_title}
                            </Text>
                          ) : (
                            <Text color="gray.500">{'[Quiz]'} {quiz.quiz_title}</Text>
                          )}
                          <Divider mt={'2'} />
                        </React.Fragment>
                      ))}
                    </>
                  )}
                </AccordionPanel>
              </AccordionItem>
            ))}
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight={'bold'} fontSize={'2xl'}>
                    Review
                  </Box>
                  {isEnrolled ? <AccordionIcon /> : <LockIcon color="gray.500" />}
                </AccordionButton>
                <AccordionPanel>
                  {isEnrolled ? (
                    <Link color="teal.500" fontSize={'lg'}>Review Course</Link>
                  ) : (
                    <Text color="gray.500" fontSize={'lg'}>Review Course</Text>
                  )}
                  
                </AccordionPanel>
              </AccordionItem>

          </Accordion>
        </Flex>
      </VStack> */}

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
                display={{ base: "none", md: "block" }} // Hanya tampil di mobile
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
                      ) : (
                        <Text color="gray.500">{subsection.subsection_name}</Text>
                      )}
                      <Divider mt={2} />
                    </React.Fragment>
                  ))}

                  {section.quizzes?.map((quiz) => (
                    <React.Fragment key={quiz.quiz_id}>
                      {isEnrolled ? (
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
                      <Link color="teal.500" fontSize={'lg'}>Review Course</Link>
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