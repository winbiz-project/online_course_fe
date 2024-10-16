import Layout from '@/components/layout';
import React, {useState, useEffect, useContext, useRef} from 'react';
import { Box, Image, Text, Badge, Button, Divider, Heading, Center, Tag, Flex, Spinner,
    RadioGroup, Stack, Radio, Accordion, AccordionItem, AccordionIcon, AccordionButton, AccordionPanel,
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, VStack, IconButton } from '@chakra-ui/react';

import { useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from '@/routes/authcontext';
import config from '@/config';



function CourseQuiz() {
  const baseUrl = config.apiBaseUrl;
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { sectionName, sectionIndex, courseDetail, subsectionList, quizIndex, quizList } = location.state || {};
  const { quizId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizData, setQuizData] = useState({});
  const [loading, setLoading] = useState(true);
  const [questionIdList, setQuestionIdList] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const getQuiz = async () => {
    setLoading(true);
    try {
        const response = await fetch(`${baseUrl}/quiz/get_quiz_on_enrolled_course/${quizId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                }),
        });
        if (!response.ok) {
            setLoading(false);
            throw new Error(`HTTP error! status: ${response.status}`);
        } 
        const data = await response.json();
        setQuizData(data.Quiz);
        setQuestionIdList(Object.keys(data.Quiz.details));
        setCurrentQuestionId(Object.keys(data.Quiz.details)[0]);
        setLoading(false);

    } catch (error) {
        console.error(`Could not get quiz: ${error}`);
    }
  }

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
            navigate(`/e-learning/quiz/${quizId}/result`, {
                state: {
                  sectionName: sectionName,
                  sectionIndex: sectionIndex,
                  courseDetail: courseDetail,
                  subsectionList: subsectionList,
                  quizIndex: quizIndex,
                  quizList: quizList,
                  quizScore: data['Score']
                },
              })
        }
    } catch (error) {
        console.error(`Could not submit quiz: ${error}`);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
      getQuiz()
    }, [quizId]);


return (
  <Layout>
    { loading ?
        (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        )
    : 
        (
            <Box position="relative" height="auto" pb={5}>
                <Flex direction="row" justifyContent="space-between" height={"60vh"} overflow="hidden">
                    <Flex direction="column" width={sidebarOpen ? "75%" : "100%"} transition="width 0.3s ease">
                    <Flex
                        justifyContent="space-between"
                        p={5}
                    >
                        <Breadcrumb separator={<ChevronRightIcon color="gray.500" />} mb={4}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/mycourses" display="flex" alignItems="center">
                                <Text>Home</Text>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/e-learning/${courseDetail.course_id}`}>{quizData.quiz_section_origin}</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <Text>{quizData.quiz_title}</Text>
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <Flex alignItems="center" justifyContent="space-between" mb={4} width={"250px"}>
                            {quizIndex == 0 ? (
                                <Box
                                    as="button"
                                    display="flex"
                                    alignItems="center"
                                    onClick={() => navigate(`/e-learning/${courseDetail.course_id}/${subsectionList[subsectionList.length-1].subsection_id}`, {
                                        state: {
                                            sectionName:sectionName,
                                            sectionIndex: sectionIndex,
                                            courseDetail: courseDetail,
                                            subsectionList: subsectionList,
                                            subsectionIndex: subsectionList.length-1,
                                            subsectionName: subsectionList[subsectionList.length-1].subsection_name,
                                            quizList: quizList,
                                        },
                                    })}
                                    >
                                    <ChevronLeftIcon boxSize={5}/>
                                    <Text fontWeight="bold">Sebelumnya</Text>
                                </Box>
                            ) : (
                                <Box
                                as="button"
                                display="flex"
                                alignItems="center"
                                onClick={() => navigate(`/e-learning/quiz/${quizList[quizIndex-1].quiz_id}`, {
                                    state: {
                                        sectionName: sectionName,
                                        sectionIndex: sectionIndex,
                                        courseDetail: courseDetail,
                                        subsectionList: subsectionList,
                                        quizIndex: quizIndex-1,
                                        quizList: quizList,
                                    },
                                })}
                                >
                                <ChevronLeftIcon boxSize={5}/>
                                <Text fontWeight="bold">Sebelumnya</Text>
                                </Box>
                            )}
                            {quizIndex == quizList.length -1? (
                                <Box as='span'>
                                </Box>
                            ) : (
                                <Box
                                as="button"
                                display="flex"
                                alignItems="center"
                                onClick={() => navigate(`/e-learning/quiz/${quizList[quizIndex+1].quiz_id}`, {
                                    state: {
                                        sectionName: sectionName,
                                        sectionIndex: sectionIndex,
                                        courseDetail: courseDetail,
                                        subsectionList: subsectionList,
                                        quizIndex: quizIndex+1,
                                        quizList: quizList,
                                    },
                                })}
                                >
                                <Text fontWeight="bold">Berikutnya</Text>
                                <ChevronRightIcon boxSize={5} />
                                </Box>
                            )}
                        </Flex>
                    </Flex>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} just>
                        <Text fontSize="2xl" fontWeight="bold" pr={210}>Quiz {quizData.quiz_title}</Text>
                        <Flex direction='column'>
                                <Box p={'40px 20px 20px 0px'}>
                                    {quizData.details[currentQuestionId].question_img ?
                                        (
                                            <>
                                                <Flex>
                                                    <Text>{currentQuestion + 1}.</Text>
                                                    {quizData.details[currentQuestionId].question_img && (
                                                        <Box boxSize='sm'>
                                                            <Image src={quizData.details[currentQuestionId].question_img} alt={`Image for question ${currentQuestionId + 1}`} />
                                                        </Box>
                                                    )}
                                                </Flex>
                                                <Text>{quizData.details[currentQuestionId].question_text}</Text>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <Text>{currentQuestion + 1}. {quizData.details[currentQuestionId].question_text}</Text>
                                            </>
                                        )
                                    }
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
                        </Flex>
                        
                        <Flex justifyContent="space-between" mt={5}>
                            <Button
                            leftIcon={<ChevronLeftIcon />}
                            isDisabled={currentQuestion === 0}
                            onClick={handlePrevious}
                            mr={40}
                            >
                            Previous
                            </Button>

                            {currentQuestion === questionIdList.length - 1 ? (
                            <Button
                                rightIcon={<ChevronRightIcon />}
                                onClick={onOpen}
                                ml={40}
                            >
                                Submit
                            </Button>
                            ) : (
                            <Button
                                rightIcon={<ChevronRightIcon />}
                                onClick={handleNext}
                                ml={40}
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
                            {courseDetail.sections.map((section) => (
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
                                                navigate(`/e-learning/${courseDetail.course_id}/${subsection.subsection_id}`, {
                                                    state: { 
                                                    sectionName: section.section_name,
                                                    courseDetail: courseDetail,
                                                    subsectionList: section.subsections,
                                                    subsectionIndex: index,
                                                    subsectionName: subsection.subsection_name,
                                                    quizList: section.quizzes,
                                                    },
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
                                                        navigate(`/e-learning/quiz/${quiz.quiz_id}`, {
                                                            state: { 
                                                            sectionName: section.section_name,
                                                            courseDetail: courseDetail,
                                                            subsectionList: section.subsections,
                                                            subsectionIndex: section.subsections.length-1,
                                                            subsectionName: section.subsections[section.subsections.length-1],
                                                            quizIndex: index,
                                                            quizList: section.quizzes,
                                                            },
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
                                                        navigate(`/e-learning/quiz/${quiz.quiz_id}`, {
                                                            state: { 
                                                            sectionName: section.section_name,
                                                            courseDetail: courseDetail,
                                                            subsectionList: section.subsections,
                                                            subsectionIndex: section.subsections.length-1,
                                                            subsectionName: section.subsections[section.subsections.length-1],
                                                            quizIndex: index,
                                                            quizList: section.quizzes,
                                                            },
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
    }
  </Layout>
);
}

export default CourseQuiz;