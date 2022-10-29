import prisma from "lib/prisma";
import axios from "axios";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

const MainComponent = dynamic(() => import("components/105/main"), { ssr: false });

export default function OneOFive(props) {
  const [id, setId] = useState(null);

  useEffect(() => {
    handleStart();
    return () => handleIncomplete();
  }, []);

  //update database: handle new start
  async function handleStart() {
    let { data } = await axios.post("/api/105/handleNewStart", {
      startingIdx: props.nextIdx,
    });
    setId(data.id);
  }

  //handle finish
  async function handleFinish() {
    await axios.post("/api/105/handleFinished", {
      id,
    });
  }

  //update database: handle incomplete
  async function handleIncomplete() {
    if (id) {
      console.log("handle incomplete");
      await axios.post("/api/105/handleDelete", {
        id,
      });
    }
  }

  return (
    <>
      <Head>
        <title>105 by Jeanyoon Choi</title>
      </Head>
      <MainComponent order={props.nextIdx} id={id} handleFinish={handleFinish} />
    </>
  );
}

export async function getServerSideProps(context) {
  const data = await prisma.OneOFive.findMany({});

  let sortedIdxs = data
    .filter((d) => d.completed || Date.now() - d.createdAt < 1000 * 60 * 10)
    .map((d) => d.startingIdx)
    .sort((a, b) => a - b)
    .filter((value, index, self) => self.indexOf(value) === index);

  let nextIdx;

  if (sortedIdxs.length === 0) {
    nextIdx = 0;
  } else {
    for (let i = 0; i < sortedIdxs.length; i++) {
      if (sortedIdxs[i] !== i) {
        if (sortedIdxs[i] > i) {
          nextIdx = i;
          break;
        }
      }
    }
    if (!nextIdx) {
      nextIdx = sortedIdxs[sortedIdxs.length - 1] + 1;
    }
  }

  return {
    props: { nextIdx },
  };
}
