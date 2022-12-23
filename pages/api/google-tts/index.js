const textToSpeech = require("@google-cloud/text-to-speech");

export default async function handler(req, res) {
  const client = new textToSpeech.TextToSpeechClient();

  const [result] = await client.listVoices({ languageCode: "en" });
  const voices = result.voices;

  const request = {
    input: { text: req.body.text },
    voice: { languageCode: "en-UK", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "LINEAR16" },
  };

  const [response] = await client.synthesizeSpeech(request);
  res.send(response.audioContent);
}
