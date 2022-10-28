import ArchiveComponent from "components/105/archive";
import { useState } from "react";

import prisma from "lib/prisma";
import { useRouter } from "next/router";

export default function Archive(props) {
  const router = useRouter();
  const { order, admin } = router.query;

  return (
    <>
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
