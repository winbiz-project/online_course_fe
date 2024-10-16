import React, { useState, useEffect, useContext } from 'react';
import { Box, Image, Text, Badge, Button, Divider, Heading, Center, Tag, Flex, Spinner,
  VStack, HStack, Container, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, 
  Spacer} from '@chakra-ui/react';
import { StarIcon, LockIcon } from '@chakra-ui/icons';
import { json, useParams, Link, useNavigate } from 'react-router-dom';
import AuthContext from '@/routes/authcontext'
import Layout from '@/components/layout';
import config from '@/config';

const CourseDetailPage = () => {
  const baseUrl = config.apiBaseUrl;
  const { courseId } = useParams();
  const { user } = useContext(AuthContext);
  const [ loading, setLoading ] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [courseDetail, setCourseDetail] = useState({});
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
  };

  const handlePurchase = async () => {
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
      <VStack spacing={4}>
        <Center>
          <Box bg="#2D2F31" p={8} color="white">
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
                  {section.subsections.map((subsection, index) => (
                    <React.Fragment key={subsection.subsection_id}>
                      {isEnrolled ? (
                        // <Link to={`/e-learning/${courseId}/${subsection.subsection_id}`} style={{ color: 'teal' }}>{subsection.subsection_name}</Link>
                        <Text
                          as="button"
                          color="teal"
                          onClick={() =>
                            navigate(`/e-learning/${courseId}/${subsection.subsection_id}`, {
                              state: { 
                                sectionName: section.section_name,
                                sectionIndex: idxSection,
                                courseDetail: courseDetail,
                                subsectionList: section.subsections,
                                subsectionIndex: index,
                                subsectionName: subsection.subsection_name,
                                quizList: section.quizzes,
                              },
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
                  ))}

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
                                navigate(`/e-learning/quiz/${quiz.quiz_id}/start`, {
                                  state: { 
                                    sectionName: section.section_name,
                                    sectionIndex: idxSection,
                                    courseDetail: courseDetail,
                                    subsectionList: section.subsections,
                                    quizIndex: index,
                                    quizList: section.quizzes,
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
      </VStack>

    </Layout>
  );
};

export default CourseDetailPage;