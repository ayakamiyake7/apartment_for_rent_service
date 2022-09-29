import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";

import { listsState } from "../../../../src/hooks/listsState";

export default function Edit() {
  const router = useRouter();

  const [recoilLists, recoilSetLists] = useRecoilState(listsState);
  const [editedList, setEditedList] = useState({});

  const handleChangeAddress = (e) => {
    setEditedList({ ...editedList, address: e.target.value });
  };

  const handleChangeType = (e) => {
    setEditedList({ ...editedList, type: e.target.value });
  };

  const handleChangeImages = (e) => {
    setEditedList({ ...editedList, images: e.target.files });
  };

  const handleChangeDescription = (e) => {
    setEditedList({ ...editedList, description: e.target.value });
  };

  // 画面遷移したときにRecoilのデータを読み出す
  useEffect(() => {
    setEditedList(recoilLists.find((list) => list.id === router.query.id));
  }, []);

  // Recoilにデータを保存する処理
  const saveData = () => {
    const index = recoilLists.findIndex((list) => list.id === router.query.id);
    const lists = [...recoilLists];
    lists[index] = { ...editedList };
    recoilSetLists(lists);
    router.push("/");
  };

  const deleteData = () => {
    const newLists = recoilLists.filter((list) => list.id !== router.query.id);
    recoilSetLists(newLists);
    console.log(recoilLists);
    router.push("/");
  };

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
        <Input
          type="text"
          mb={8}
          value={editedList.address || ""}
          onChange={handleChangeAddress}
        />

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
          Images
        </Heading>
        <Box mb={8}>
          {/* {console.log("selectedList.image=", selectedList.images)} */}
          <input
            onChange={handleChangeImages}
            type="file"
            multiple
            accept=".png, .jpeg, .jpg"
          />
          {editedList.images?.map((link, index) => (
            <img key={index} src={link} />
          ))}
        </Box>

        <Heading as="h2" size="md" mb={2} color="gray.500">
          Description
        </Heading>
        <Textarea
          value={editedList.description}
          onChange={handleChangeDescription}
          mb={8}
        />

        <Button
          size="lg"
          w={200}
          borderRadius={20}
          bg={"teal.400"}
          colorScheme="teal"
          display="block"
          mx="auto"
          mb={8}
          onClick={saveData}
        >
          Save
        </Button>
        <Button
          size="lg"
          w={200}
          borderRadius={20}
          color="white"
          bg={"gray.400"}
          _hover={{ background: "gray.600" }}
          display="block"
          // mx="auto"
          onClick={deleteData}
        >
          Delete
        </Button>
      </Box>
    </Container>
  );
}
