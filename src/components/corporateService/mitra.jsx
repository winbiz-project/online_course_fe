import { Flex, Image, Text } from "@chakra-ui/react";
import img_pertamina from "@/assets/images/mitra-pertamina.png";

const Mitra = () => {

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
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          Mitra Materials
        </Text>
        <Text fontSize={"lg"} width={"50%"} textAlign={"center"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          maiores praesentium deleniti animi consectetur et aliquid nostrum ab
          odio corporis aliquam dolores nobis, perspiciatis necessitatibus harum
          quidem enim, blanditiis, laborum nihil. Voluptate molestias ipsa
          voluptatum est dicta, debitis eligendi laborum, quam ad sunt
          reprehenderit impedit dolorum vero inventore iure omnis saepe
          praesentium suscipit culpa minus sed.
        </Text>
        <Flex
          direction="row"
          justifyContent="center"
          alignItems="center"
          px={"20"}
          py={"10"}
          gap={"10"}
            >
                <Image src={img_pertamina} width={"100%"} />
                <Image src={img_pertamina} width={"100%"} />
                <Image src={img_pertamina} width={"100%"} />
                <Image src={img_pertamina} width={"100%"} />
                <Image src={img_pertamina} width={"100%"} />
                <Image src={img_pertamina} width={"100%"} />
                <Image src={img_pertamina} width={"100%"} />
        </Flex>
      </Flex>
    );
};

export default Mitra;
