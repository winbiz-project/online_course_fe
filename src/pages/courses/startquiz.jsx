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
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout';
import { useEffect, useState, useContext } from "react";
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

    useEffect(() => {
      getQuiz();
    }, [quizId]);

    return (
        <Layout>
            {loading ? (
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
                            <Text as={'b'} fontSize={'3xl'}>{'[Quiz]'} {quizData.quiz_title}</Text>
                            <Text as={'i'} fontSize={'md'} pb={'50px'}>Section: {quizData.quiz_section_origin}</Text>
                            {/* <Text pb={'10px'}>Jumlah Soal: 20</Text> */}
                            <Box 
                                as='button' 
                                borderRadius='md' 
                                bgColor={'#3498DB'} 
                                width={'130px'} 
                                color='white'  
                                h={8}
                                onClick={() =>
                                    navigate(`/e-learning/${courseSlug}/quiz/${quizId}?section=${sectionIndex}`, {
                                        state: {
                                        courseId: courseId,
                                        },
                                    })
                                }
                                >
                                Attempt Quiz
                            </Box>
                    </Box>
                </Flex>
            )}
            
        </Layout>
    );
};

export default StartQuiz;