import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { v4 as uunidv4 } from "uuid";
import dayjs from 'dayjs';

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

import { DeleteIcon } from "@chakra-ui/icons";

import { listsState } from "../../../src/hooks/listsState";

export default function Rent() {
  // To gain an id that was passed from index.js
  const router = useRouter();

  // To call present lists (all)
  const [lists, setLists] = useRecoilState(listsState);
  // To set list which is selected
  const [selectedList, setSelectedList] = useState("");
  // reviews
  const [review, setReview] = useState({});
  const [reviews, setReviews] = useState([]);
  // Review id
  const reviewId = uunidv4();
  // Set currentTime
  const today = new Date();
  const currentTime = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}}`;

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangeAddText = (e) => {
    setReview(e.target.value);
  };
  // Add reviews
  const handleClickAddReview = () => {
    // At first, add reviews
    const now = dayjs();
    const newReview = {review: review, createdAt: now.format('YYYY-MM-DD HH:mm')};
    setReviews([newReview, ...reviews]);
    // setReviews([
    //   { id: reviewId, name: "Hanako", createdAt: currentTime, review: review },
    //   ...reviews,
    // ]);

    setReview("");
    // Close the modal
    onClose();
  };

  // Delete review
  const handleClickDeleteReview = (index) => {
    const newReviews = [...reviews];
    newReviews.splice(index, 1);
    setReviews(newReviews);
  };

  useEffect(() => {
    setSelectedList(lists.find((list) => list.id === router.query.id));
  }, []);

  // After setting reviews, update a new list based on changed reviews
  useEffect(() => {
    const newList = {
      reviews: [...reviews],
      ...selectedList,
    };
    let copy_lists = { ...lists };
    copy_lists[router.query.id] = newList;
    console.log("copy_lists", copy_lists);

    setLists(copy_lists);
    console.log("newList=", newList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews]);

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
          {selectedList.images?.map((image) => {
            // Optional changing
            return <img src={image} />;
          })}
        </Box>
        <Heading as="h2" size="md" mb={2} color="gray.500">
          Description
        </Heading>
        <Text mb={10}>{selectedList.description}</Text>

        <Heading as="h2" size="md" mb={2} color="gray.500">
          Review
        </Heading>
        <Box>
          {reviews.map((list, index) => {
            return (
              <Flex key={index} mb={4}>
                <Text mr={8}>{list.review}</Text>
                <Text mr={8}>{list.createdAt}</Text>
                <DeleteIcon
                  w={6}
                  h={6}
                  color="teal.600"
                  onClick={()=>handleClickDeleteReview(index)}
                />
              </Flex>
            );
          })}
        </Box>
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
                value={review.review}
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
