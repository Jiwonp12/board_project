import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface KeysForAdd {
  category: string;
  author: string;
  comment: string[];
  date: string;
  like: string;
  isLiked: boolean;
}

const categoryMap = {
  프론트엔드: "front",
  백엔드: "back",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionRes = await getServerSession(req, res, authOptions);

  try {
    const { category, ...rest } = req.body;
    const keysForAdd: KeysForAdd = {
      category: categoryMap[category],
      author: sessionRes!.user!.name!,
      comment: [],
      date: new Date(Date.now()).toISOString(),
      like: "0",
      isLiked: false,
    };

    if (req.method === "POST") {
      let db = (await connectDB).db("forum");
      let data = await db
        .collection("post")
        .insertOne({ ...rest, ...keysForAdd });
      res.writeHead(302, { Location: "/board" });
      res.end();
    }
  } catch (error) {
    return res.status(500);
  }
}
