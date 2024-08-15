import React, {useContext} from 'react'
import { Flex, Box, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { TriangleDownIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import LogoSkillbridge from './LogoSkillbridge'
import { Link, useLocation } from 'react-router-dom'
import AuthContext from '@/routes/authcontext'

const Navbar = () => {
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const {logoutUser} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser(navigate);
    }

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
                        E-learning
                    </Button>
                    {/* <Button as={Link} to="/corporate-service" colorScheme="white" variant="link" mx={2} isActive={() => location.pathname === '/corporate-service'}>
                        Corporate Service
                    </Button> */}
                    <Button as={Link} to="/blog" colorScheme="white" variant="link" mx={2} isActive={() => location.pathname === '/blog'}>
                        Blog
                    </Button>
                </Box>
                {user ? (
                    <Menu>
                        <MenuButton as={Button} colorScheme="white" variant="outline" rightIcon={<TriangleDownIcon />} mx={2}>
                        Hello, {user.name}
                        </MenuButton>
                        <MenuList  minW="120px">
                            <MenuItem color={'black'} as={Link} to="/mycourses">My Courses</MenuItem>
                            <MenuItem color={'black'} onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                ) : (
                    <Box>
                        <Button as={Link} to="/auth/login" colorScheme="white" variant="outline" mx={2}>
                            Masuk
                        </Button>
                        <Button as={Link} to="/auth/register" colorScheme='blue' bg="#1450A3" mx={2} boxShadow="md">
                            Daftar
                        </Button>
                    </Box>
                )}
            </Box>
        </Flex>
    )
}

export default Navbar
