import Link from "next/link";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as uunidv4 } from "uuid";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";

import { listsState } from "../src/hooks/listsState";

export default function Create() {
  const [lists, setLists] = useRecoilState(listsState);
  const [address, setAddress] = useState("");
  const [type, setType] = useState("flat");
  const [description, setDescription] = useState("");

  const handleAddAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  const handleClickCreate = () => {
    const newLists = [
      {
        address: address,
        type: type,
        description: description,
        id: uunidv4(),
      },
      ...lists,
    ];

    setLists(newLists);
  };

  return (
    <Container
      h="100vh"
      position="relative"
      backgroundImage="linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)"
      maxW="auto"
    >
      <Box
        h={{ base: "auto", md: 600 }}
        my="6"
        boxShadow="lg"
        rounded="lg"
        w={{
          base: "calc(100% - 40px)",
          md: 1000,
        }}
        m="auto"
        p={8}
        background="#fff"
        position="absolute"
        top={{ base: 10, md: "50%" }}
        left="50%"
        transform={{
          base: "translate(-50%, 0)",
          md: "translate(-50%, -50%)",
        }}
      >
        <Heading as="h1" size="xl" mb={10} color="teal.400">
          Create a List.
        </Heading>
        <Heading as="h2" size="md" mb={2} color="gray.500">
          Address
        </Heading>
        <Input type="text" value={address} mb={8} onChange={handleAddAddress} />
        <Heading as="h2" size="md" mb={2} color="gray.500">
          Type
        </Heading>
        <Select onChange={handleChangeType} mb={8}>
          <option value="flat">Flat</option>
          <option value="detached">Detached</option>
          <option value="semi-detached">Semi-detached</option>
          <option value="Terraced">Terraced</option>
        </Select>
        <Heading as="h2" size="md" mb={2} color="gray.500">
          Description
        </Heading>
        <Textarea mb={10} onChange={(e) => setDescription(e.target.value)} />

        <Link href="/">
          <Button
            size="lg"
            w={200}
            borderRadius={20}
            bg={"teal.400"}
            colorScheme="teal"
            display="block"
            mx="auto"
            onClick={() => {
              handleClickCreate();
            }}
          >
            Create
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
