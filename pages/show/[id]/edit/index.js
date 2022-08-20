import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import { listsState } from "../../../../src/hooks/listsState";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const [lists, setLists] = useRecoilState(listsState);
  const [address, setAddress] = useState(address);

  const handleAddAddress = (e) => {
    setAddress(e.target.value);
    console.log("address=", address);
  };

  useEffect(() => {
    //filter
    setLists(lists.filter((list) => list.id === router.query.id));
  }, []);
  console.log(lists);

  return (
    <>
      <h2>Address</h2>
      <p>/show/{id}/edit</p>
      <input type="text" value={address} onChange={handleAddAddress} />
    </>
  );
}
