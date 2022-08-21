import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import { listsState } from "../../../../src/hooks/listsState";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const [lists, setLists] = useRecoilState(listsState);
  const [editedList, setEditedList] = useState({});
  const [address, setAddress] = useState("");

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
    console.log("address=", address);
  };

  return (
    <>
      <h2>Address</h2>
      <p>/show/{id}/edit</p>
      <input
        type="text"
        address={address}
        value={address}
        onChange={handleChangeAddress}
      />
    </>
  );
}
