import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Image from "next/image";
import Item, { Post } from "@/app/board/Item";

const page = async () => {
  const db = (await connectDB).db("forum");
  const sessionRes = await getServerSession(authOptions);
  const data: Post[] = await db
    .collection<Post>("post")
    .find({ author: sessionRes?.user?.name || "" })
    .sort({ date: -1 })
    .toArray();

  return (
    <div className="flex flex-col items-center flex-grow">
      <div className="flex flex-col items-center my-6">
        <Image
          className="drop-shadow-lg rounded-lg mb-2"
          src={sessionRes!.user!.image!}
          width={150}
          height={150}
          alt="프로필"
        />
        <p>{sessionRes!.user!.name}</p>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-xl my-6">작성한 게시글</h1>
        <Item data={data} />
      </div>
    </div>
  );
};

export default page;
