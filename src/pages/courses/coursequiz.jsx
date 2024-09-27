import Layout from '@/components/layout';
import React, {useState, useEffect} from 'react';
import { Box, Image, Text, Badge, Button, Divider, Heading, Center, Tag, Flex, Spinner,
    RadioGroup, Stack, Radio, Code,
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, IconButton } from '@chakra-ui/react';
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from "react-router-dom";



function CourseQuiz() {
  const location = useLocation();
//   const { subsectionName, sectionName, courseDetail, subsectionIndex, subsectionList } = location.state || {};
//   const subsectionLength = subsectionList.length;
  const { courseId, quizId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizData, setQuizData] = useState({});
  const [loading, setLoading] = useState(true);
  const [questionIdList, setQuestionIdList] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState('');


  const getQuiz = async () => {
    try {
        const response = await fetch('https://online-course-be.vercel.app/quiz/get_quiz_by_id/'+quizId);
        if (!response.ok) {
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
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(answers)
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
                <Flex direction="column">
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
                                <BreadcrumbLink href={`/e-learning/${courseId}`}>{quizData.quiz_section_origin}</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <Text>{quizData.quiz_title}</Text>
                            </BreadcrumbItem>
                        </Breadcrumb>
                        {/* <Flex alignItems="center" justifyContent="space-between" mb={4} width={"250px"}>
                            {subsectionIndex == 0 ? (
                                <Box as='span'>
                                </Box>
                            ) : (
                                <Box
                                as="button"
                                display="flex"
                                alignItems="center"
                                onClick={() => navigate(`/e-learning/${courseId}/${subsectionList[subsectionIndex-1].subsection_id}`, {
                                    state: {
                                    subsectionName: subsectionList[subsectionIndex-1].subsection_name,
                                    sectionName:sectionName,
                                    courseDetail: courseDetail,
                                    subsectionIndex: subsectionIndex-1,
                                    subsectionList: subsectionList
                                    },
                                })}
                                >
                                <ChevronLeftIcon boxSize={5}/>
                                <Text fontWeight="bold">Sebelumnya</Text>
                                </Box>
                            )}
                            {subsectionIndex == subsectionLength-1? (
                                <Box as='span'>
                                </Box>
                            ) : (
                                <Box
                                as="button"
                                display="flex"
                                alignItems="center"
                                onClick={() => navigate(`/e-learning/${courseId}/${subsectionList[subsectionIndex+1].subsection_id}`, {
                                    state: {
                                    subsectionName: subsectionList[subsectionIndex+1].subsection_name,
                                    sectionName:sectionName,
                                    courseDetail: courseDetail,
                                    subsectionIndex: subsectionIndex+1,
                                    subsectionList: subsectionList
                                    },
                                })}
                                >
                                <Text fontWeight="bold">Berikutnya</Text>
                                <ChevronRightIcon boxSize={5} />
                                </Box>
                            )}
                        </Flex> */}
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
                                    {/* <Flex>
                                        <Text>{currentQuestion + 1}.</Text>
                                        {quizData.details[currentQuestionId].question_img && (
                                            <Box boxSize='sm'>
                                                <Image src={quizData.details[currentQuestionId].question_img} alt={`Image for question ${currentQuestionId + 1}`} />
                                            </Box>
                                        )}
                                    </Flex>
                                    <Text>{currentQuestion + 1}. {quizData.details[currentQuestionId].question_text}</Text> */}
                                    {/* {quizData.details[currentQuestionId].question_img && (
                                        <Code display="block" whiteSpace={'pre'} >
                                            {quizData.questions[currentQuestion].codeSnippet}
                                        </Code>
                                    )} */}
                                    <RadioGroup
                                        value={answers[currentQuestionId] || ""} 
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
                                onClick={handleSubmit}
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
            </Box>
        )
    }
  </Layout>
);
}

export default CourseQuiz;