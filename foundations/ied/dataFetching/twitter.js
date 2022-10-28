import { useEffect } from "react";
import axios from "axios";

export default function TwitterTest() {
  useEffect(() => {
    const interval = setInterval(fetchTweet, 2000);
    return () => clearInterval(interval);
  }, []);

  async function fetchTweet() {
    try {
      const { data } = await axios.post("/api/ied/twitter");
      console.log(data.result[0].text);
    } catch (e) {
      console.log("twitter error");
      console.log(e);
    }
  }

  return <></>;
}
