import dynamic from "next/dynamic";

const ChatComponent = dynamic(() => import("components/w/chat"), { ssr: false });

export default function Tunnel() {
  return <ChatComponent />;
}
