const { google } = require("googleapis");

const getRandomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default async function handler(req, res) {
  try {
    const SCOPES = ["https://www.googleapis.com/auth/cloud-platform"];

    //authentication
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(new RegExp("\\\\n", "g"), "\n").replace() || null;

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

    let voice;
    if (req.body.options && req.body.options.gender) {
      voice = getRandomFromArray(voices.data.voices.filter((voice) => voice.ssmlGender === req.body.options.gender));
    } else {
      voice = getRandomFromArray(voices.data.voices);
    }

    //make request
    //HERE ERROR OCCURS
    const request = {
      input: { text: req.body.text },
      voice: { languageCode: voice.languageCodes[0], ssmlGender: voice.ssmlGender, name: voice.name },
      audioConfig: {
        audioEncoding: "LINEAR16",
        pitch: 0,
        speakingRate: 1,
      },
    };

    const result = await client.text.synthesize({ resource: request });
    res.send(result.data.audioContent);
  } catch (e) {
    res.send({
      error: e,
      type: "error",
    });
  }
}
