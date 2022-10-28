import Twitter from "twitter-lite";

export default async (req, res) => {
  const client = new Twitter({
    version: "2",
    extension: false,
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
  });

  const result = await client.get("tweets/search/recent", { query: "(anger OR politics OR demo OR riot) lang:en" });
  res.status(200).json({ result: result.data });
};
