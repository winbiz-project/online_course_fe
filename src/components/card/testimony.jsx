import { Card, CardBody, CardFooter, Heading, Image, Stack, Text, Box, Flex, Avatar, Icon } from "@chakra-ui/react";
import { StarIcon, ChevronRightIcon } from '@chakra-ui/icons';

const CardTestimony = ({ review }) => {
    return (
            <Box
                key={review.review_id}
                mb="6"
                p="4"
                borderWidth="1px"
                borderRadius="lg"
                backgroundColor={'white'}
                minHeight="250px"
                maxHeight="350px"
                maxW='400px'
              >
                <Flex mb="4">
                    <Text as={'b'}>
                        {review.course_origin}
                    </Text>
                </Flex>
                <Flex alignItems="center" mb="2">
                  <Avatar name={review.review_user} size="sm" mr="2" />
                  <Text fontWeight="bold">{review.review_user}</Text>
                  <Flex alignItems="center" ml="4">
                    {[...Array(5)].map((_, i) => (
                        <Icon
                        key={i}
                        as={StarIcon}
                        color={
                            i < Math.round(parseFloat(review.review_rating))
                            ? "yellow.400"
                            : "gray.300"
                        }
                        />
                    ))}
                    </Flex>
                </Flex>
  
                
  
                <Text>{review.review_text}</Text>
              </Box>
    );
};

export default CardTestimony;
