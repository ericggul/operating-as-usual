import prisma from "lib/prisma";

export default async function handler(req, res) {
  try {
    //sort by createdat
    const data = await prisma.dobsSingleAnswer.findMany({});
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
}
