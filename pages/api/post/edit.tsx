import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const db = (await connectDB).db("forum");
    const data = await db.collection("post").updateOne(
      {
        _id: new ObjectId(req.body._id),
      },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
        },
      }
    );
    res.writeHead(302, { Location: `/board/detail/${req.body._id}` });
    res.end();
  }
}
