import prisma from "lib/prisma";

export default async function handler(req, res) {
  let { id } = req.body;

  try {
    console.log("delete attempt");
    const result = await prisma.OneOFive.delete({
      where: { id },
    });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
