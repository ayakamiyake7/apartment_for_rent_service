import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import { listsState } from "../../../../src/hooks/listsState";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const [recoilLists, recoilSetLists] = useRecoilState(listsState);
  const [editedList, setEditedList] = useState({});
  const [rawList, setRawList] = useState({});
  const [address, setAddress] = useState("");

  const handleChangeAddress = (e) => {

    setEditedList({...rawList, address: e.target.value});
    console.log("address=",e.target.value );
  };

  // 画面遷移したときにRecoilのデータを読み出す
  useEffect(() => {
    //filter
    setRawList(recoilLists.find((list) => list.id === router.query.id));
  }, []);

  // Recoilのデータを読み出されたら、編集画面用のuseStateにセットする
  useEffect(() => {
    setEditedList({...rawList});
  }, [rawList]);

  // Recoilにデータを保存する処理
  const saveData = () => {
    const index = recoilLists.findIndex((list) => list.id === router.query.id);
    const lists = [...recoilLists]
    lists[index] = {...editedList}
    recoilSetLists(lists)
    router.push('/')
  }

  return (
    <>
      <h2>Address</h2>
      <p>/show/{id}/edit</p>
      <input
        type="text"
        address={address}
        value={editedList.address}
        onChange={handleChangeAddress}
      />
      <p>{editedList.address}</p>
      <button onClick={saveData}>save</button>
    </>
  );
}
