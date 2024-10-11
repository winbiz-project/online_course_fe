import {
    Box,
    Flex,
    Image,
    Text,
    Button,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Layout from '@/components/layout';

const StartQuiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { sectionName, sectionIndex, courseDetail, subsectionList, quizIndex, quizList } = location.state || {};
    const { quizId } = useParams();

    return (
        <Layout>
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
                        {/* <Text pb={'10px'}>Jumlah Soal: 20</Text> */}
                        <Box 
                            as='button' 
                            borderRadius='md' 
                            bgColor={'#3498DB'} 
                            width={'130px'} 
                            color='white'  
                            h={8}
                            onClick={() =>
                                navigate(`/e-learning/quiz/${quizId}`, {
                                  state: {
                                    sectionName: sectionName,
                                    sectionIndex: sectionIndex,
                                    courseDetail: courseDetail,
                                    subsectionList: subsectionList,
                                    quizIndex: quizIndex,
                                    quizList: quizList,
                                  },
                                })
                            }
                            >
                            Attempt Quiz
                        </Box>
                </Box>
            </Flex>
        </Layout>
    );
};

export default StartQuiz;