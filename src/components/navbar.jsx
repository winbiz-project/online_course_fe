import React from 'react'
import { Flex, Box, Button } from '@chakra-ui/react'
import LogoSkillbridge from './LogoSkillbridge'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            paddingX={{ base: '2rem', md: '4rem' }}
            bg="#5D8DCF"
            color="white"
        >
            <Box>
                {/* Logo */}
                <LogoSkillbridge />
            </Box>
            <Box
                display={{ base: 'none', md: 'flex' }}
                width={{ base: 'full', md: 'auto' }}
                alignItems="center"
                justifyContent="flex-end"
                flexGrow={1}
            >
                {/* Navigation Links */}
                <Box>
                    <Button as={Link} to="/" colorScheme="white" variant="link" mx={2} isActive={() => location.pathname === '/'}>
                        Home
                    </Button>
                    <Button as={Link} to="/e-learning" colorScheme="white" variant="link" mx={2} isActive={() => location.pathname === '/e-learning'}>
                        E-Learning
                    </Button>
                    <Button as={Link} to="/corporate-service" colorScheme="white" variant="link" mx={2} isActive={() => location.pathname === '/corporate-service'}>
                        Corporate Service
                    </Button>
                    <Button as={Link} to="/blog" colorScheme="white" variant="link" mx={2} isActive={() => location.pathname === '/blog'}>
                        Blog
                    </Button>
                </Box>
                {/* Login and Register Buttons */}
                <Box>
                    <Button as={Link} to="/auth/login" colorScheme="white" variant="outline" mx={2}>
                        Masuk
                    </Button>
                    <Button as={Link} to="/auth/register" colorScheme='blue' bg="#1450A3" mx={2} boxShadow="md">
                        Daftar
                    </Button>
                </Box>
            </Box>
        </Flex>
    )
}

export default Navbar
