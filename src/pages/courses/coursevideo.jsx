import Layout from '@/components/layout';
import React, {useState, useEffect} from 'react';
import { Box, Image, Text, Badge, Button, Divider, Heading, Center, Tag, Flex, Spinner,
    VStack, HStack, Container, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Link, 
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, IconButton } from '@chakra-ui/react';
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from "react-router-dom";

function CourseVideo() {
  const location = useLocation();
  const { subsectionName, sectionName, sectionId, courseDetail } = location.state || {};
  const { courseId, courseSubsectionId } = useParams();
  const [subsectionIds, setSubsectionIds] = useState([]);
  const [subsectionList, setSubsectionList] = useState({});
  const [videoDesc, setVideoDesc] = useState('');
  const [video, setVideo] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const getVideo = async () => {
    setLoading(true);
    try {
      setVideo(subsectionList[courseSubsectionId].sub_section_video);
      setVideoDesc(subsectionList[courseSubsectionId].sub_section_desc);
      // const response = await fetch('https://online-course-be.vercel.app/course/get_sub_section_video/'+courseSubsectionId);
      //   if (!response.ok) {
      //       throw new Error(`HTTP error! status: ${response.status}`);
      //   }
      //   const data = await response.json();
      //   setVideo(data.response)
    }
    catch (error) {
        console.error(`Could not get courses: ${error}`);
    } finally {
      setLoading(false);  // Hide loading spinner
    }

  }

  const getSection = async () => {
    try{
      const response = await fetch('https://online-course-be.vercel.app/course/get_sub_section_on_section/'+sectionId);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();       
        setSubsectionList(data['Sub section']);
        setSubsectionIds(Object.keys(data['Sub section']));
    } catch (error) {
      console.error(`Could not get courses: ${error}`);
    } 

  }

  useEffect(() => {
    getSection();
  }, [sectionId]);

  // useEffect(() => {
  //   console.log(subsectionList);
  //   console.log(subsectionIds);
  // }, [subsectionList, subsectionIds])

  useEffect(() => {
      getVideo();
    }, [subsectionList, courseSubsectionId]);


return (
  <Layout>
    <Box position="relative" height="auto" pb={5}>
      <Flex direction="row" justifyContent="space-between" height={"120vh"} overflow="hidden">
        <Flex direction="column" width={sidebarOpen ? "75%" : "100%"} transition="width 0.3s ease">          
          
          <Flex
            justifyContent="space-between"
            p={5}
          >
            <Breadcrumb separator={<ChevronRightIcon color="gray.500" />} mb={4}>
              <BreadcrumbItem>
                <BreadcrumbLink href="/mycourses" display="flex" alignItems="center">
                  <Text fontSize={{base: 'sm', md: 'md'}}>Home</Text>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href={`/e-learning/${courseId}`} fontSize={{base: 'sm', md: 'md'}}>{sectionName}</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <Text fontSize={{base: 'sm', md: 'md'}}>{subsectionName}</Text>
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
                      subsectionName: subsectionList[courseSubsectionId].subsection_name,
                      sectionName:sectionName,
                      sectionId: sectionId,
                      courseDetail: courseDetail,
                    },
                  })}
                >
                  <ChevronLeftIcon boxSize={5}/>
                  <Text fontSize={{base: 'sm', md: 'md'}} fontWeight="bold">Sebelumnya</Text>
                </Box>
              )}
              {subsectionIndex == subsectionLength-1? (
                <Box
                  as="button"
                  display="flex"
                  alignItems="center"
                  onClick={() => navigate(`/e-learning/quiz/${subsectionList[subsectionIndex+1].subsection_id}`, {
                    state: {
                      subsectionName: subsectionList[subsectionIndex+1].subsection_name,
                      sectionName:sectionName,
                      courseDetail: courseDetail,
                    },
                  })}
                >
                  <Text fontSize={{base: 'sm', md: 'md'}}  fontWeight="bold">Berikutnya</Text>
                  <ChevronRightIcon boxSize={5} />
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
                    },
                  })}
                >
                  <Text fontWeight="bold">Berikutnya</Text>
                  <ChevronRightIcon boxSize={5} />
                </Box>
              )}
              
            </Flex> */}
          </Flex>

          <Text fontSize="2xl" fontWeight="bold" mb={4} ml={5}>{subsectionName}</Text>

          {/* Loading Spinner */}
          {loading && (
              <Flex justify="center" align="center" height="900px" backgroundColor={'#000'} borderRadius="4px" overflow="hidden" boxShadow="0 0 20px rgba(0,0,0,0.5)">
                <Spinner size="xl" color="white" />
              </Flex>
          )}
          
          {/* Container Video */}
          {!loading && (
            <Box backgroundColor="#000" borderRadius="4px" overflow="hidden" boxShadow="0 0 20px rgba(0,0,0,0.5)">
              <ReactPlayer
                url={video}
                playing
                width="100%"
                height="100%"
                controls
                config={{
                  file: {
                    attributes: {
                      onContextMenu: e => e.preventDefault(),
                      controlsList: 'nodownload'  // mencegah pengguna mendownload video
                    }
                  }
                }}
              />
            </Box>
          )}

          {/* Container Deskripsi */}
          <Box mt={4} p={5} bg="white">
            <Text fontSize={'xl'} as={'b'}>Deskripsi Video</Text>
            <Text mt={4}>
              {videoDesc}
            </Text>
          </Box>
        </Flex>

        {/* Sidebar */}
        {sidebarOpen && (
          <Box
            position="absolute"
            top={0}
            right={0}
            width="25%"
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
                        
                        {subsection.subsection_name == subsectionName ? (
                          <Box>
                            <Box
                              as="button"
                              width="100%"
                              p={2}
                              backgroundColor={'#EBEBEB'}
                              onClick={() =>
                                navigate(`/e-learning/${courseId}/${subsection.subsection_id}`, {
                                  state: { 
                                    subsectionName: subsection.subsection_name,
                                    sectionName: section.section_name,
                                    sectionId: section.section_id,
                                    courseDetail: courseDetail,
                                  },
                                })
                              }
                              _hover={{ bg: "#EBEBEB" }}
                              textAlign="left"
                            >
                              <Text color="black">{subsection.subsection_name}</Text>
                            </Box>
                            <Divider mt={'0 '} />
                          </Box>
                        )
                        :
                        (
                          <Box>
                            <Box
                              as="button"
                              width="100%"
                              p={2}
                              onClick={() =>
                                navigate(`/e-learning/${courseId}/${subsection.subsection_id}`, {
                                  state: { 
                                    subsectionName: subsection.subsection_name,
                                    sectionName: section.section_name,
                                    sectionId: section.section_id,
                                    courseDetail: courseDetail,
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
                        )}
                        
                      </React.Fragment>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              ))}
              </Accordion>
            </VStack>
          </Box>
        )}
      </Flex>

      {/* Button Sidebar */}
      <Box
        position="absolute"
        top="20%"
        right={sidebarOpen? "25%": "0"}
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
    </Box>
  </Layout>
);
}

export default CourseVideo;