// import React, {useContext} from 'react'
// import { Flex, Box, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
// import { TriangleDownIcon } from '@chakra-ui/icons'
// import { useNavigate } from 'react-router-dom'
// import LogoSkillbridge from './LogoSkillbridge'
// import { Link, useLocation } from 'react-router-dom'
// import AuthContext from '@/routes/authcontext'

// const Navbar = () => {
//     const location = useLocation();
//     const { user } = useContext(AuthContext);
//     const {logoutUser} = useContext(AuthContext)
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logoutUser(navigate);
//     }

//     return (
//         <Flex
//             as="nav"
//             align="center"
//             justify="space-between"
//             wrap="wrap"
//             padding="1.5rem"
//             paddingX={{ base: '2rem', md: '4rem' }}
//             bg="#5D8DCF"
//             color="white"
//         >
//             <Box>
//                 {/* Logo */}
//                 <LogoSkillbridge />
//             </Box>
//             <Box
//                 display={{ base: 'none', md: 'flex' }}
//                 width={{ base: 'full', md: 'auto' }}
//                 alignItems="center"
//                 justifyContent="flex-end"
//                 flexGrow={1}
//             >
//                 {/* Navigation Links */}
//                 <Box>
//                     <Button as={Link} to="/" colorScheme="white" variant="link" mx={2} isActive={() => location.pathname === '/'}>
//                         Home
//                     </Button>
//                     <Button as={Link} to="/e-learning" colorScheme="white" variant="link" mx={2} isActive={() => location.pathname === '/e-learning'}>
//                         E-learning
//                     </Button>
//                     {/* <Button as={Link} to="/corporate-service" colorScheme="white" variant="link" mx={2} isActive={() => location.pathname === '/corporate-service'}>
//                         Corporate Service
//                     </Button> */}
//                     <Button as={Link} to="/blog" colorScheme="white" variant="link" mx={2} isActive={() => location.pathname === '/blog'}>
//                         Blog
//                     </Button>
//                 </Box>
//                 {user ? (
//                     <Menu>
//                         <MenuButton as={Button} colorScheme="white" variant="outline" rightIcon={<TriangleDownIcon />} mx={2}>
//                         Hello, {user.name}
//                         </MenuButton>
//                         <MenuList  minW="120px">
//                             <MenuItem color={'black'} as={Link} to="/mycourses">My Courses</MenuItem>
//                             <MenuItem color={'black'} onClick={handleLogout}>Logout</MenuItem>
//                         </MenuList>
//                     </Menu>
//                 ) : (
//                     <Box>
//                         <Button as={Link} to="/auth/login" colorScheme="white" variant="outline" mx={2}>
//                             Masuk
//                         </Button>
//                         <Button as={Link} to="/auth/register" colorScheme='blue' bg="#1450A3" mx={2} boxShadow="md">
//                             Daftar
//                         </Button>
//                     </Box>
//                 )}
//             </Box>
//         </Flex>
//     )
// }

// export default Navbar
import React, { useContext } from 'react';
import { 
    Flex, 
    Box, 
    Button, 
    Menu, 
    MenuButton, 
    MenuList, 
    MenuItem, 
    IconButton, 
    Center, 
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Text
} from '@chakra-ui/react';
import { TriangleDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import LogoSkillbridge from './LogoSkillbridge';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '@/routes/authcontext';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const { logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleLogout = () => {
        logoutUser(navigate);
    };

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
            <Flex align="center">
                <IconButton
                    icon={<HamburgerIcon />}
                    variant="ghost"
                    display={{ base: 'block', md: 'none' }}
                    onClick={onOpen}
                    mr={1}
                />
                <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerBody>
                            <LogoSkillbridge />
                            {user && (
                                <>
                                    <Box
                                        fontSize="xl"
                                        mt={3}
                                        mb={3}
                                        color="#004BAD" // Warna teks yang berbeda
                                        fontWeight="bold" // Membuat teks lebih tebal
                                        borderBottom="3px solid #808080" // Menambahkan border bawah
                                        pb="0.5rem" // Padding bawah untuk ruang border
                                    >
                                        Hello, {user.name}
                                    </Box>
                                </>
                            )}
                            <Box fontSize='xl' mt={3} mb={3}>
                                <Link to="/" isActive={location.pathname === '/'} onClick={onClose}>
                                    <Text fontFamily='Montserrat, sans-serif'>
                                        Home
                                    </Text>
                                </Link>
                            </Box>
                            <Box fontSize={'xl'} mb={3}>
                                <Link to="/e-learning" isActive={location.pathname === '/e-learning'} onClick={onClose}>
                                    <Text fontFamily='Montserrat, sans-serif'>
                                        E-Learning
                                    </Text>
                                </Link>
                            </Box>
                            <Box fontSize={'xl'} mb={3}>
                                <a href="https://kursuseksporonline.id/blog/" target="_blank" rel="noopener noreferrer" onClick={onClose}>
                                    <Text fontFamily='Montserrat, sans-serif'>
                                        Blog
                                    </Text>
                                </a>
                            </Box>
                            {!user && (
                                <>
                                    <Box fontSize={'xl'} mb={3}>
                                        <Link to="/auth/login" isActive={location.pathname === '/auth/login'} onClick={onClose}>
                                        Masuk
                                        </Link>
                                    </Box>
                                    <Box fontSize={'xl'} mb={3}>
                                        <Link to="/auth/register" isActive={location.pathname === '/auth/register'} onClick={onClose}>
                                        Daftar
                                        </Link>
                                    </Box>
                                </>
                            )}

                            {user && (
                                <>
                                    <Box fontSize='xl' mb={3}>
                                        <Box as='button' onClick={handleLogout} color="red.500" fontFamily={'Montserrat, sans-serif'}>
                                            Logout
                                        </Box>
                                    </Box>
                                </>
                            )}

                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
                <LogoSkillbridge />
            </Flex>

            {/*Bagian PC/Tablet*/}
            <Box
                display={{ base: 'none', md: 'flex' }}
                width="auto"
                alignItems="center"
                justifyContent="flex-end"
                flexGrow={1}
            >
                <Box>
                    <Button as={Link} to="/" colorScheme="white" variant="link" mx={2} isActive={location.pathname === '/'}>
                        Home
                    </Button>
                    <Button as={Link} to="/e-learning" colorScheme="white" variant="link" mx={2} isActive={location.pathname === '/e-learning'}>
                        E-learning
                    </Button>
                    <Button as='a' href="https://kursuseksporonline.id/blog/" colorScheme="white" target="_blank" rel="noopener noreferrer" variant="link" mx={2}>
                        Blog
                    </Button>
                </Box>
                {user ? (
                    <Menu>
                        <MenuButton as={Button} colorScheme="white" variant="outline" rightIcon={<TriangleDownIcon />} mx={2}>
                            Hello, {user.name}
                        </MenuButton>
                        <MenuList minW="120px" zIndex={20}>
                            <MenuItem color={'black'} as={Link} to="/mycourses">My Courses</MenuItem>
                            <MenuItem color={'black'} onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                ) : (
                    <Box>
                        <Button as={Link} to="/auth/login" colorScheme="white" variant="outline" mx={2}>
                            Login
                        </Button>
                        <Button as={Link} to="/auth/register" colorScheme='blue' bg="#1450A3" mx={2} boxShadow="md">
                            Register
                        </Button>
                    </Box>
                )}
            </Box>
        </Flex>
    );
};

export default Navbar;