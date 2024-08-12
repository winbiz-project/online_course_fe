import React, { useState, useEffect, useContext } from 'react';
import { Box, Image, Text, Badge, Button, Divider, Heading, Center, Tag, Flex, Spinner,
  VStack, HStack, Container, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, 
  Spacer} from '@chakra-ui/react';
import { StarIcon, LockIcon } from '@chakra-ui/icons';
import { json, useParams, Link } from 'react-router-dom';
import AuthContext from '@/routes/authcontext'
import Layout from '@/components/layout';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { user } = useContext(AuthContext);
  const [ loading, setLoading ] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [courseDetail, setCourseDetail] = useState({});

  const getCourseDetail = async () => {
    try {
      const response = await fetch('https://online-course-be.vercel.app/course/get_course_by_id/'+courseId);
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
      const response = await fetch(`https://online-course-be.vercel.app/course/check_user_enrolled/`+user.email+'/'+courseId);
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
      const response = await fetch('https://online-course-be.vercel.app/transaction/make_transaction', {
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
      window.snap.pay(data.token, {
        onSuccess: function(result) {
          processPaymentSuccess(result)
        },
        onPending: function(result) {
          console.log('Payment pending:', result);
        },
        onError: function(result) {
          console.error('Payment error:', result);
        },
        onClose: function() {
          console.log('User closed the payment popup');
        }
      });
    }
    catch (error) {
      console.error('Error:', error);
    }
    finally{      
      setLoading(false);
    }
  };

  async function processPaymentSuccess(paymentResult) {
    try {
      const response = await fetch('https://online-course-be.vercel.app/transaction/successful_transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          courseid: courseId,
          transaction_id: paymentResult.order_id,
          message: 'Payment was successful'
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update backend after successful payment');
      }
  
      const backendResult = await response.json();
      console.log('Backend updated successfully:', backendResult);
    } catch (error) {
      console.error('Error updating backend:', error);
    }
  }

  useEffect(() => {
    const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey = 'SB-Mid-client-x09fbBq81vYMIdE6';
    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey);
    script.async = true; 

    document.body.appendChild(script);

    script.onload = () => {
      console.log("Snap.js loaded successfully!");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
            {courseDetail.sections.map((section) => (
              <AccordionItem key={section.section_id}>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight={'bold'} fontSize={'xl'}>
                    {section.section_name}
                  </Box>
                  {isEnrolled ? <AccordionIcon /> : <LockIcon color="gray.500" />}
                </AccordionButton>
                <AccordionPanel>
                  {section.subsections.map((subsection) => (
                    <React.Fragment key={subsection.subsection_id}>
                      {isEnrolled ? (
                        <Link to={`/courses/${courseId}/${subsection.subsection_id}`} style={{ color: 'teal' }}>{subsection.subsection_name}</Link>
                      ) : (
                        <Text color="gray.500">{subsection.subsection_name}</Text>
                      )}
                      <Divider mt={'2'} />
                    </React.Fragment>
                  ))}
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