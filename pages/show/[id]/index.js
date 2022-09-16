import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";

import { listsState } from "../../../src/hooks/listsState";

export default function Rent() {
  // To gain an id that was passed from index.js
  const router = useRouter();

  // To call present lists (all)
  const lists = useRecoilValue(listsState);
  // To set list which is selected
  const [selectedList, setSelectedList] = useState("");

  // useEffect(() => {
  //   if (router.query.id) {
  //     setDetailList(lists.find((list) => list.id === router.query.id));
  //   } else {
  //     router.push("/");
  //   }
  // }, []);
  //for security reason

  useEffect(() => {
    setSelectedList(lists.find((list) => list.id === router.query.id));
  }, []);

  return (
    <Container
      h="100%"
      minHeight="100vh"
      position="relative"
      background="#efefef"
      maxW="auto"
    >
      <Box
        my="6"
        rounded="lg"
        w={{
          base: "calc(100% - 40px)",
          md: 1000,
        }}
        m="auto"
        py={8}
      >
        <Heading as="h1" size="xl" mb={10} color="teal.400">
          Create a List.
        </Heading>
        <Heading as="h2" size="md" mb={2} color="gray.500">
          Address
        </Heading>
        <Text mb={8}>{selectedList.address}</Text>
        <Heading as="h2" size="md" mb={2} color="gray.500">
          Type
        </Heading>
        <Text mb={8}>{selectedList.type}</Text>
        <Heading as="h2" size="md" mb={2} color="gray.500">
          Description
        </Heading>
        <Text mb={10}>{selectedList.description}</Text>

        <Link
          href={{
            pathname: `/show/${selectedList.id}/edit`,
            query: { id: selectedList.id },
          }}
        >
          <Button
            size="lg"
            w={200}
            borderRadius={20}
            bg={"teal.400"}
            colorScheme="teal"
            display="block"
            mx="auto"
          >
            Edit
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
