const textToSpeech = require("@google-cloud/text-to-speech");
const { GoogleAuth } = require("google-auth-library");

export default async function handler(req, res) {
  const client = new textToSpeech.TextToSpeechClient();

  const [result] = await client.listVoices({ languageCode: "en" });
  const voices = result.voices;

  const request = {
    input: { text: req.body.text },
    voice: { languageCode: "en-UK", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "LINEAR16", sampleRateHertz: 16000, pitch: 5.0 },
  };

  const [response] = await client.synthesizeSpeech(request);

  res.send(response.audioContent);
}
