import prisma from "lib/prisma";

export default async function handler(req, res) {
  let { startingIdx } = req.body;

  startingIdx = parseInt(startingIdx);

  try {
    const result = await prisma.OneOFive.create({
      data: {
        startingIdx: startingIdx,
        completed: false,
      },
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e);
  }
}
