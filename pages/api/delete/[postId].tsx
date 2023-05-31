import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      let db = (await connectDB).db("forum");
      let data = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(req.query.postId as any) });
      res.status(204).end();
    } catch (error) {
      return res.status(500);
    }
  }
}
