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
        .collection("comment")
        .deleteOne({ _id: new ObjectId(req.query.commentId as string) });
      let post = await db
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
            },
          },
        }
      );
      res.status(204).end();
    } catch (error) {
      return res.status(500);
    }
  }
}
