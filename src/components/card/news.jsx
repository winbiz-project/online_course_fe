import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"

import LogoSkillbridge from "@/assets/images/logo_SkillBridge.png";
import quote from "@/assets/images/quote.svg";

const CardNews = ({ news }) => {
    return (
        <Card maxW='sm' borderRadius={15}>
            <CardHeader>
                <Flex justifyContent='flex-end'>
                    <Image src={LogoSkillbridge} alt="Brand Logo" objectFit="cover" width={"50px"} />
                </Flex>
            </CardHeader>
            <CardBody>
                <Stack spacing='3'>
                    <Image src={quote} alt='quote' width={"50px"} />
                    <Heading size='md' color={"#108EE9"}>Jadi Copywriter & Content Creator karena Belajar di E-Learning SkillBridge</Heading>
                    <Image
                        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                </Stack>
            </CardBody>
            <CardFooter>
                <Button variant='solid' colorScheme='blue'width={"100%"}>
                   Baca Berita
                </Button>
            </CardFooter>
        </Card >
    )
}

export default CardNews