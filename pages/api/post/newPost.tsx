import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface KeysForAdd {
  category: string;
  author: string;
  date: string;
  like: string;
  comment: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionRes = await getServerSession(req, res, authOptions);

  try {
    const keysForAdd: KeysForAdd = {
      category: req.body.category,
      author: sessionRes!.user!.name!,
      date: new Date(Date.now()).toISOString(),
      like: "0",
      comment: "0",
    };

    if (req.method === "POST") {
      const db = (await connectDB).db("forum");
      const data = await db
        .collection("post")
        .insertOne({ ...req.body, ...keysForAdd });
      res.writeHead(302, { Location: "/board" });
      res.end();
    }
  } catch (error) {
    return res.status(500);
  }
}
