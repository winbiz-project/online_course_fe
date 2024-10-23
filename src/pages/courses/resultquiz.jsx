import {
    Box,
    Flex,
    Image,
    Text,
    Button,
    Grid,
    GridItem,
    Spinner,
} from "@chakra-ui/react";
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom'
import Layout from '@/components/layout';
import { useState, useEffect } from "react";
import config from "@/config";


const ResultQuiz = () => {
    const baseUrl = config.apiBaseUrl;
    const { courseId, quizId } = useParams();
    const [searchParams] = useSearchParams();
    const sectionIndex = searchParams.get('section');
    const location = useLocation();
    const navigate = useNavigate();
    const { quizScore } = location.state || {};
    const [quizList, setQuizList] = useState([]);
    const [sectionList, setSectionList] = useState([]);
    const [subsectionList, setSubsectionList] = useState([]);
    const [quizIndex, setQuizIndex] = useState(0);
    const [sectionName, setSectionName] = useState('');
    const [loading, setLoading] = useState(true);
    // const { sectionName, sectionIndex, courseDetail, subsectionList, quizIndex, quizList, quizScore } = location.state || {};
    // const { quizId } = useParams();
    const roundedScore = Math.round(quizScore);

    const getCourseDetail = async () => {
        try {
          const response = await fetch(`${baseUrl}/course/get_course_by_id/${courseId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setSectionName(data.response.sections[sectionIndex].section_name);

          data.response.sections[sectionIndex].quizzes.forEach((quiz, i) => {
              if (quiz.quiz_id === parseInt(quizId)) {
                  setQuizIndex(i);
              }
          });

          setQuizList(data.response.sections[sectionIndex].quizzes);
          setSectionList(data.response.sections);
          setSubsectionList(data.response.sections[sectionIndex].subsections);
          setLoading(false);
        } catch (error) {
          console.error(`Could not get courses: ${error}`);
        }
      };
    
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

    useEffect(() => {
        getCourseDetail();
    }, [quizId]);

    return (
        <Layout>
            {loading?(
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Spinner size="xl" />
                </Box>
            ):(
                <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} py={'50px'}>
                    <Box 
                        borderRadius={'lg'} 
                        borderWidth={'2px'} 
                        width={'500px'} 
                        height={'300px'} 
                        p={'50px'} 
                        display={'flex'} 
                        flexDirection={'column'}
                        justifyContent={'center'} 
                        alignItems={'left'}
                        >
                            <Text as={'b'} fontSize={'3xl'}>{'[Quiz]'} {quizList[quizIndex].quiz_title}</Text>
                            <Text as={'i'} fontSize={'md'} pb={'50px'}>Section: {sectionName}</Text>
                            <Text pb={'10px'}>Nilai Anda: {roundedScore}</Text>
                            <Flex>
                                <Box 
                                    as='button' 
                                    borderRadius='md' 
                                    bgColor={'#3498DB'} 
                                    width={'130px'} 
                                    color='white'  
                                    h={8}
                                    mr={5}
                                    onClick={() =>
                                        navigate(`/e-learning/${courseId}/quiz/${quizId}/start?section=${sectionIndex}`)
                                    }
                                    >
                                    Ulangi Kuis
                                </Box>
                                {renderNextButton()}
                                {/* {quizIndex == quizList.length -1? (
                                    <Box
                                        as='button' 
                                        borderRadius='md' 
                                        bgColor={'#3498DB'} 
                                        width={'130px'} 
                                        color='white'  
                                        h={8}
                                        onClick={() =>
                                            navigate(`/e-learning/${courseId}/quiz/${quizList[quizIndex+1].quiz_id}/start?section=${sectionIndex}`)
                                        }
                                        >
                                    </Box>
                                ):(
                                    <Box 
                                        as='button' 
                                        borderRadius='md' 
                                        bgColor={'#3498DB'} 
                                        width={'130px'} 
                                        color='white'  
                                        h={8}
                                        onClick={() =>
                                            navigate(`/e-learning/${courseId}/quiz/${quizList[quizIndex+1].quiz_id}/start?section=${sectionIndex}`)
                                        }
                                        >
                                        Berikutnya
                                    </Box>
                                )} */}
                            </Flex>
                    </Box>
                </Flex>
            )}

        </Layout>
    );
};

export default ResultQuiz;