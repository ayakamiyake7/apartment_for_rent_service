import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { listsState } from "../../../src/hooks/listsState";

export default function Rent() {
  // To gain an id that was passed from index.js
  const router = useRouter();

  // To call present lists (all)
  const lists = useRecoilValue(listsState);
  // To set list which is selected
  const [selectedList, setSelectedList] = useState("");

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
    <>
      <p>This is rent page.</p>
      <ul>
        <li>{selectedList.address}</li>
        <li>{selectedList.type}</li>
        <li>{selectedList.description}</li>
        <li>{selectedList.id}</li>
      </ul>
      <Link
        href={{
          pathname: `/show/${selectedList.id}/edit`,
          query: { id: selectedList.id },
        }}
      >
        <button>Edit</button>
      </Link>
    </>
  );
}
