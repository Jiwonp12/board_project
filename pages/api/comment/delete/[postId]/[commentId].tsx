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
        .collection("comment")
        .deleteOne({ _id: new ObjectId(req.query.commentId as string) });
      const post = await db
        .collection("post")
        .findOne({ _id: new ObjectId(req.query.postId as string) });
      await db.collection("post").updateOne(
        { _id: new ObjectId(req.query.postId as string) },
        {
          $set: {
            comment: (parseInt(post!.comment) - 1).toString(),
          },
        }
      );
      await db.collection("like").updateMany(
        {},
        {
          $pull: {
            isCommentLiked: {
              parentId: new ObjectId(req.query.commentId as string),
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
