import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import CardCourse from "../card/course";

import flyinGirl from "@/assets/images/Flyin Girl.png";
import { FaAngleRight } from "react-icons/fa6";

const Course = () => {
    const course = {
        title: "Copywriting Introduction",
        image: flyinGirl,
        countVideos: 12,
        users: 1200,
        rating: 4.5,
    };

    return (
        <Flex
            direction={"column"}
            width={"100%"}
            height={"fit-content"}
            px={"20"}
            py={"10"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Text fontSize={"4xl"} fontWeight={"semibold"}>
                Course Terbaru
            </Text>
            <Flex justifyContent={"center"} alignItems={"center"} width={"100%"}>
                {/* <Text className="whitespace-nowrap" fontSize={"2xl"} fontWeight={"bold"}>Javascript Programmer</Text> */}
                <Divider borderColor={"#108EE9"} borderBottomWidth={"2px"} orientation="horizontal" width={"100%"} mx={4}/>
                <Button
                    my={4}
                    py={2}
                    bgColor={"#108EE9"}
                    color={"white"}
                    size="lg"
                    width={"250px"}
                >
                    Selengkapnya <FaAngleRight />
                </Button>
            </Flex>
            <Flex
                direction="row"
                justifyContent="center"
                alignItems="center"
                px={"20"}
                py={"10"}
                gap={"3"}
            >
                <CardCourse course={course} />
                <CardCourse course={course} />
                <CardCourse course={course} />
                <CardCourse course={course} />
                <CardCourse course={course} />
            </Flex>
        </Flex>
    );
};

export default Course;
