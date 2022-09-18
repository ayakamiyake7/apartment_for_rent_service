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
  const [imgsSrc, setImgsSrc] = useState([]);

  const handleAddAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  const onFileUpload = (e) => {
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgsSrc((imgs) => [...imgs, reader.result]);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  };
  console.log(imgsSrc, imgsSrc.length);

  const handleClickCreate = () => {
    const newLists = [
      {
        address: address,
        type: type,
        images: imgsSrc,
        description: description,
        id: uunidv4(),
      },
      ...lists,
    ];

    setLists(newLists);
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
      <div>
        <input
          onChange={onFileUpload}
          type="file"
          multiple
          accept=".png, .jpeg, .jpg"
        />
        {imgsSrc.map((link, index) => (
          <img key={index} src={link} />
        ))}
      </div>
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
