import Link from "next/link";
import React, { useState } from "react";

export default function Create() {
  const [lists, setLists] = useState("");
  const [address, setAddress] = useState("aiueo");
  const [type, setType] = useState("flat");

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
        id: Math.floor(Math.random() * 100),
      },
      ...lists,
    ];

    console.log("newLists=", newLists);
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
