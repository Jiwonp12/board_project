import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionRes = await getServerSession(req, res, authOptions);
  if (req.method === "POST") {
    const db = (await connectDB).db("forum");

    const like = await db.collection("like").findOne({
      user: sessionRes?.user?.name,
    });

    const comment = await db
      .collection("comment")
      .findOne({ _id: new ObjectId(req.query.commentId as string) });

    if (like) {
      const isLiked = like.isCommentLiked.some(
        (item: { _id: ObjectId; parentId: ObjectId }) =>
          item._id.toString() ===
            new ObjectId(req.query.postId as string).toString() &&
          item.parentId.toString() ===
            new ObjectId(req.query.commentId as string).toString()
      );
      if (!isLiked) {
        await db.collection("like").updateOne(
          { user: like.user },
          {
            $push: {
              isCommentLiked: {
                _id: new ObjectId(req.query.postId as string), // 게시글 parent
                parentId: new ObjectId(req.query.commentId as string),
              },
            },
          }
        );
        await db.collection("comment").updateOne(
          { _id: new ObjectId(req.query.commentId as string) },
          {
            $set: {
              like: (parseInt(comment!.like) + 1).toString(),
            },
          }
        );
        res.status(302).end();
      } else {
        await db.collection("like").updateOne(
          { user: like.user },
          {
            $pull: {
              isCommentLiked: {
                _id: new ObjectId(req.query.postId as string),
                parentId: new ObjectId(req.query.commentId as string),
              },
            },
          }
        );
        await db.collection("comment").updateOne(
          { _id: new ObjectId(req.query.commentId as string) },
          {
            $set: {
              like: (parseInt(comment!.like) - 1).toString(),
            },
          }
        );
        res.status(302).end();
      }
    }
  }
}
