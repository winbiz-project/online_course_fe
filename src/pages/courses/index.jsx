import Layout from "@/components/layout";
import React, { useState, useEffect } from "react";
import Stars from 'react-stars';
import axios from 'axios';
import {
  Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Wrap, WrapItem,
  Flex, Text, Image, Button, Container, Divider, InputGroup, InputRightElement, IconButton, Menu, MenuButton, MenuList, MenuItem
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filterCourses, setFilterCourses] = useState(courses);

  const navigate = useNavigate();
  const getAllCourses = async () => {
    try {
      const response = await fetch('https://online-course-be.vercel.app/course/get_all_published_course');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCourses(data);
      setFilterCourses(data);
      // console.log(data)
    } catch (error) {
      console.error(`Could not get courses: ${error}`);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://online-course-be.vercel.app/course/get_all_categories');
      setCategories(response.data.response);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const handleFilterCategory = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter(id => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const applyCategoryFilter = () => {
    if (selectedCategories.length > 0) {
      const filteredCourses = courses.filter(course =>
        course.course_categories.some(category => selectedCategories.includes(category.category_id))
      );
      setFilterCourses(filteredCourses);
      console.log('Filtered Courses:', filteredCourses);
      handleCloseModal();
    } else {
      setFilterCourses(courses);
      handleCloseModal();
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllCourses();
    fetchCategories();
  }
  , []);

  const getDefaultImage = (photo) => {
    return photo ? photo : '/src/assets/images/no-image.png';
  };
  
  const [searchTerm, setSearchTerm] = useState("");
  // const [sortOption, setSortOption] = useState('none');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleSearchClick = () => {
    if (searchTerm) {
      const filtered = filterCourses.filter(course =>
        course.course_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilterCourses(filtered);
    }else{
      if (selectedCategories.length > 0) {
        const filteredCourses = courses.filter(course =>
          course.course_categories.some(category => selectedCategories.includes(category.category_id))
        );
        setFilterCourses(filteredCourses);
      } else {
        setFilterCourses(courses);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleSortChange = (option) => {
    let sortedCourses = [...filterCourses];
    if (option === 'latestCreated') {
      sortedCourses.sort((a, b) => new Date(b.course_created) - new Date(a.course_created));
    } else if (option === 'newestCreated') {
      sortedCourses.sort((a, b) => new Date(a.course_created) - new Date(b.course_created));
    } else if (option === 'titleAsc') {
      sortedCourses.sort((a, b) => a.course_name.localeCompare(b.course_name));
    } else if (option === 'titleDesc') {
      sortedCourses.sort((a, b) => b.course_name.localeCompare(a.course_name));
    } else if (option === 'highestRating') {
      sortedCourses.sort((a, b) => b.course_rating - a.course_rating);
    } else if (option === 'lowestRating') {
      sortedCourses.sort((a, b) => a.course_rating - b.course_rating);
    } else if (option === 'highPrice') {
      sortedCourses.sort((a, b) => b.course_price - a.course_price);
    } else if (option === 'lowPrice') {
      sortedCourses.sort((a, b) => a.course_price - b.course_price);
    }
    setFilterCourses(sortedCourses);
  };

  return (
    <Layout>
      <Container maxW="container.xl" mt={'10'}>
        <Flex direction="column" align="center" mb={8} position="relative" w="100%">
          <InputGroup w="100%" mb={5}>
            <Input placeholder="Search..." onChange={handleSearch} onKeyDown={handleKeyPress}/>
            <InputRightElement width="4.5rem" height="100%" display="flex" alignItems="center" justifyContent="center">
              <IconButton variant="unstyled" color="#108EE9" icon={<SearchIcon />} onClick={handleSearchClick}/>
            </InputRightElement>
          </InputGroup>

          <Menu > 
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} position="absolute"
            bottom={-10} right={160}>
              Sort by
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleSortChange('latestCreated')}>Latest Created</MenuItem>
              <MenuItem onClick={() => handleSortChange('newestCreated')}>Newest Created</MenuItem>
              <MenuItem onClick={() => handleSortChange('titleAsc')}>Title Ascending</MenuItem>
              <MenuItem onClick={() => handleSortChange('titleDesc')}>Title Descending</MenuItem>
              <MenuItem onClick={() => handleSortChange('highestRating')}>Highest Rating</MenuItem>
              <MenuItem onClick={() => handleSortChange('lowestRating')}>Lowest Rating</MenuItem>
              <MenuItem onClick={() => handleSortChange('highPrice')}>Highest Price</MenuItem>
              <MenuItem onClick={() => handleSortChange('lowPrice')}>Lowest Price</MenuItem>
            </MenuList>
          </Menu>
          
          <Button
            position="absolute"
            bottom={-10}
            right={0}
            colorScheme="blue"
            onClick={handleOpenModal}
          >
            Category Filter
          </Button>

          <Modal isOpen={isModalOpen} onClose={handleCloseModal} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Filter Categories</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Wrap>
                  {categories.map((category) => (
                    <WrapItem key={category.category_id}>
                      <Button
                        onClick={() => handleFilterCategory(category.category_id)}
                        bg={selectedCategories.includes(category.category_id) ? 'gray.200' : 'white'}
                        color={selectedCategories.includes(category.category_id) ? '#3884cc' : 'black'}
                        border={selectedCategories.includes(category.category_id) ? '2px solid #3884cc' : '1px solid gray'}
                        boxShadow={selectedCategories.includes(category.category_id) ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none'}
                      >
                        {category.category_name}
                      </Button>
                    </WrapItem>
                  ))}
                </Wrap>
              </ModalBody>

              <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={applyCategoryFilter}>
                Apply
              </Button>
              <Button onClick={handleCloseModal}>
                Close
              </Button>
            </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
        <Box>
          {filterCourses.map((course) => (
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
                      <Flex align="center" mt={2} display={course.course_rating === 0 ? "none" : "flex"}>
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