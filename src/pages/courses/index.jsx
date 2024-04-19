import Layout from "@/components/layout";
import React, { useState, useEffect } from "react";
import Stars from 'react-stars';
import {
  Box,
  Input,
  Flex,
  Text,
  Image,
  Button,
  Container, Divider, InputGroup, InputRightElement, IconButton
} from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const getAllCourses = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/course/get_all_published_course');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCourses(data);
      console.log(response);
    } catch (error) {
      console.error(`Could not get courses: ${error}`);
    }
  };

  useEffect(() => {
    getAllCourses();
  }
  , []);

  const getDefaultImage = (photo) => {
    return photo ? photo : '/src/assets/images/no-image.png';
  };
  
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const filteredCourses = courses.filter((course) => {
    return course.course_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Layout>
      <Container maxW="container.xl" mt={'10'}>
        <Flex direction="column" align="center" mb={8}>
          <InputGroup w="100%" mb={5}>
            <Input placeholder="Search..." onChange={handleSearch} />
            <InputRightElement width="4.5rem" height="100%" display="flex" alignItems="center" justifyContent="center">
              <IconButton
                variant="unstyled"
                color="#108EE9"
                icon={<SearchIcon />}
              />
            </InputRightElement>
          </InputGroup>
        </Flex>
        <Box>
          {filteredCourses.map((course) => (
            <React.Fragment key={course.course_id}>
              <Box mb={5} borderRadius={8} alignItems="center">
                <Flex direction="row" justify="space-between" alignItems="center" wrap="wrap">
                  <Box width={["100%", "35%"]}>
                    {/* Ensure you provide a valid image source */}
                    <Image src={getDefaultImage(course.course_photo)} alt={course.course_name} w="100%" h={64} objectFit='fill' borderRadius={8} />
                  </Box>
                  <Box width={["100%", "60%"]}>
                    <Box mt={4}>
                      <Text fontWeight="bold" fontSize="lg">{course.course_name}</Text>
                      <Text fontWeight="bold" fontSize="sm" mt={2}>Price: Rp.{course.course_price}</Text>
                      <Text fontSize="md" color="gray.500" mt={2}>{course.course_desc}</Text>
                      <Flex align="center" mt={2}>
                        {/* Ensure you provide a value for rating */}
                        <Stars value={course.course_rating} count={5} color="#2596be" size={20} edit={false} />
                        <Text fontSize="sm" color="gray.500" ml={2}>({course.course_rating})</Text>
                      </Flex>
                      <Button onClick={() => navigate(`/courses/${course.course_id}`)} mt={4} w="100%" colorScheme="blue">Go to course</Button>
                    </Box>
                  </Box>
                </Flex>
              </Box>
              <Divider borderColor={"#108EE9"} mb={5} />
            </React.Fragment>
          ))}
        </Box>
      </Container>
    </Layout>
  );
};

export default Courses;
