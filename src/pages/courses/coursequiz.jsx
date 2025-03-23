import Layout from '@/components/layout';
import React, {useState, useEffect, useContext, useRef} from 'react';
import { Box, Image, Text, Badge, Button, Divider, Heading, Center, Tag, Flex, Spinner,
    RadioGroup, Stack, Radio, Accordion, AccordionItem, AccordionIcon, AccordionButton, AccordionPanel,
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, VStack, IconButton } from '@chakra-ui/react';

import { useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { useParams, useSearchParams } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from '@/routes/authcontext';
import config from '@/config';
import generateSlug from '@/routes/generateslug';



function CourseQuiz() {
  const baseUrl = config.apiBaseUrl;
  const location = useLocation();
  const courseId = location.state?.courseId;

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
//   const { sectionName, sectionIndex, courseDetail, subsectionList, quizIndex, quizList } = location.state || {};
  const [searchParams] = useSearchParams();
  const sectionIndex = searchParams.get('section');
  const [courseDetail, setCourseDetail] = useState({});
  const [sectionName, setSectionName] = useState('');
  const [sectionList, setSectionList] = useState([]);
  const [subsectionList, setSubsectionList] = useState([]);
  const [subsectionIdx, setSubsectionIdx] = useState(0);
  const [subsectionName, setSubsectionName] = useState('');
  const [quizList, setQuizList] = useState([]);
  const { courseSlug, quizId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizData, setQuizData] = useState({});
  
  const [courseAvail, setCourseAvail] = useState(false);
  const [quizAvail, setQuizAvail] = useState(false);
  const [loading, setLoading] = useState(true);

  const [quizIndex, setQuizIndex] = useState(0);
  const [questionIdList, setQuestionIdList] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  
  const getCourseDetail = async () => {
    try {
      const response = await fetch(`${baseUrl}/course/get_course_by_id/${courseId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setCourseDetail(data.response);
      setSectionList(data.response.sections);
      setSectionName(data.response.sections[sectionIndex].section_name);
      setSubsectionList(data.response.sections[sectionIndex].subsections);

      data.response.sections[sectionIndex].quizzes.forEach((quiz, i) => {
        if (quiz.quiz_id === parseInt(quizId)) {
          setQuizIndex(i);
        }
      });

      setQuizList(data.response.sections[sectionIndex].quizzes);
      setCourseAvail(true);
    } catch (error) {
      console.error(`Could not get courses: ${error}`);
    }
  };

  const handleNext = () => {
    setCurrentQuestionId((currentQuestion < questionIdList.length -1 ? questionIdList[currentQuestion+1]:questionIdList[currentQuestion]));
    setCurrentQuestion((prev) => (prev < questionIdList.length - 1 ? prev + 1 : prev));
  };

  const handlePrevious = () => {
    setCurrentQuestionId((currentQuestion > 0 ? questionIdList[currentQuestion-1]:questionIdList[currentQuestion]));
    setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
  };


  const handleAnswerChange = (questionId, value) => {
    const selectedAnswer = quizData.details[currentQuestionId].answers[value];

    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        selected: value,  // Store the ID for selection purposes
        answer: selectedAnswer,
      },
    }));
  };

  const handleSubmit = async () => {
    onClose();
    setLoading(true);

    var total_correct = 0;
    var total_question = Object.keys(answers).length;

    for(let idQuestion in answers){
        if(answers[idQuestion].answer.is_correct){
            total_correct += 1;
        }
    }


    try {
        const response = await fetch(`${baseUrl}/quiz/submit_quiz/${quizId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_email: user.email,
                courseid: courseDetail.course_id,
                correct: total_correct,
                total: total_question
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if(response.ok) {
            const data = await response.json();

            const addprogress = await fetch(`${baseUrl}/course/add_quiz_progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email,
                    courseid: courseId,
                    quizid : quizId,
                }),
            });

            if (!addprogress.ok) {
                throw new Error(`HTTP error! status: ${addprogress.status}`);
            }

            navigate(`/e-learning/${courseSlug}/quiz/${quizId}/start?section=${sectionIndex}`, {
                state: {
                    courseId: courseId,
                }
            })
        }
    } catch (error) {
        console.error(`Could not submit quiz: ${error}`);
    }
  }

  const renderNextButton = () => {
    // Mengecek Apakah ada quiz selanjutnya atau tidak
    if (quizIndex < quizList.length -1) {
      return (
        <Box
          as="button"
          display="flex"
          alignItems="center"
          onClick={() => navigate(`/e-learning/${courseId}/quiz/${quizList[quizIndex+1].quiz_id}/start?section=${sectionIndex}`)}
        >
          <Text fontWeight="bold">Berikutnya</Text>
          <ChevronRightIcon boxSize={5} />
        </Box>
      );
    }

    // Jika sudah di quiz terakhir pada section dan masih ada section selanjutnya
    if (parseInt(sectionIndex) !== sectionList.length-1){
      return (
        <Box
            as="button"
            display="flex"
            alignItems="center"
            onClick={() => navigate(`/e-learning/${courseId}/${subsectionList[0].subsection_id}?section=${sectionIndex+1}`)}
          >
            <Text fontWeight="bold">Berikutnya</Text>
            <ChevronRightIcon boxSize={5} />
          </Box>
      );
      
    }

    // Jika tidak ada kuis, dan sudah di subsection terakhir pada section dan tidak ada section selanjutnya
    return(
      <Box as='span'>
      </Box>
    )
  };

  const validateCourseAndQuizAccess = async () => {
    let isValid = false;
    let hasAccess = null;
  
    try {
      const enrollmentResponse = await fetch(`${baseUrl}/course/check_user_enrolled/${user.email}/${courseId}`);
      if (!enrollmentResponse.ok) {
        throw new Error('Failed to check enrollment status');
      }
      const enrollmentData = await enrollmentResponse.json();
      hasAccess = enrollmentData.response;
  
      if (!hasAccess) {
        swal.fire({
          title: 'Access Denied',
          icon: 'warning',
          text: 'You need to purchase this course to access this page',
          timer: 6000,
          timerProgressBar: true,
          showConfirmButton: false,
          showCloseButton: true,
        });
        navigate(`/e-learning/${courseSlug}`, { replace: true });
        return;
      }
  
      const quizResponse = await fetch(`${baseUrl}/quiz/get_quiz_on_enrolled_course/${quizId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });
  
      if (!quizResponse.ok) {
        throw new Error(`HTTP error! status: ${quizResponse.status}`);
      }
  
      const quizData = await quizResponse.json();
      isValid = quizData.Quiz.quiz_course_origin_id === parseInt(courseId);
  
      if (!isValid) {
        swal.fire({
          title: "Course Quiz Doesn't Exist",
          icon: "error",
          toast: true,
          timer: 6000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
        navigate(`/e-learning/${courseSlug}`);
        return;
      }else{
        setQuizData(quizData.Quiz);
        setQuestionIdList(Object.keys(quizData.Quiz.details));
        setCurrentQuestionId(Object.keys(quizData.Quiz.details)[0]);
        setQuizAvail(true);
        setLoading(false);
      }
  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
      getCourseDetail();
      validateCourseAndQuizAccess();
    }, [quizId]);

    if (loading) {
        return (
                    <Layout>
                        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                            <Spinner size="xl" />
                        </Box>
                    </Layout>
                );
    }

    return (
        <Layout>
            { quizAvail && courseAvail ?
                (
                    <Box position="relative" height="auto" pb={5}>
                        <Flex direction="row" justifyContent="space-between"  overflow="hidden">
                            <Flex direction="column" width={sidebarOpen ? "75%" : "100%"} transition="width 0.3s ease">
                            <Flex
                                justifyContent="space-between"
                                p={{ base: 3, md: 5 }}
                            >
                                <Breadcrumb separator={<ChevronRightIcon color="gray.500" />} mb={4}>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/mycourses" display="flex" alignItems="center">
                                        <Text fontSize={{ base: 'sm', md: 'md' }}   >Home</Text>
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
                                            {quizData.quiz_section_origin}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    <BreadcrumbItem>
                                        <Text fontSize={{ base: 'sm', md: 'md' }}>{quizData.quiz_title}</Text>
                                    </BreadcrumbItem>
                                </Breadcrumb>
                                <Flex alignItems="center" justifyContent="space-between" mb={4} width={"250px"}>
                                    {/* {quizIndex == 0 ? (
                                        <Box
                                            as="button"
                                            display="flex"
                                            alignItems="center"
                                            onClick={() => navigate(`/e-learning/${courseDetail.course_id}/${subsectionList[subsectionList.length-1].subsection_id}?section=${sectionIndex}`)}
                                            >
                                            <ChevronLeftIcon boxSize={5}/>
                                            <Text fontWeight="bold">Sebelumnya</Text>
                                        </Box>
                                    ) : (
                                        <Box
                                        as="button"
                                        display="flex"
                                        alignItems="center"
                                        onClick={() => navigate(`/e-learning/${courseId}/quiz/${quizList[quizIndex-1].quiz_id}/start?section=${sectionIndex}`)}
                                        >
                                        <ChevronLeftIcon boxSize={5}/>
                                        <Text fontWeight="bold">Sebelumnya</Text>
                                        </Box>
                                    )}
                                    {renderNextButton()} */}
                                    {/* {quizIndex == quizList.length -1? (
                                        <Box as='span'>
                                        </Box>
                                    ) : (
                                        <Box
                                        as="button"
                                        display="flex"
                                        alignItems="center"
                                        onClick={() => navigate(`/e-learning/${courseId}/quiz/${quizList[quizIndex+1].quiz_id}/start?section=${sectionIndex}`)}
                                        >
                                        <Text fontWeight="bold">Berikutnya</Text>
                                        <ChevronRightIcon boxSize={5} />
                                        </Box>
                                    )} */}
                                </Flex>
                            </Flex>
                            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold">Quiz {quizData.quiz_title}</Text>

                                {quizData.details[currentQuestionId].question_img ?
                                (
                                    <VStack px={{base: '30px', md: ''}} mb={5}>
                                        <Box justifyContent='center' display={'flex'} pt='20px' pb='20px'>
                                            {quizData.details[currentQuestionId].question_img && (
                                                <Image src={quizData.details[currentQuestionId].question_img} alt={`Image for question ${currentQuestionId + 1}`} w={{base: '100%', md: '30%'}}/>
                                            )}
                                        </Box>
                                        <Box>
                                            <Text>{currentQuestion + 1}. {quizData.details[currentQuestionId].question_text}</Text>
                                            <RadioGroup
                                                value={answers[currentQuestionId]?.selected || ""} 
                                                onChange={(value) => handleAnswerChange(currentQuestionId, value)}
                                            >
                                                <Stack direction="column" pt={2}>
                                                    {Object.keys(quizData.details[currentQuestionId].answers).map((key) => (
                                                        <Radio key={key} value={key}>
                                                            {quizData.details[currentQuestionId].answers[key].answer_text}
                                                        </Radio>
                                                    ))}
                                                </Stack>
                                            </RadioGroup>
                                        </Box>
                                    </VStack>
                                ) 
                                : 
                                (
                                    <Flex direction='column' px={{base: '30px', md: ''}}>
                                        <Box pt={'20px'} pb={'20px'}>
                                            <Text>{currentQuestion + 1}. {quizData.details[currentQuestionId].question_text}</Text>
                                            <RadioGroup
                                                value={answers[currentQuestionId]?.selected || ""} 
                                                onChange={(value) => handleAnswerChange(currentQuestionId, value)}
                                            >
                                                <Stack direction="column" pt={2}>
                                                    {Object.keys(quizData.details[currentQuestionId].answers).map((key) => (
                                                        <Radio key={key} value={key} py={1}>
                                                            {quizData.details[currentQuestionId].answers[key].answer_text}
                                                        </Radio>
                                                    ))}
                                                </Stack>
                                            </RadioGroup>
                                        </Box>
                                    </Flex>
                                )}


                                
                                <Flex justifyContent="space-between" mt={5}>
                                    <Button
                                    leftIcon={<ChevronLeftIcon />}
                                    isDisabled={currentQuestion === 0}
                                    onClick={handlePrevious}
                                    mr={{base: 20, md: 40}}
                                    size={{ base: "sm", md: "md" }}
                                    >
                                    Previous
                                    </Button>
                                    {currentQuestion === questionIdList.length - 1 ? (
                                    <Button
                                        rightIcon={<ChevronRightIcon />}
                                        onClick={onOpen}
                                        ml={{base: 20, md: 40}}
                                        size={{ base: "sm", md: "md" }}
                                    >
                                        Submit
                                    </Button>
                                    ) : (
                                    <Button
                                        rightIcon={<ChevronRightIcon />}
                                        onClick={handleNext}
                                        
                                        ml={{base: 20, md: 40}}
                                        size={{ base: "sm", md: "md" }}
                                    >
                                        Next
                                    </Button>
                                    )}
                                </Flex>
                            </Box>
                            </Flex>
                            {/* Sidebar */}
                            {sidebarOpen && (
                                <Box
                                position="absolute"
                                top={0}
                                right={0}
                                width={{ base: "50%", md: "25%" }}
                                height="100%"
                                bg="#F5F5F5"
                                boxShadow="xl"
                                zIndex="99"
                                overflowY="auto"
                                >
                                <VStack align="stretch" spacing={2} w={"100%"}>
                                    <Flex direction="row" justifyContent="space-between">
                                    <Text fontSize="lg" p={4} fontWeight="bold">Course Content</Text>
                                    <IconButton
                                        icon={<CloseIcon/>}
                                        size="md"
                                        m={2}
                                        backgroundColor={'#F5F5F5'}
                                        onClick={() => setSidebarOpen(!sidebarOpen)}
                                    />
                                    </Flex>
                                    {/* Isi konten sidebar */}
                                    <Accordion allowMultiple w="100%">
                                    {courseDetail.sections.map((section, idxSection) => (
                                    <AccordionItem key={section.section_id}>
                                        <AccordionButton>
                                        <Box flex="1" textAlign="left" fontWeight={'bold'} fontSize={'xl'}>
                                            {section.section_name}
                                        </Box>
                                        <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel>
                                        <Divider/>
                                        {section.subsections.map((subsection, index) => (
                                            <React.Fragment key={subsection.subsection_id}>
                                            <Box>
                                                <Box
                                                    as="button"
                                                    width="100%"
                                                    p={2}
                                                    onClick={() =>
                                                    navigate(`/e-learning/${courseSlug}/${generateSlug(subsection.subsection_name)}?section=${idxSection}`, {
                                                        state: { courseId: courseId, subsectionId: subsection.subsection_id },
                                                    })
                                                    }
                                                    _hover={{ bg: "#EBEBEB" }}
                                                    textAlign="left"
                                                >
                                                    <Text color="black">{subsection.subsection_name}</Text>
                                                </Box>
                                                <Divider mt={'0'} />
                                            </Box>
                                            
                                            </React.Fragment>
                                        ))}

                                        {section.quizzes && section.quizzes.length > 0 && (
                                            <>
                                            {section.quizzes.map((quiz, index) => (
                                                <React.Fragment key={quiz.quiz_id}>
                                                    {quiz.quiz_title == quizData.quiz_title ? (
                                                        <Box>
                                                            <Box
                                                                as="button"
                                                                width="100%"
                                                                p={2}
                                                                backgroundColor={'#EBEBEB'}
                                                                onClick={() =>
                                                                navigate(`/e-learning/${courseSlug}/quiz/${quiz.quiz_id}/start?section=${idxSection}`,{
                                                                    state: { courseId: courseId }
                                                                })
                                                                }
                                                                _hover={{ bg: "#EBEBEB" }}
                                                                textAlign="left"
                                                            >
                                                                <Text color="black">{'[Quiz]'} {quiz.quiz_title}</Text>
                                                            </Box>
                                                            <Divider mt={'0'} />
                                                        </Box>
                                                    ):(
                                                        <Box>
                                                            <Box
                                                                as="button"
                                                                width="100%"
                                                                p={2}
                                                                onClick={() =>
                                                                navigate(`/e-learning/${courseSlug}/quiz/${quiz.quiz_id}/start?section=${idxSection}`,{
                                                                    state: { courseId: courseId }
                                                                })
                                                                }
                                                                _hover={{ bg: "#EBEBEB" }}
                                                                textAlign="left"
                                                            >
                                                                <Text color="black">{'[Quiz]'} {quiz.quiz_title}</Text>
                                                            </Box>
                                                            <Divider mt={'0'} />
                                                        </Box>
                                                    )}
                                                    
                                                </React.Fragment>
                                            ))}
                                            </>
                                        )}
                                        </AccordionPanel>
                                    </AccordionItem>
                                    ))}
                                    </Accordion>
                                </VStack>
                                </Box>
                            )}

                            {/* Button Sidebar */}
                            <Box
                                position="absolute"
                                top="20%"
                                right={sidebarOpen? {base: "50%", md: "25%"}: "0"}
                                height={10}
                                transform="translateY(-50%)"
                                zIndex="1000"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                display="flex"
                                alignItems="center"
                                bg="gray.700"
                                color="white"
                                borderRadius="md"
                                p={isHovered ? "0 12px" : "0"}
                                transition="width 0.3s ease, padding 0.3s ease"
                                width={sidebarOpen ? "30px" : isHovered ? "160px" : "30px"}
                                cursor="pointer"
                                justifyContent={sidebarOpen ? 'center' : isHovered ? '' : 'center'}
                            >
                            {sidebarOpen? (<ChevronRightIcon />):(<ChevronLeftIcon />)}
                            {isHovered && !sidebarOpen && (
                                <Text ml={2} fontSize="md" whiteSpace="nowrap">
                                Course Content
                                </Text>
                            )}
                            </Box>
                            
                        </Flex>

                        {/* AlertDialog for confirmation */}
                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                        >
                            <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Confirm Submission
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                Are you sure you want to submit the quiz?
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme="blue" bgColor={'#004BAD'} onClick={handleSubmit} ml={3}>
                                    Submit
                                </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </Box>
                )
            : 
                (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <Spinner size="xl" />
                    </Box>
                )
            }
        </Layout>
    );
}

export default CourseQuiz;