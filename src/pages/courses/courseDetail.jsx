import React, { useState, useEffect, useContext } from 'react';
import { Box, Image, Text, Badge, Button, Divider, Heading, Center, Tag, Flex, Spinner,
  VStack, HStack, Container, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Link, 
  Spacer} from '@chakra-ui/react';
import { StarIcon, LockIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
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
      const response = await fetch('http://127.0.0.1:8000/course/get_course_by_id/'+courseId);
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
      const response = await fetch(`http://localhost:8000/course/check_user_enrolled/`+user.email+'/'+courseId);
      if (!response.ok) {
        throw new Error('Failed to check enrollment status');
      }
      const data = await response.json();
      setIsEnrolled(data.response);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePurchase = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/transaction/make_transaction', {
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
          // Handle pending payment scenarios
        },
        onError: function(result) {
          console.error('Payment error:', result);
          // Handle errors appropriately
        },
        onClose: function() {
          console.log('User closed the payment popup');
          // Possibly handle when user manually closes the popup
        }
      });
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  async function processPaymentSuccess(paymentResult) {
    try {
      const response = await fetch('http://localhost:8000/transaction/successful_transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          courseid: courseId,
          transaction_id: paymentResult.transaction_id,
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
          <Box bg="#302c34" p={8} color="white">
            <HStack spacing={8} margin={'3%'} >
              <Box width={["100%", "35%"]}>
                <Image
                  borderRadius="lg"
                  src={courseDetail.course_photo}
                  alt={courseDetail.course_name}
                />
              </Box>
              <VStack spacing={3} >
                <Heading as="h1" textAlign="center">{courseDetail.course_name}</Heading>
                <HStack justify="center">
                  {courseDetail.course_categories && courseDetail.course_categories.map((category) => (
                    <Badge key={category.category_id} bg={'#9fa3fc'}>{category.category_name}</Badge>
                  ))}
                </HStack>
                <Text textAlign="center">{courseDetail.course_desc}</Text>
                <HStack justify="center">
                  <StarIcon color="yellow.400" />
                  <Text>{courseDetail.course_rating} ({courseDetail.rating_users_count} reviews)</Text>
                </HStack>
                
                {!isEnrolled && (
                  <><Text fontSize="2xl" fontWeight="bold" textAlign="center">Price: Rp{courseDetail.course_price}</Text>
                  <Button onClick={handlePurchase} bg={'#608ccc'} color='white' size="lg" alignSelf="center">Enroll Now</Button></>
                )}
              </VStack>
            </HStack>
          </Box>

          <Divider orientation="hoizontal" />
          
        </Center>

        <Flex direction="column" align="center" w="full" p={8}>
          <Heading size="lg" mb={4} textAlign="left" alignSelf="flex-start">Course Content</Heading>
          <Accordion mt={'5'} allowMultiple w="55%">
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
                        <Link color="teal.500">{subsection.subsection_name}</Link>
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
                  <Box flex="1" textAlign="left" fontWeight={'bold'} fontSize={'xl'}>
                    Review
                  </Box>
                  {isEnrolled ? <AccordionIcon /> : <LockIcon color="gray.500" />}
                </AccordionButton>
                <AccordionPanel>
                  {isEnrolled ? (
                    <Link color="teal.500">Review Course</Link>
                  ) : (
                    <Text color="gray.500">Review Course</Text>
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