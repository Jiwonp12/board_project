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

  if (req.method == "POST") {
    req.body = JSON.parse(req.body);
    const commentToAdd = {
      parent: req.body._id,
      content: req.body.comment,
      user: sessionRes?.user?.name,
      date: new Date(Date.now()).toISOString(),
      like: "0",
    };

    const db = (await connectDB).db("forum");
    const comment = await db.collection("comment").insertOne(commentToAdd);
    const post = await db
      .collection("post")
      .findOne({ _id: new ObjectId(req.body._id) });
    await db.collection("post").updateOne(
      { _id: new ObjectId(req.body._id) },
      {
        $set: {
          comment: (parseInt(post!.comment) + 1).toString(),
        },
      }
    );
    res.writeHead(302, { Location: `/board/detail/${req.body._id}` });
    res.end();
  }
}
