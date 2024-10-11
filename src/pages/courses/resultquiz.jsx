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


const ResultQuiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { sectionName, sectionIndex, courseDetail, subsectionList, quizIndex, quizList, quizScore } = location.state || {};
    const { quizId } = useParams();
    const roundedScore = Math.round(quizScore);

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
                                Ulangi Kuis
                            </Box>
                            {quizIndex == quizList.length -1? (
                                <Box as='span'>
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
                                        navigate(`/e-learning/quiz/${quizList[quizIndex+1].quiz_id}`, {
                                        state: {
                                            sectionName: sectionName,
                                            sectionIndex: sectionIndex,
                                            courseDetail: courseDetail,
                                            subsectionList: subsectionList,
                                            quizIndex: quizIndex+1,
                                            quizList: quizList,
                                        },
                                        })
                                    }
                                    >
                                    Berikutnya
                                </Box>
                            )}
                        </Flex>
                </Box>
            </Flex>
        </Layout>
    );
};

export default ResultQuiz;