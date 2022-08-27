import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

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

  const handleChangeDescription = (e) => {
    setEditedList({ ...editedList, description: e.target.value });
    console.log("description=", e.target.value);
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

  return (
    <>
      <h2>Address</h2>
      <input
        type="text"
        value={editedList.address || ""}
        onChange={handleChangeAddress}
      />

      <h2>Type</h2>
      <select onChange={handleChangeType}>
        <option value="flat">Flat</option>
        <option value="detached">Detached</option>
        <option value="semi-detached">Semi-detached</option>
        <option value="Terraced">Terraced</option>
      </select>

      <h2>Description</h2>
      <textarea
        value={editedList.description}
        onChange={handleChangeDescription}
      />

      <p>{editedList.address}</p>
      <p>{editedList.type}</p>
      <p>{editedList.description}</p>

      <button onClick={saveData}>save</button>
    </>
  );
}
