import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";

import CardCourse from "../card/course";
import flyinGirl from "@/assets/images/Flyin Girl.png";
import PortfolioCard from "../card/portfolioCard";

const Portfolio = () => {
  const portfolio = {
    title: "Copywriting Introduction",
    image: flyinGirl,
    countVideos: 12,
    users: 1200,
    rating: 4.5,
  };
  return (
    <Flex
      width={"100%"}
      bgColor={"#fff"}
      height={"100%"}
      py={"20"}
      px={"40"}
      mt={"40"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          Ratusan Skill Impian Kini dalam Genggamanmu
        </Text>
        <Text fontSize={"xl"} fontWeight={"bold"} color={"#545454"}>
          pilih skill apapun dan pelajari kapanpun. dapatkan video materi
          terstruktur, modul praktik plus webinar series rancangan.
        </Text>
      </Flex>
      <Flex flexDirection={"column"} gap={"10"} my={"10"}>
        <Flex gap={"5"} justifyContent={"center"}>
          <PortfolioCard portfolio={portfolio} />
          <PortfolioCard portfolio={portfolio} />
          <PortfolioCard portfolio={portfolio} />
          <PortfolioCard portfolio={portfolio} />
          <PortfolioCard portfolio={portfolio} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Portfolio;
