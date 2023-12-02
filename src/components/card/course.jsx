import { Card, CardBody, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";

import entertainment from "@/assets/images/entertainment.svg";
import people from "@/assets/images/people.svg";
import star from "@/assets/images/star.svg";

const CardCourse = ({ course }) => {
    const { title, image, countVideos,users, rating } = course;

    return (
        <Card maxW='sm' borderRadius={"20px"}>
            <Image
                src={image}
                alt={title}
                borderTopRadius='20px'
            />
            <CardBody>
                <Heading size='md'>{title}</Heading>
                <Stack mt='6' spacing='3'>
                    <Flex justifyContent='flex-start'>
                        <Image src={entertainment} alt='star' me={"3"} />
                        <Text fontSize='sm' fontWeight='bold'>
                            {countVideos} Videos
                        </Text>
                    </Flex>
                    <Flex justifyContent='flex-start'>
                        <Image src={people} alt='star' me={"3"} />
                        <Text fontSize='sm' fontWeight='bold'>
                            {users}
                        </Text>
                    </Flex>
                    <Flex justifyContent='flex-start'>
                        <Image src={star} alt='star' me={"3"} />
                        <Text fontSize='sm' fontWeight='bold'>
                            {rating}/5
                        </Text>
                    </Flex>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default CardCourse