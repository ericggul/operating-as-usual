import prisma from "lib/prisma";

export default async function handler(req, res) {
  try {
    const result = await prisma.dobsReply.create({
      data: {},
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e);
  }
}
