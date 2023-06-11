import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    req.body = JSON.parse(req.body);
    let db = (await connectDB).db("forum");
    await db.collection("comment").updateOne(
      { _id: new ObjectId(req.body._id) },
      {
        $set: {
          content: req.body.comment,
        },
      }
    );
    res.writeHead(302, { Location: `/board/detail/${req.body._id}` });
    res.end();
  }
}
