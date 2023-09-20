import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const db = (await connectDB).db("forum");
      const data = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(req.query.postId as string) });
      await db.collection("comment").deleteMany({ parent: req.query.postId });
      await db.collection("like").updateMany({}, {
        $pull: { isLiked: new ObjectId(req.query.postId as string) },
      } as any);
      await db.collection("like").updateMany(
        {},
        {
          $pull: {
            isCommentLiked: {
              _id: new ObjectId(req.query.postId as string),
            } as any,
          },
        }
      );
      res.status(204).end();
    } catch (error) {
      return res.status(500);
    }
  }
}
