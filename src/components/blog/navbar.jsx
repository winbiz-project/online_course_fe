import React from "react";
import {
  Flex,
  Box,
  Button,
  Image,
  InputGroup,
  InputRightAddon,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import LogoSkillbridge from "../LogoSkillbridge";
import youtubeIcon from "../../assets/images/blog_youtube.svg";
import instagramIcon from "../../assets/images/blog_instagram.svg";
import linkedinIcon from "../../assets/images/blog_linkedin.svg";
import twitterIcon from "../../assets/images/blog_twitter.svg";
import { FaSearch } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { IoChevronDown, IoChevronDownCircleOutline } from "react-icons/io5";

const Navbar = () => {
  const location = useLocation();

  return (
    <Flex
      as="nav"
      align="center"
      flexDir={"column"}
      padding="1.5rem"
      paddingX={{ base: "2rem", md: "4rem" }}
      bg="white"
      color="blacok"
      boxShadow="0 5px 5px 0 rgba(0,0,0,0.1)"
    >
      <Flex justify="space-between" width={"100%"} align={"center"}>
        <Flex gap={"2"}>
          <Image src={youtubeIcon} alt="Skillbridge" width="30px" />
          <Image src={linkedinIcon} alt="Skillbridge" width="30px" />
          <Image src={instagramIcon} alt="Skillbridge" width="30px" />
          <Image src={twitterIcon} alt="Skillbridge" width="30px" />
        </Flex>
        <Box>
          <LogoSkillbridge />
        </Box>
        <Box>
          <InputGroup size="sm" borderColor={"#108EE9"}>
            <Input placeholder="Search..." borderColor={"#108EE9"} />
            <InputRightAddon bg={"#108EE9"}>
              <FaSearch />
            </InputRightAddon>
          </InputGroup>
        </Box>
      </Flex>
      <Flex justify="center" align={"center"} mt={4}>
        <Menu>
          <MenuButton display={"flex"} me={4}>
            <Text
              display={"flex"}
              flexDirection={"row"}
              gap={2}
              fontSize={"xl"}
            >
              TIPS KARIR
              <IoChevronDown className="my-auto" />
            </Text>
          </MenuButton>
          <MenuList>
            <MenuItem as="a" href="#">
              Link 1
            </MenuItem>
            <MenuItem as="a" href="#">
              Link 2
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton display={"flex"} me={4}>
            <Text
              display={"flex"}
              flexDirection={"row"}
              gap={2}
              fontSize={"xl"}
            >
              ISTILAH PENTING
              <IoChevronDown className="my-auto" />
            </Text>
          </MenuButton>
          <MenuList>
            <MenuItem as="a" href="#">
              Link 1
            </MenuItem>
            <MenuItem as="a" href="#">
              Link 2
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton display={"flex"} me={4}>
            <Text
              display={"flex"}
              flexDirection={"row"}
              gap={2}
              fontSize={"xl"}
            >
              RANGKUMAN BUKU
              <IoChevronDown className="my-auto" />
            </Text>
          </MenuButton>
          <MenuList>
            <MenuItem as="a" href="#">
              Link 1
            </MenuItem>
            <MenuItem as="a" href="#">
              Link 2
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton display={"flex"} me={4}>
            <Text
              display={"flex"}
              flexDirection={"row"}
              gap={2}
              fontSize={"xl"}
            >
              SKILLBRIDGE
              <IoChevronDown className="my-auto" />
            </Text>
          </MenuButton>
          <MenuList>
            <MenuItem as="a" href="#">
              Link 1
            </MenuItem>
            <MenuItem as="a" href="#">
              Link 2
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
