import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionRes = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    let db = (await connectDB).db("forum");

    let like = await db.collection("like").findOne({
      user: sessionRes.user.name,
    });
    let post = await db
      .collection("post")
      .findOne({ _id: new ObjectId(req.query.postId as string) });

    if (like) {
      let postIdIndex = like.isLiked.findIndex(
        postId => postId.toString() === req.query.postId
      );
      if (postIdIndex === -1) {
        await db
          .collection("like")
          .updateOne(
            { user: like.user },
            { $push: { isLiked: new ObjectId(req.query.postId as string) } }
          );
        await db.collection("post").updateOne(
          { _id: new ObjectId(req.query.postId as string) },
          {
            $set: {
              like: (parseInt(post!.like) + 1).toString(),
            },
          }
        );
        res.status(302).end();
      } else {
        await db
          .collection("like")
          .updateOne(
            { user: like.user },
            { $pull: { isLiked: new ObjectId(req.query.postId as string) } }
          );
        await db.collection("post").updateOne(
          { _id: new ObjectId(req.query.postId as string) },
          {
            $set: {
              like: (parseInt(post!.like) - 1).toString(),
            },
          }
        );
        res.status(302).end();
      }
    }
  }
}
