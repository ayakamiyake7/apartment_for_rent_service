import Link from "next/link";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as uunidv4 } from "uuid";

import { listsState } from "../src/hooks/listsState";

export default function Create() {
  const [lists, setLists] = useRecoilState(listsState);
  const [address, setAddress] = useState("");
  const [type, setType] = useState("flat");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const handleAddAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  const onFileUpload = (e) => {
    if (!e.target.files) return;
    setImages([...images, ...e.target.files]);
  };

  const handleClickCreate = () => {
    const newLists = [
      {
        address: address,
        type: type,
        images: images,
        description: description,
        id: uunidv4(),
      },
      ...lists,
    ];

    setLists(newLists);

    console.log(newLists);
  };

  return (
    <>
      <h2>Address</h2>
      <input type="text" value={address} onChange={handleAddAddress} />
      <h2>Type</h2>
      <select onChange={handleChangeType}>
        <option value="flat">Flat</option>
        <option value="detached">Detached</option>
        <option value="semi-detached">Semi-detached</option>
        <option value="Terraced">Terraced</option>
      </select>
      <h2>Images</h2>
      <input
        multiple
        type="file"
        accept=".png, .jpeg, .jpg"
        dataURLKey="data_url"
        onChange={onFileUpload}
      />

      <h2>Description</h2>
      <textarea onChange={(e) => setDescription(e.target.value)} />

      <Link href="/">
        <button
          onClick={() => {
            handleClickCreate();
          }}
        >
          Create
        </button>
      </Link>
    </>
  );
}
