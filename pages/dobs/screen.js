import dynamic from "next/dynamic";

import { SWRConfig } from "swr";

const Component = dynamic(() => import("components/dobs/screen"), {
  ssr: false,
});

export default function Screen() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 15000,
      }}
    >
      <Component />
    </SWRConfig>
  );
}
