// import { Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";

// const CardTestimony = ({ testimony }) => {
//     const { title, description, material, image } = testimony;
//     return (
//         <Card
//             direction={{ base: 'column', sm: 'row' }}
//             overflow='hidden'
//             variant='outline'
//             borderRadius={"15px"}
//             px={"8"}
//             py={"4"}
//         >
            
//             <Image
//                 objectFit='cover'
//                 src={image}
//                 alt={title}
//                 height={{ base: "250px", sm: '100%' }}
//                 borderRadius={"15px"}
//             />

//             <Stack>
//                 <CardBody>
//                     <Heading size='md'>{title}</Heading>
//                     <Text py='2'>
//                         {description}
//                     </Text>
//                 </CardBody>

//                 <CardFooter>
//                     <Text fontSize='md' fontWeight='bold'>
//                         {material}
//                     </Text>
//                 </CardFooter>
//             </Stack>
//         </Card>
//     )
// }

// export default CardTestimony

import { Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";

const CardTestimony = ({ testimony }) => {
    const { title, description, material, image } = testimony;
    return (
        <Card
            direction={{ base: "column", md: "column", lg: "row" }}
            overflow="hidden"
            variant="outline"
            borderRadius="15px"
            px={{ base: "4", md: "8" }}
            py={{ base: "2", md: "4" }}
        >
            <Image
                objectFit="cover"
                src={image}
                alt={title}
                height={{ base: "250px", md: "100%" }}
                borderRadius="15px"
            />
            <Stack spacing={4} mt={{ base: "4", md: "0" }}>
                <CardBody>
                    <Heading size="md">{title}</Heading>
                    <Text py="2">
                        {description}
                    </Text>
                </CardBody>
                <CardFooter>
                    <Text fontSize="md" fontWeight="bold">
                        {material}
                    </Text>
                </CardFooter>
            </Stack>
        </Card>
    );
};

export default CardTestimony;
