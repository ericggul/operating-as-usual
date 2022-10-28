import axios from "axios";

export default async (req, res) => {
  const { data } = await axios.get(`https://api.tfl.gov.uk/Line/${req.query.line}/Arrivals/940GZZLUGPK`, {
    apiKey: process.env.TFL_API_KEY,
  });
  //   console.log(data);

  res.status(200).json({ result: data });
};
