import dynamic from "next/dynamic";

import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { SWRConfig } from "swr";

const ArchiveComponent = dynamic(() => import("components/105/archive"), { ssr: false });

export default function Archive() {
  const router = useRouter();
  const { order } = router.query;

  return (
    <>
      <Head>
        <title>105 by Jeanyoon Choi</title>
      </Head>
      <SWRConfig
        value={{
          refreshInterval: 6000,
        }}
      >
        <ArchiveComponent order={order ? parseInt(order) : null} isAdmin={order == null} />
      </SWRConfig>
    </>
  );
}
