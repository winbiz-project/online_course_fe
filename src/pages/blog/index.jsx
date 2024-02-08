import Navbar from "@/components/blog/navbar";
import BlogCard from "@/components/card/blogCard";
import { PaginatedItems } from "@/components/pagination";
import { Container, Divider, Flex, Text } from "@chakra-ui/react";

const Blog = () => {
  return (
    <div className="w-full">
      <Navbar />
      <Container my={"16"} width={"100%"} px={"20"} maxWidth={"none"}>
        <Text fontSize={"20"} fontWeight={"bold"}>
          All Stories
        </Text>
        <Divider bgColor={"black"} height={"1px"} />
        {/* <Flex
          wrap={"wrap"}
          align={"center"}
          justifyContent={"center"}
          mt={"14"}
          id="container"
        >
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </Flex> */}
        {/* <Divider bgColor={"black"} height={"1px"} /> */}
        <PaginatedItems itemsPerPage={6}/>
      </Container>
    </div>
  );
};

export default Blog;
