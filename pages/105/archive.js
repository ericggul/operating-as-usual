import dynamic from "next/dynamic";

import { useState } from "react";
import Head from "next/head";
import prisma from "lib/prisma";
import { useRouter } from "next/router";

const ArchiveComponent = dynamic(() => import("components/105/archive"), { ssr: false });

export default function Archive(props) {
  const router = useRouter();
  const { order, admin } = router.query;

  return (
    <>
      <Head>
        <title>105 by Jeanyoon Choi</title>
      </Head>
      <ArchiveComponent completedIdxs={props.completedIdxs} order={order ? parseInt(order) : null} isAdmin={order == null} />
    </>
  );
}

export async function getServerSideProps(context) {
  const data = await prisma.OneOFive.findMany({});

  //retrive next idx
  let completedIdxs = data
    .filter((d) => d.completed)
    .map((d) => d.startingIdx)
    .sort((a, b) => a - b);

  return {
    props: { completedIdxs },
  };
}
