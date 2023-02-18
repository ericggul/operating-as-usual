import prisma from "lib/prisma";

export default async function handler(req, res) {
  let { replyId, idx, response } = req.body;

  let questionIdx = parseInt(idx);

  try {
    console.log(replyId, questionIdx, response);
    const result = await prisma.dobsSingleAnswer.create({
      data: {
        dobsReplyId: replyId,
        questionIdx,
        answer: response,
      },
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e);
  }
}
