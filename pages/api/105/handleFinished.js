import prisma from "lib/prisma";

export default async function handler(req, res) {
  let { id } = req.body;

  try {
    const result = await prisma.OneOFive.update({
      where: { id },
      data: {
        completed: true,
      },
    });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
