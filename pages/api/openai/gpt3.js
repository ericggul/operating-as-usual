const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: req.body.text,
    max_tokens: 25,
    temperature: 0.9,
    top_p: 1,
    frequency_penalty: 0.25,
    stop: [".", "A:"],
  });

  res.status(200).json({ text: `${completion.data.choices[0].text}` });
}
