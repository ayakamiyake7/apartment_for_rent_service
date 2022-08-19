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
  // To set list
  const [detailList, setDetailList] = useState([]);

  // useEffect(() => {
  //   if (router.query.id) {
  //     setDetailList(lists.find((list) => list.id === router.query.id));
  //   } else {
  //     router.push("/");
  //   }
  // }, []);

  useEffect(() => {
    setDetailList(lists.find((list) => list.id === router.query.id));
  }, []);

  console.log("detailList=", detailList);
  return (
    <>
      <p>This is rent page.</p>
      <ul>
        <li>{detailList.address}</li>
        <li>{detailList.type}</li>
        <li>{detailList.description}</li>
        <li>{detailList.id}</li>
      </ul>

      <Link href={`/rents/${detailList.id}/edit`}>
        <button>Edit</button>
      </Link>
    </>
  );
}
