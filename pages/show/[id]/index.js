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
    //filter
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
      {/* idを持ってく */}
      <Link href={`/show/${selectedList.id}/edit`}>
        {/* <Link
        href={{
          pathname: `/rents/${selectedList.id}/edit`
        }}
      > */}
        <button>Edit</button>
      </Link>
    </>
  );
}
