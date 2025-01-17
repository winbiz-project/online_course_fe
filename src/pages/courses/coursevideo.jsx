import Layout from '@/components/layout';
import React, {useState, useEffect, useContext} from 'react';
import { Box, Image, Text, Badge, Button, Divider, Heading, Center, Tag, Flex, Spinner,
    VStack, HStack, Container, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Link, 
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, IconButton } from '@chakra-ui/react';
import { useParams, useSearchParams, useLocation, useNavigate  } from "react-router-dom";
import ReactPlayer from 'react-player';
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';
import config from '@/config';
import swal from 'sweetalert2';
import generateSlug from '@/routes/generateslug';
import AuthContext from '@/routes/authcontext';

function CourseVideo() {
  const baseUrl = config.apiBaseUrl;
  const [searchParams] = useSearchParams();
  const sectionIndex = searchParams.get('section');
  const { user } = useContext(AuthContext);

  const location = useLocation();
  const { courseSlug, subsectionSlug } = useParams();
  const courseId = location.state?.courseId;
  const subsectionId = location.state?.subsectionId;
  const [hasAccess, setHasAccess] = useState(null);
  const [isValid, setIsValid] = useState(null);
  
  const [courseDetail, setCourseDetail] = useState({});
  const [sectionName, setSectionName] = useState('');
  const [sectionList, setSectionList] = useState([]);
  const [subsectionList, setSubsectionList] = useState([]);
  const [subsectionIdx, setSubsectionIdx] = useState(0);
  const [subsectionName, setSubsectionName] = useState('');
  const [quizList, setQuizList] = useState([]);
  const [subsectionVid, setSubsectionVid] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courseAvail, setCourseAvail] = useState(false)
  const navigate = useNavigate();

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
      setQuizList(data.response.sections[sectionIndex].quizzes)

      let idx = 0;
      data.response.sections[sectionIndex].subsections.forEach((subsection, i) => {
        if (subsection.subsection_id === parseInt(subsectionId)) {
          setSubsectionIdx(idx);
        }
        idx += 1;
      });
      setCourseAvail(true);
    } catch (error) {
      console.error(`Could not get courses: ${error}`);
    }
  };

  const getVideo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/course/get_sub_section_details/${subsectionId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSubsectionVid(data);
        setSubsectionName(data.sub_section_title);
        setLoading(false);
    }
    catch (error) {
        console.error(`Could not get courses: ${error}`);
    }
  }

  const handleOnEndedVideo = async () => {
    try {
      const response = await fetch(`${baseUrl}/course/add_subsection_progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          courseid : courseId,
          subsectionid: subsectionId,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
    } catch (error) {
      console.error(`Could not get courses: ${error}`);
    }
  };


  const renderNextButton = () => {
    // Jika belum di subseksi terakhir, lanjutkan ke subseksi Next
    if (subsectionIdx < subsectionList.length - 1) {
      const nextSubsectionSlug = generateSlug(subsectionList[subsectionIdx + 1].subsection_name);
      return (
        <Box
          as="button"
          display="flex"
          alignItems="center"
          onClick={() => navigate(`/e-learning/${courseSlug}/${nextSubsectionSlug}?section=${sectionIndex}`, {
        state: {
          courseId: courseId,
          subsectionId: subsectionList[subsectionIdx + 1].subsection_id
        }
          })}
        >
          <Text fontWeight="bold">Next</Text>
          <ChevronRightIcon boxSize={5} />
        </Box>
      );
    }

    // Jika di </Box>subseksi terakhir dan ada kuis, navigasi ke halaman kuis
    if (quizList && quizList.length > 0) {
      return (
        <Box
          as="button"
          display="flex"
          alignItems="center"
          onClick={() => navigate(`/e-learning/${courseId}/quiz/${quizList[0].quiz_id}/start?section=${sectionIndex}`)}
        >
          <Text fontWeight="bold">Next</Text>
          <ChevronRightIcon boxSize={5} />
        </Box>
      );
    }

    // Jika tidak ada kuis, dan sudah di subsection terakhir pada section dan masih ada section selanjutnya
    if (parseInt(sectionIndex) !== sectionList.length-1){
      return (
        <Box
            as="button"
            display="flex"
            alignItems="center"
            onClick={() => navigate(`/e-learning/${courseId}/${subsectionList[subsectionIdx + 1].subsection_id}?section=${sectionIndex+1}`)}
          >
            <Text fontWeight="bold">Next</Text>
            <ChevronRightIcon boxSize={5} />
          </Box>
      );
      
    }

    return(
      <Box as='span'>
      </Box>
    )
  };

  const validateCourseAccess = async () => {
    try {
      if (courseId) {
        const enrollmentResponse = await fetch(`${baseUrl}/course/check_user_enrolled/` + user.email + '/' + courseId);
        if (!enrollmentResponse.ok) {
          throw new Error('Failed to check enrollment status');
        }
        const enrollmentData = await enrollmentResponse.json();
        setHasAccess(enrollmentData.response);
  
        if (!enrollmentData.response) {
          swal.fire({
            title: 'Access Denied',
            icon: 'warning',
            text: 'You need to purchase the course to access the page',
            timer: 6000,
            timerProgressBar: true,
            showConfirmButton: false,
            showCloseButton: true,
          });
          return navigate(`/e-learning`);
        }
      } else {
        setHasAccess(false);
        swal.fire({
          title: 'Access Denied',
          icon: 'warning',
          timer: 6000,
          timerProgressBar: true,
          showConfirmButton: false,
          showCloseButton: true,
        });
        return navigate(`/e-learning`);
      }
  
      // Validate the subsection details
      if (subsectionId) {
        const subsectionResponse = await fetch(`${baseUrl}/course/get_sub_section_details/${subsectionId}`);
        if (!subsectionResponse.ok) {
          throw new Error(`HTTP error! status: ${subsectionResponse.status}`);
        }
  
        const subsectionData = await subsectionResponse.json();
  
        if (subsectionData.course_origin_id === parseInt(courseId)) {
          setIsValid(true);
        } else {
          setIsValid(false);
          swal.fire({
            title: "Course Video Doesn't Exist",
            icon: "error",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
          });
          return navigate(`/e-learning`);
        }
      } else {
        setIsValid(false);
        swal.fire({
          title: "Course Video Doesn't Exist",
          icon: "error",
          toast: true,
          timer: 6000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
        return navigate(`/e-learning`);
      }
    } catch (error) {
      console.error('Error:', error);
      swal.fire({
        title: 'An error occurred',
        icon: 'error',
        text: error.message,
        timer: 6000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
      });
      navigate(`/e-learning`);
    }
  };

  useEffect(() => {
    validateCourseAccess();
    getCourseDetail();
    getVideo();

  }, [subsectionId]);


return (
  <Layout>
    { loading && !courseAvail &&
      <Flex justify="center" align="center" height={{ base: "200px", md: "900px" }}>
        <Spinner size="xl" />
      </Flex>
    }
    
    {!loading && courseAvail &&
      <Box position="relative" height="auto" pb={5}>
        <Flex direction="row" justifyContent="space-between" height={{ base:"auto", md: "120vh" }} overflow="hidden">
          <Flex direction="column" width={sidebarOpen ? {base: "100%", md: '75%'} : "100%"} transition="width 0.3s ease">          
            
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
                  <BreadcrumbLink
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/e-learning/${courseSlug}`, {
                        state: { courseId: courseId },
                      });
                    }}
                    fontSize={{ base: 'sm', md: 'md' }}
                    >
                    {sectionName}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <Text fontSize={{base: 'sm', md: 'md'}}>{subsectionName}</Text>
                </BreadcrumbItem>
                </Breadcrumb>

                <Flex alignItems="center" justifyContent="space-between" mb={4} width={{ base: "150px", md: "250px" }}>
                {/* {subsectionIdx == 0 ? (
                  <Box as='span'>
                  </Box>
                ) : (
                  <Box
                  as="button"
                  display="flex"
                  alignItems="center"
                  onClick={() => navigate(`/e-learning/${courseSlug}/${generateSlug(subsectionList[subsectionIdx-1].subsection_name)}?section=${sectionIndex}`, {
                    state: { courseId: courseId },
                    subsectionId: subsectionList[subsectionIdx-1].subsection_id,
                  })}
                  >
                    <ChevronLeftIcon boxSize={5}/>
                    <Text fontSize={{base: 'xs', md: 'md'}} fontWeight="bold">Previous</Text>
                  </Box>
                )} */}

                {/* Tombol Berikutnya */}
                {/* {renderNextButton()} */}
              </Flex>
            </Flex>
            
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={4} ml={5}>{subsectionName}</Text>

            {/* Loading Spinner */}
            {loading && (
                <Flex justify="center" align="center" height={{ base: "200px", md: "900px" }} backgroundColor={'#000'} borderRadius="4px" overflow="hidden" boxShadow="0 0 20px rgba(0,0,0,0.5)">
                  <Spinner size="xl" color="white" />
                </Flex>
            )}
            
            {/* Container Video */}
            {!loading && (
              <Box backgroundColor="#000" borderRadius="4px" overflow="hidden" boxShadow="0 0 20px rgba(0,0,0,0.5)">
                <ReactPlayer
                  key={subsectionVid.sub_section_video}
                  url={subsectionVid.sub_section_video}
                  playing
                  width="100%"
                  height="100%"
                  onEnded={handleOnEndedVideo}
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
              <Text fontSize={'xl'} as={'b'}>Video Description</Text>
              <Text mt={4}>
                {subsectionVid.sub_section_desc}
              </Text>
            </Box>
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
              zIndex={10}
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
                          
                          {subsection.subsection_name == subsectionName ? (
                            <Box>
                              <Box
                                as="button"
                                width="100%"
                                p={2}
                                backgroundColor={'#EBEBEB'}
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
                          )}
                          
                        </React.Fragment>
                      ))}

                      {section.quizzes && section.quizzes.length > 0 && (
                        <>
                          {section.quizzes.map((quiz, index) => (
                            <React.Fragment key={quiz.quiz_id}>
                                <Box>
                                  <Box
                                    as="button"
                                    width="100%"
                                    p={2}
                                    onClick={() =>
                                      navigate(`/e-learning/${courseSlug}/quiz/${quiz.quiz_id}/start?section=${idxSection}`, {
                                        state: { courseId: courseId },
                                      })
                                    }
                                    _hover={{ bg: "#EBEBEB" }}
                                    textAlign="left"
                                  >
                                    <Text color="black">{'[Quiz]'} {quiz.quiz_title}</Text>
                                  </Box>
                                  <Divider mt={'0'} />
                              </Box>
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
        </Flex>

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
      </Box>
    }

  </Layout>
);
}

export default CourseVideo;