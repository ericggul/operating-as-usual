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

  //speech to text

  const speech = google.speech({
    version: "v1",
    auth: authToken,
  });

  const request = {
    config: {
      encoding: "LINEAR16",
      languageCode: "en-GB",
    },
    audio: {
      content: req.body.audio,
    },
  };

  const [response] = await speech.speech.recognize({ resource: request });

  const transcription = response.results.map((result) => result.alternatives[0].transcript);

  console.log(transcription);
  res.send(transcription);

  // //make request
  // const request = {
  //   input: { text: req.body.text },
  //   voice: { languageCode: "en-UK", ssmlGender: "NEUTRAL" },
  //   audioConfig: { audioEncoding: "LINEAR16" },
  // };

  // const client = await google.texttospeech({
  //   version: "v1",
  //   auth: authToken,
  // });

  // const result = await client.text.synthesize({ resource: request });
  // res.send(result.data.audioContent);
}
