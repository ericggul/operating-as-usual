import axios from "axios";

export default async function handler(req, res) {
  const completion = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: req.body.systemContent },
        { role: "user", content: req.body.userContent },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
    }
  );

  const result = completion.data.choices[0].message.content;

  res.status(200).json({ text: result });
}
