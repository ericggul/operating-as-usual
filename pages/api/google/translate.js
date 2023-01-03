const { google } = require("googleapis");

export default async function handler(req, res) {
  const SCOPES = ["https://www.googleapis.com/auth/cloud-platform"];

  //authentication
  const { privateKey } = JSON.parse(process.env.GOOGLE_PRIVATE_KEY || "{ privateKey: null }");

  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      private_key: privateKey,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });
  const authToken = await auth.getClient();

  //translation
  const request = {
    q: req.body.text,
    screen: "en",
    target: req.body.target || "ja",
  };

  const client = await google.translate({
    version: "v2",
    auth: authToken,
  });

  const result = await client.translations.translate({ resource: request });
  res.send(result.data.data.translations[0].translatedText);
}
