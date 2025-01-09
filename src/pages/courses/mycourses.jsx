import Layout from "@/components/layout";
import React, { useState, useEffect, useContext } from "react";
import Stars from 'react-stars';
import {
  Box,
  Input,
  Flex,
  Text,
  Image,
  Button,
  Spinner,
  Progress,
  Container, Divider, InputGroup, InputRightElement, IconButton
} from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import AuthContext from '@/routes/authcontext'
import config from "@/config";
import generateSlug from "@/routes/generateslug";

const MyCourses = () => {
    const baseUrl = config.apiBaseUrl;
    const [courses, setCourses] = useState([]);
    const { user } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(true);

    const navigate = useNavigate();
    const getAllCourses = async () => {
        try {
            const response = await fetch(`${baseUrl}/course/get_all_courses_by_user/${user.email}`);
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCourses(data.response);
            setLoading(false);
            
        } catch (error) {
            console.error(`Could not get courses: ${error}`);
        }
    };

    useEffect(() => {
        getAllCourses();
        }
    , []);
    
    

    return (
        <div>
            <Layout>
                { loading ?
                    (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                            <Spinner size="xl" />
                        </Box>
                    )
                :
                    (
                        <Container maxW="container.xl" my={'20'}>
                            {courses.length > 0 ? (
                                <Box>
                                    {courses.map((course, index) => {
                                        const courseSlug = generateSlug(course.course_name);
                                        
                                        return (
                                        <React.Fragment key={course.course_id}>
                                            <Box mb={5} borderRadius={8} alignItems="center">
                                                <Flex direction="row" justify="space-between" alignItems="center" wrap="wrap">
                                                    <Box width={["100%", "35%"]}>
                                                        <Image src={course.course_photo || "/src/assets/images/no-image.png"} alt={course.course_name} w="100%" h={64} objectFit='fill' borderRadius={8} />
                                                    </Box>
                                                    <Box width={["100%", "60%"]}>
                                                        <Box mt={4}>
                                                            <Text fontWeight="bold" fontSize="lg">{course.course_name}</Text>
                                                            <Text fontSize="md" color="gray.500" mt={2}>{course.course_desc}</Text>
                                                            <Flex align="center" mt={2}>
                                                                <Stars value={course.course_rating} count={5} color="#2596be" size={20} edit={false} />
                                                                <Text fontSize="sm" color="gray.500" ml={2}>({course.course_rating})</Text>
                                                            </Flex>
                                                            <Text fontSize="sm" color="gray.500" mt={2}>
                                                                Progress: {course.progress_percentage}%
                                                            </Text>
                                                            <Progress
                                                                value={course.progress_percentage}
                                                                size="sm"
                                                                colorScheme="blue"
                                                                borderRadius="lg"
                                                                mt={2}
                                                            />
                                                            <Button onClick={() => navigate(`/e-learning/${courseSlug}`, { state: { courseId: course.course_id } })} mt={4} w="100%" colorScheme="blue">Go to course</Button>
                                                        </Box>
                                                    </Box>
                                                </Flex>
                                            </Box>
                                            <Divider borderColor={"#108EE9"} mb={5} />
                                        </React.Fragment>
                                        )
                                    })}
                                </Box>
                            ) : (
                                <Flex direction="column" align="center" justify="center" mt="10%">
                                    <Text fontSize="3xl" fontWeight={'bold'} mb="20px">You haven't enrolled in any courses yet.</Text>
                                    <Button colorScheme="blue" onClick={() => navigate('/e-learning')}>Enroll Courses Now</Button>
                                </Flex>
                            )}
                        </Container>
                    )
                }
            </Layout>
        </div>
    );
};

export default MyCourses;