import Layout from "@/components/layout";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  VStack,
  UnorderedList,
  ListItem,
  Flex,
  Divider,
} from "@chakra-ui/react";

import PeoplePlaceholder from "@/assets/images/people-placeholder.png";
import MeiAnnisa from "@/assets/images/Mei-Annisa.webp"

const AboutUs = () => {
  return (
    <Layout>
      <Box px={{ base: 4, md: 8 }} py={6}>
        {/* Pembatasan Lebar Konten */}
        <Box maxW="1000px" mx="auto">
          <Heading as="h1" size="xl" mb={6} textAlign="center">
            About Us
          </Heading>
          <VStack spacing={8} align="stretch">
            {/* Introduction */}
            <Box 
              backgroundColor="#CDE5FB"
              borderRadius="xl"
              p={6}
              boxShadow="sm"
              >
                <Text fontSize="lg" textAlign="justify" mb={6}>
                The online learning platform designed by Skillbridge is a modern
                solution for developing various skills, ranging from technology,
                business, and design to personal development. With instructors from
                world-renowned universities and industry experts, you will gain
                in-depth insights, innovative teaching methods, and materials that
                align with the latest trends.
                </Text>
                <Text fontSize="lg" textAlign="justify" mb={6}>
                The interactive courses offered include learning videos, quizzes,
                practical projects, and community discussions, allowing you to
                immediately apply what you've learned. The flexibility of study
                schedules enables you to access materials anytime and anywhere,
                making it suitable for students, professionals, and individuals
                seeking continuous growth.
                </Text>
                <Text fontSize="lg" textAlign="justify">
                In addition to skill-based courses, this platform also provides
                exclusive tips on pursuing further education, securing
                scholarships, and building a career abroad.
                </Text>
            </Box>

            {/* Vision & Mission */}
            <Box 
              backgroundColor="#CDE5FB"
              borderRadius="xl"
              p={6}
              boxShadow="sm"
              >
              <Heading as="h2" size="lg" mb={4}>
                Vision:
              </Heading>
              <Text fontSize="lg" textAlign="justify" mb={8}>
                To become a leading global learning platform that equips
                individuals with relevant skills and international insights for
                success in the digital era and global competition.
              </Text>
              <Heading as="h2" size="lg" mb={4}>
                Mission:
              </Heading>
              <VStack align="start" spacing={4}>
                <Flex alignItems="center">
                  <Text fontWeight="bold" color="blue.500" mr={2}>
                    🌟
                  </Text>
                  <Text fontSize="lg">Providing High-Quality Learning Courses</Text>
                </Flex>
                <Flex alignItems="center">
                  <Text fontWeight="bold" color="blue.500" mr={2}>
                    💼
                  </Text>
                  <Text fontSize="lg">Offering Career Guidance</Text>
                </Flex>
                <Flex alignItems="center">
                  <Text fontWeight="bold" color="blue.500" mr={2}>
                    🌍
                  </Text>
                  <Text fontSize="lg">Building a Global Community</Text>
                </Flex>
              </VStack>
            </Box>

            {/* Strengths */}
            <Box 
              backgroundColor="#CDE5FB"
              borderRadius="xl"
              p={6}
              boxShadow="sm"
              >
              <Heading as="h2" size="lg" mb={4}>
                Our Strengths:
              </Heading>
              <Box>
                <Box mb={4}>
                  <Flex alignItems="center">
                    <Text mr={2}>📚</Text>
                    <Box>
                      <Text fontWeight="bold">World-Class Instructors:</Text>
                      <Text fontSize="lg">
                        Learn directly from professors at prestigious universities and global
                        industry experts with extensive experience and international reputations.
                      </Text>
                    </Box>
                  </Flex>
                </Box>
                <Divider />
                <Box my={4}>
                  <Flex alignItems="center">
                    <Text mr={2}>🛠️</Text>
                    <Box>
                      <Text fontWeight="bold">Wide Range of Courses:</Text>
                      <Text fontSize="lg">
                        Access various skill categories, including technology, business, arts, and
                        personal development, designed to meet both professional and personal needs.
                      </Text>
                    </Box>
                  </Flex>
                </Box>
                <Divider />
                <Box my={4}>
                  <Flex alignItems="center">
                    <Text mr={2}>🎓</Text>
                    <Box>
                      <Text fontWeight="bold">Guidance for International Studies and Careers:</Text>
                      <Text fontSize="lg">
                        Receive exclusive tips on pursuing further education, securing scholarships,
                        and building a career abroad.
                      </Text>
                    </Box>
                  </Flex>
                </Box>
                <Divider />
                <Box my={4}>
                  <Flex alignItems="center">
                    <Text mr={2}>🌍</Text>
                    <Box>
                      <Text fontWeight="bold">Global Community:</Text>
                      <Text fontSize="lg">
                        Engage with learners worldwide to share insights and expand your network.
                      </Text>
                    </Box>
                  </Flex>
                </Box>
                <Divider />
                <Box my={4}>
                  <Flex alignItems="center">
                    <Text mr={2}>📈</Text>
                    <Box>
                      <Text fontWeight="bold">Up-to-Date with Industry Trends:</Text>
                      <Text fontSize="lg">
                        The materials are constantly updated to stay relevant to job market demands
                        and the latest trends in the field.
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Box>

            {/* Teams and Founder Section */}
            <Box>
              <Heading as="h2" size="lg" mb={10} textAlign="center">
                Teams and Founder
              </Heading>
              <SimpleGrid
                columns={{ base: 1, md: 3 }}
                spacing={6}
                justifyItems="center"
                mb={8}
              >
                {/* Elemen Baris Pertama */}
                <VStack
                    transition="transform 0.3s ease" // Tambahkan transition untuk animasi
                    _hover={{
                    transform: "scale(1.1)", // Zoom in saat dihover
                    }}
                >
                  <Box
                    boxSize="200px"
                    borderRadius="full"
                    overflow="hidden"
                    bg="gray.200"
                    
                  >
                    <Image
                      src={PeoplePlaceholder}
                      alt="Chandra Tri Wardana"
                      objectFit="cover"
                    />
                  </Box>
                  <Text fontWeight="bold">Chandra Tri Wardana</Text>
                  <Text color="gray.500">Manager Marketing</Text>
                </VStack>
                <VStack
                    transition="transform 0.3s ease" // Tambahkan transition untuk animasi
                    _hover={{
                      transform: "scale(1.1)", // Zoom in saat dihover
                    }}
                >
                  <Box
                    boxSize="200px"
                    borderRadius="full"
                    overflow="hidden"
                    bg="gray.200"
                  >
                    <Image
                      src={MeiAnnisa}
                      alt="Mei Annisa"
                      objectFit="cover"
                    />
                  </Box>
                  <Text fontWeight="bold">Mei Annisa</Text>
                  <Text color="gray.500">Direktur Skillbridge</Text>
                </VStack>
                <VStack
                    transition="transform 0.3s ease" // Tambahkan transition untuk animasi
                    _hover={{
                      transform: "scale(1.1)", // Zoom in saat dihover
                    }}
                >
                  <Box
                    boxSize="200px"
                    borderRadius="full"
                    overflow="hidden"
                    bg="gray.200"
                  >
                    <Image
                      src={PeoplePlaceholder}
                      alt="Rizka Savira"
                      objectFit="cover"
                    />
                  </Box>
                  <Text fontWeight="bold">Rizka Savira</Text>
                  <Text color="gray.500">Finance & General Adm</Text>
                </VStack>
              </SimpleGrid>

              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={6}
                justifyItems="center"
                mx="auto"
                width={{ base: "100%", md: "60%" }}
              >
                <VStack
                    transition="transform 0.3s ease" // Tambahkan transition untuk animasi
                    _hover={{
                      transform: "scale(1.1)", // Zoom in saat dihover
                    }}
                >
                  <Box
                    boxSize="200px"
                    borderRadius="full"
                    overflow="hidden"
                    bg="gray.200"
                  >
                    <Image
                      src={PeoplePlaceholder}
                      alt="Rangga Bani Nugraha"
                      objectFit="cover"
                    />
                  </Box>
                  <Text fontWeight="bold">Rangga Bani Nugraha</Text>
                  <Text color="gray.500">Digital Marketing</Text>
                </VStack>
                <VStack
                    transition="transform 0.3s ease" // Tambahkan transition untuk animasi
                    _hover={{
                      transform: "scale(1.1)", // Zoom in saat dihover
                    }}
                >
                  <Box
                    boxSize="200px"
                    borderRadius="full"
                    overflow="hidden"
                    bg="gray.200"
                  >
                    <Image
                      src={PeoplePlaceholder}
                      alt="Leandara Refitri Listianty"
                      objectFit="cover"
                    />
                  </Box>
                  <Text fontWeight="bold">Leandara Refitri Listianty</Text>
                  <Text color="gray.500">Digital Marketing</Text>
                </VStack>
              </SimpleGrid>
            </Box>

            {/* Location */}
            <Box 
              backgroundColor="#CDE5FB"
              borderRadius="xl"
              p={6}
              boxShadow="sm"
              >
              <Heading as="h2" size="lg" mb={4}>
                Location:
              </Heading>
              <Text fontSize="lg" textAlign="justify">
                Kawasan Grage City Biz Center Oasis Blok A VII No. 9, Pegambiran,
                Lemahwungkuk, Kota Cirebon, Jawa Barat 45113
              </Text>
            </Box>

            {/* Tambahan Teks */}
            <Box mt={6}>
              <Text fontSize="lg" fontWeight="bold" textAlign="center">
                Enhance your skills with guidance from experienced instructors.
                You’re not just learning—you’re unlocking new opportunities for
                your future!
              </Text>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Layout>
  );
};

export default AboutUs;
