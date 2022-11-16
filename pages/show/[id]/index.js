import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { v4 as uunidv4 } from "uuid";
import dayjs from "dayjs";

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

import { ChevronLeftIcon, DeleteIcon } from "@chakra-ui/icons";

import { listsState } from "../../../src/hooks/listsState";

export default function Rent() {
  // To gain an id that was passed from index.js
  const router = useRouter();

  const ref = useRef(false);

  // To call present lists (all)
  const [lists, setLists] = useRecoilState(listsState);
  // To set list which is selected
  const [selectedList, setSelectedList] = useState({});
  // reviews
  const [review, setReview] = useState({});
  const [reviews, setReviews] = useState([]);
  const [changeList, setChangeList] = useState(false);
  // Review id
  const reviewId = uunidv4();

  // Modal - Add reviews
  const {
    isOpen: isReviewOpen,
    onOpen: onReviewOpen,
    onClose: onReviewClose,
  } = useDisclosure();
  // Modal - Delete list
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const handleChangeAddText = (e) => {
    setReview(e.target.value);
  };
  // Add reviews
  const handleClickAddReview = () => {
    // At first, add reviews
    const now = dayjs();
    const newReview = {
      review: review,
      createdAt: now.format("YYYY-MM-DD HH:mm"),
    };
    setReviews([newReview, ...reviews]);

    setReview("");
    // Close the modal
    setChangeList(true);
    onReviewClose();
  };

  // Delete review
  const handleClickDeleteReview = (index) => {
    const newReviews = [...reviews];
    newReviews.splice(index, 1);
    setReviews(newReviews);
    setChangeList(true);
  };

  // Delete List
  const handleClickDeleteList = () => {
    const newLists = Object.values(lists).filter(
      (list) => list.id !== selectedList.id
    );
    setLists(newLists);
    router.push("/");
  };

  useEffect(() => {
    setSelectedList(lists.find((list) => list.id === router.query.id));
  }, []);

  useEffect(() => {
    selectedList.reviews && setReviews(selectedList.reviews);
  }, [selectedList]);

  // After setting reviews, update a new list based on changed reviews
  useEffect(() => {
    if (ref.current && changeList) {
      const newList = {
        ...selectedList,
        reviews: [...reviews],
      };
      let copy_lists = [...lists];

      lists.forEach((list, i) => {
        if (list.id == router.query.id) copy_lists[i] = newList;
      });

      setLists(copy_lists);
      setChangeList(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    } else {
      ref.current = true;
    }
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
          {selectedList.images?.map((image, reviewId) => {
            // Optional changing
            return <img key={reviewId} src={image} />;
          })}
        </Box>
        <Heading as="h2" size="md" mb={2} color="gray.500">
          Description
        </Heading>
        <Text mb={10}>{selectedList.description}</Text>

        <Heading as="h2" size="md" mb={2} color="gray.500">
          Review
        </Heading>

        {reviews?.length ? (
          reviews.map((review, index) => {
            return (
              <Flex key={index} mb={4}>
                <Text mr={8}>{review.review}</Text>
                <Text mr={8}>{review.createdAt}</Text>
                <DeleteIcon
                  w={6}
                  h={6}
                  color="teal.600"
                  cursor="pointer"
                  onClick={() => handleClickDeleteReview(index)}
                />
              </Flex>
            );
          })
        ) : (
          <Box></Box>
        )}
        <Flex justify="center" wrap="wrap" mt={10}>
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
            onClick={onReviewOpen}
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
              mr={{ base: 0, md: 8 }}
              mb={{ base: 8, md: 8 }}
            >
              Edit
            </Button>
          </Link>
          <Button
            size="lg"
            w={{ base: "100%", md: 200 }}
            h={{ base: 16, md: 12 }}
            mb={{ base: 8, md: 0 }}
            borderRadius={20}
            bg={"red.400"}
            colorScheme="red"
            display="block"
            onClick={onDeleteOpen}
          >
            Delete a list
          </Button>
        </Flex>
        <Link href="/">
          <Button
            leftIcon={<ChevronLeftIcon />}
            size="lg"
            w={{ base: "100%", md: 200 }}
            h={{ base: 16, md: 12 }}
            mx="auto"
            borderRadius={20}
            variant="outline"
            colorScheme="teal"
            bg="white"
            display="block"
          >
            Back
          </Button>
        </Link>

        <Modal isOpen={isReviewOpen} onClose={onReviewClose}>
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

        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure you delete the list?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex>
                <Button
                  size="lg"
                  w={{ base: "100%", md: 200 }}
                  h={{ base: 16, md: 12 }}
                  borderRadius={20}
                  bg={"teal.400"}
                  colorScheme="teal"
                  display="block"
                  mr={{ base: 0, md: 8 }}
                  mb={{ base: 8, md: 0 }}
                  onClick={onDeleteClose}
                >
                  No
                </Button>
                <Button
                  size="lg"
                  w={{ base: "100%", md: 200 }}
                  h={{ base: 16, md: 12 }}
                  borderRadius={20}
                  bg={"red.400"}
                  colorScheme="red"
                  display="block"
                  onClick={handleClickDeleteList}
                >
                  Yes
                </Button>
              </Flex>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Container>
  );
}
