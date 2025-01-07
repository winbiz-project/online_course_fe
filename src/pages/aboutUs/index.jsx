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
} from "@chakra-ui/react";

import PeoplePlaceholder from "@/assets/images/people-placeholder.png";

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
            <Text fontSize="lg" textAlign="justify">
              The online learning platform designed by Skillbridge is a modern
              solution for developing various skills, ranging from technology,
              business, and design to personal development. With instructors from
              world-renowned universities and industry experts, you will gain
              in-depth insights, innovative teaching methods, and materials that
              align with the latest trends.
            </Text>
            <Text fontSize="lg" textAlign="justify">
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

            {/* Vision & Mission */}
            <Box>
              <Heading as="h2" size="lg" mb={4}>
                Vision:
              </Heading>
              <Text fontSize="lg" textAlign="justify">
                To become a leading global learning platform that equips
                individuals with relevant skills and international insights for
                success in the digital era and global competition.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" size="lg" mb={4}>
                Mission:
              </Heading>
              <UnorderedList spacing={2} fontSize="lg">
                <ListItem>Providing High-Quality Learning Courses</ListItem>
                <ListItem>Offering Career Guidance</ListItem>
                <ListItem>Building a Global Community</ListItem>
              </UnorderedList>
            </Box>

            {/* Strengths */}
            <Box>
              <Heading as="h2" size="lg" mb={4}>
                Our Strengths:
              </Heading>
              <UnorderedList spacing={4} fontSize="lg">
                <ListItem>
                  <Text fontWeight="bold">World-Class Instructors:</Text> Learn
                  directly from professors at prestigious universities and global
                  industry experts with extensive experience and international
                  reputations.
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Wide Range of Courses:</Text> Access
                  various skill categories, including technology, business, arts,
                  and personal development, designed to meet both professional and
                  personal needs.
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">
                    Guidance for International Studies and Careers:
                  </Text>{" "}
                  Receive exclusive tips on pursuing further education, securing
                  scholarships, and building a career abroad.
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Global Community:</Text> Engage with
                  learners worldwide to share insights and expand your network.
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Up-to-Date with Industry Trends:</Text>{" "}
                  The materials are constantly updated to stay relevant to job
                  market demands and the latest trends in the field.
                </ListItem>
              </UnorderedList>
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
                <VStack>
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
                <VStack>
                  <Box
                    boxSize="200px"
                    borderRadius="full"
                    overflow="hidden"
                    bg="gray.200"
                  >
                    <Image
                      src={PeoplePlaceholder}
                      alt="Mei Annisa"
                      objectFit="cover"
                    />
                  </Box>
                  <Text fontWeight="bold">Mei Annisa</Text>
                  <Text color="gray.500">Direktur Skillbridge</Text>
                </VStack>
                <VStack>
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
                <VStack>
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
                <VStack>
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
                  <Text fontWeight="bold">Leandra Refitri Listianty</Text>
                  <Text color="gray.500">Digital Marketing</Text>
                </VStack>
              </SimpleGrid>
            </Box>

            {/* Location */}
            <Box>
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
