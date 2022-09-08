import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { listsState } from "../src/hooks/listsState";

export default function Home() {
  const [lists, setLists] = useRecoilState(listsState);

  return (
    <Box>
      <Head>
        <title>Rent Service App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/create">
        <button>Add</button>
      </Link>

      <ul>
        {lists.map((list) => {
          return (
            <li key={list.id}>
              {list.id},{list.address},{list.type},{list.description}
              {list.images.map((image, i) => {
                <div key={i}>
                  <img
                    src={image.data_url}
                    style={{
                      width: "100%",
                    }}
                  />
                </div>;
                {
                  console.log(image);
                }
              })}
              <Link href={`/show/${list.id}`}>
                <button>Detail</button>
              </Link>
            </li>
          );
        })}
      </ul>
    </Box>
  );
}
