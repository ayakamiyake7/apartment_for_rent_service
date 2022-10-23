import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { listsState } from "../../../src/hooks/listsState";

export default function Rent() {
  // To gain an id that was passed from index.js
  const router = useRouter();

  // To call present lists (all)
  const lists = useRecoilValue(listsState);
  // To set list which is selected
  const [selectedList, setSelectedList] = useState("");
  // reviews
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Add reviews
  const handleChangeAddText = (e) => {
    setReview(e.target.value);
  };
  const handleClickAddReview = () => {
    // Shallow copy of the selectedList
    const lists = { ...selectedList };

    // setReviews([review, ...reviews]);

    const newLists = {
      // reviews: [review, setReviews((reviews) => [...reviews])],
      // reviews: setReviews([review, ...reviews]),
      // reviews: setReviews((reviews) => [...reviews, review]),
      // reviews: [review, setReviews([...reviews])],

      reviews: setReviews([review, ...reviews]),
      ...lists,
    };
    // console.log(newLists);

    setSelectedList(newLists);

    setReview("");
    // Close the modal
    onClose();
  };

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
          List.
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
          Images
        </Heading>
        <Box mb={8}>
          {console.log("reviews=", reviews)}
          {console.log("selectedList=", selectedList)}
          {selectedList.images?.map((image, index) => {
            // Optional changing
            return <img key={index} src={image} />;
          })}
        </Box>
        <Heading as="h2" size="md" mb={2} color="gray.500">
          Description
        </Heading>
        <Text mb={10}>{selectedList.description}</Text>

        <Heading as="h2" size="md" mb={2} color="gray.500">
          Review
        </Heading>
        <ul>
          {reviews.map((list, index) => {
            return <li key={index}>{list}</li>;
          })}
        </ul>
        <Flex justify="center" wrap="wrap">
          <Button
            size="lg"
            w={{ base: "100%", md: 200 }}
            h={{ base: 16, md: 12 }}
            borderRadius={20}
            bg={"teal.400"}
            colorScheme="teal"
            display="block"
            mr={{ base: 0, md: 8 }}
            mb={{ base: 8, md: 8 }}
            onClick={onOpen}
          >
            Write a Review
          </Button>
          <Link
            href={{
              pathname: `/show/${selectedList.id}/edit`,
              query: { id: selectedList.id },
            }}
          >
            <Button
              size="lg"
              w={{ base: "100%", md: 200 }}
              h={{ base: 16, md: 12 }}
              borderRadius={20}
              bg={"teal.400"}
              colorScheme="teal"
              display="block"
            >
              Edit
            </Button>
          </Link>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Please enter your review.</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                type="text"
                value={review}
                onChange={handleChangeAddText}
                mb={8}
              />
              <Button
                size="lg"
                w={{ base: "100%", md: 200 }}
                h={{ base: 16, md: 12 }}
                borderRadius={20}
                bg={"teal.400"}
                colorScheme="teal"
                display="block"
                mx="auto"
                onClick={handleClickAddReview}
              >
                Add a Review
              </Button>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Container>
  );
}
