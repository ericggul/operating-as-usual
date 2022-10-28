import { useEffect } from "react";
import axios from "axios";

export default function Lufthansa() {
  useEffect(() => {
    fetchFlight();
    // const interval = setInterval(fetchTweet, 2000);
    // return () => clearInterval(interval);
  }, []);

  async function fetchFlight() {
    const { data } = await axios.get("https://api.lufthansa.com/v1/flight-schedules/flightschedules/passenger?airlines=LH", {
      authorization: `Bearer ${process.env.LUFTHANSA_TOKEN}`,
      "Access-Control-Allow-Origin": "*",
    });
    console.log(data.result[0].text);
  }

  return <></>;
}
