const { google } = require("googleapis");

const getRandomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

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

  const client = await google.texttospeech({
    version: "v1",
    auth: authToken,
  });

  //list voices
  const voices = await client.voices.list({ languageCode: "en-GB" });
  const voice = getRandomFromArray(voices.data.voices);

  //make request
  const request = {
    input: { text: req.body.text },
    voice: { languageCode: voice.languageCodes[0], ssmlGender: voice.ssmlGender, name: voice.name },
    audioConfig: { audioEncoding: "LINEAR16" },
  };

  const result = await client.text.synthesize({ resource: request });
  res.send(result.data.audioContent);
}
