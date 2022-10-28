import axios from "axios";

export default async (req, res) => {
  const { data } = await axios.get(`https://stage.abgapiservices.com/oauth/token/v1`, {
    headers: {
      client_id: process.env.AVIS_CLIENT_ID,
      client_secret: process.env.AVIS_CLIENT_SECRET,
    },
  });

  try {
    const result = await axios.get(`https://stage.abgapiservices.com/cars/locations/v1/?country_code=US&brand=Avis&keyword=Denver`, {
      headers: {
        client_id: process.env.AVIS_CLIENT_ID,
        Authorization: `Bearer ${data.access_token}`,
      },
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }

  res.status(200).json({ result: "hey" });
};
