import prisma from "lib/prisma";

export default async function handler(req, res) {
  try {
    const data = await prisma.OneOFive.findMany({});
    console.log(data);

    //retrive next idx
    let completedIdxs = data
      .filter((d) => d.completed)
      .map((d) => d.startingIdx)
      .sort((a, b) => a - b)
      .filter((d, i, arr) => {
        if (i === 0) return true;
        return d !== arr[i - 1];
      });

    res.status(200).json(completedIdxs);
  } catch (e) {
    res.status(500).json(e);
  }
}
