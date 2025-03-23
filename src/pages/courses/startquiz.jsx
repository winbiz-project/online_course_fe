import {
    Box,
    Flex,
    Image,
    Text,
    Button,
    Grid,
    GridItem,
    Spinner,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    VStack,
    IconButton,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Divider,
} from "@chakra-ui/react";
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom';
import { ChevronRightIcon, ChevronLeftIcon, CloseIcon } from '@chakra-ui/icons';
import Layout from '@/components/layout';
import React, { useEffect, useState, useContext } from "react";
import config from "@/config";
import generateSlug from '@/routes/generateslug';
import AuthContext from '@/routes/authcontext';


const StartQuiz = () => {
    const location = useLocation();
    const courseId = location.state?.courseId;
    const navigate = useNavigate();
    const baseUrl = config.apiBaseUrl;
    const { user } = useContext(AuthContext);
    // const { sectionName, sectionIndex, courseDetail, subsectionList, quizIndex, quizList } = location.state || {};
    const { courseSlug, quizId } = useParams();
    const [searchParams] = useSearchParams();
    const sectionIndex = searchParams.get('section');
    const [quizData, setQuizData] = useState({});
    const [loading, setLoading] = useState(true);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const [courseDetail, setCourseDetail] = useState({});

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
      

    const getQuiz = async () => {
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
                throw new Error(`HTTP error! status: ${response.status}`);
            } 
            const data = await response.json();
            setQuizData(data.Quiz);
            setLoading(false);
        } catch (error) {
            console.error(`Could not get quiz: ${error}`);
        }
      }

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

    useEffect(() => {
      scrollToTop();
      getCourseDetail();
      getQuiz();
    }, [quizId]);

    return (
        <Layout>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Spinner size="xl" />
                </Box>
            ):(
                <>
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
                                            <Text fontSize={{ base: 'sm', md: 'md' }}>Home</Text>
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
                                                fontSize={{ base: 'sm', md: 'md' }}
                                                >
                                                {quizData.quiz_section_origin}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>

                                        <BreadcrumbItem>
                                            <Text fontSize={{ base: 'sm', md: 'md' }}>{quizData.quiz_title}</Text>
                                        </BreadcrumbItem>
                                    </Breadcrumb>
                                </Flex>

                                <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} py={{ base: '20px', md: '50px' }}>
                                    <Box 
                                        borderRadius={'lg'} 
                                        borderWidth={'2px'} 
                                        width={{ base: "90%", md: "500px" }}
                                        p={{ base: '20px', md: '50px' }} 
                                        display={'flex'} 
                                        flexDirection={'column'}
                                        justifyContent={'center'} 
                                        alignItems={'left'}
                                        >
                                            <Text as={'b'} fontSize={{ base: "xl", md: "3xl" }}>{'[Quiz]'} {quizData.quiz_title}</Text>
                                            <Text as={'i'} fontSize={{ base: "sm", md: "md" }} pb={'20px'}>Section: {quizData.quiz_section_origin}</Text>
                                            {quizData.quiz_attempted && <Text pb={'10px'}>Your Score: {Math.round(quizData.quiz_score)}</Text>}
                                            <Button
                                                borderRadius="md"
                                                bgColor="#3498DB"
                                                color="white"
                                                h={8}
                                                w={{ base: "100%", md: "130px" }}
                                                mt="10px"
                                                onClick={() =>
                                                    navigate(
                                                        `/e-learning/${courseSlug}/quiz/${quizId}?section=${sectionIndex}`,
                                                        { state: { courseId: courseId } }
                                                    )
                                                }
                                            >
                                                {quizData.quiz_attempted ? "Re-attempt Quiz" : "Attempt Quiz"}
                                            </Button>
                                            
                                    </Box>
                                </Flex>
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
                    </Box>
                </>
            )}
            
        </Layout>
    );
};

export default StartQuiz;