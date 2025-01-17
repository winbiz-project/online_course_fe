import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import ReactPaginate from "react-paginate";
import BlogCard from "./card/blogCard";
import { Divider, Flex } from "@chakra-ui/react";

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];

function Items({ currentItems }) {
  return (
    <>{currentItems && currentItems.map((item) => <BlogCard key={item} />)}</>
  );
}

export function PaginatedItems({ itemsPerPage }) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Flex
        wrap={"wrap"}
        align={"center"}
        justifyContent={"center"}
        mt={"14"}
        id="container"
      >
        <Items currentItems={currentItems} />
      </Flex>
      <Divider bgColor={"black"} height={"1px"} />
      <ReactPaginate
        className="text-gray-600 text-2xl font-bold flex space-x-10 justify-center align-middle"
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
