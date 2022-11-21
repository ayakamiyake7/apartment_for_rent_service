import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import ReactPaginate from "react-paginate";

import {
  Box,
  Button,
  Container,
  Flex,
  GridItem,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";

import { listsState } from "../src/hooks/listsState";

export default function Home() {
  const [lists, setLists] = useRecoilState(listsState);
  const [searchAddress, setSearchAddress] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filteredLists, setFilteredLists] = useState([]);

  const [offset, setOffset] = useState(0); // Where can I list items from
  const perPage = 10; // the number of items in a page
  // Pagination
  const handlePageChange = (data) => {
    let page_number = data["selected"];
    setOffset(page_number * perPage);
  };

  const handleFilterAddress = (e) => {
    setSearchAddress(e.target.value);
  };
  // Filter address
  useEffect(() => {
    const filteringLists = () => {
      if (searchAddress != "") {
        setFilteredLists(
          lists.filter((list) => list.address.includes(searchAddress))
        );
      }
    };
    filteringLists();
  }, [searchAddress]);

  const handleFilterType = (e) => {
    setFilterType(e.target.value);
  };
  // Filter type
  useEffect(() => {
    const filteringLists = () => {
      switch (filterType) {
        case "flat":
          setFilteredLists(lists.filter((list) => list.type === "flat"));
          break;
        case "detached":
          setFilteredLists(lists.filter((list) => list.type === "detached"));
          break;
        case "semiDetached":
          setFilteredLists(
            lists.filter((list) => list.type === "semiDetached")
          );
          break;
        case "terraced":
          setFilteredLists(lists.filter((list) => list.type === "terraced"));
          break;
        default:
          setFilteredLists(lists);
      }
    };
    filteringLists();
  }, [filterType]);

  return (
    <Container
      h="100%"
      minHeight="100vh"
      position="relative"
      background="#efefef"
      maxW="auto"
    >
      <Head>
        <title>Rent Service App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        my="6"
        rounded="lg"
        w={{
          base: "calc(100% - 40px)",
          md: 1000,
        }}
        m={{ base: "0 auto", md: "auto" }}
        py={8}
      >
        <Heading as="h1" size="xl" mb={10} color="teal.400">
          Find a Flat.
        </Heading>

        <Flex direction={{ base: "column", md: "row" }}>
          <Input
            type="search"
            placeholder="Please enter the address."
            mr={{ base: 0, md: 8 }}
            mb={{ base: 4, md: 0 }}
            w={{ base: "100%", md: "calc(100% - ((25% + 16em))" }}
            value={searchAddress}
            onChange={handleFilterAddress}
          />
          <Select
            w={{ base: "100%", md: "25%" }}
            mx="auto"
            mb={8}
            value={filterType}
            onChange={handleFilterType}
          >
            <option value="all">All</option>
            <option value="flat">Flat</option>
            <option value="detached">Detached</option>
            <option value="semiDetached">Semi-detached</option>
            <option value="terraced">Terraced</option>
          </Select>
        </Flex>

        <Link href="/create">
          <Button
            size="lg"
            w={200}
            borderRadius={20}
            bg={"teal.400"}
            colorScheme="teal"
            display="block"
            mx="auto"
            mb={10}
          >
            Add
          </Button>
        </Link>

        <Flex
          wrap="wrap"
          align="flex-start"
          justify="space-between"
          direction={{ base: "column", md: "row" }}
        >
          {filteredLists.slice(offset, offset + perPage).map((list) => {
            return (
              <GridItem
                key={list.id}
                w={{ base: "100%", md: "48%" }}
                boxShadow="lg"
                p={10}
                mb={8}
                bg={"#fff"}
              >
                <Text mb={8}>{list.address}</Text>
                <Text mb={8}>{list.type}</Text>
                <Box mb={8}>
                  {list.images ? (
                    list.images.map((image, index) => {
                      return <img src={image} key={index} />;
                    })
                  ) : (
                    <Box></Box>
                  )}
                </Box>
                <Text mb={10}>{list.description}</Text>
                <Link href={`/show/${list.id}`}>
                  <Button
                    size="lg"
                    w={200}
                    borderRadius={20}
                    bg={"teal.400"}
                    colorScheme="teal"
                    display="block"
                    mx="auto"
                  >
                    Detail
                  </Button>
                </Link>
              </GridItem>
            );
          })}
        </Flex>
        {filteredLists.length > perPage && (
          <ReactPaginate
            nextLabel=">"
            previousLabel="<"
            containerClassName="pagination"
            pageClassName="pagination--item"
            activeClassName="active"
            previousClassName="page--previous"
            nextClassName="page--next"
            disabledClassName="page--disabled"
            pageRangeDisplayed={1}
            breakLabel="..."
            pageCount={Math.ceil(filteredLists.length / perPage)}
            onPageChange={handlePageChange}
          />
        )}
      </Box>
    </Container>
  );
}
