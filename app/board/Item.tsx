`use client`;

import tw from "tailwind-styled-components";
import { connectDB } from "../../util/database";

const Item = async () => {
  let db = (await connectDB).db("forum");
  let data = await db.collection("post").find().toArray();

  interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
    category: string;
    comment: string;
    date: string;
    like: number;
    lsLiked: boolean;
  }

  const TwSection = tw.section`
  w-[70vw] h-[20vh]
  flex flex-col justify-center 
  mx-2 mt-2 p-4 
  bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md drop-shadow-md
  hover:scale-105 transition duration-200
  truncate
  `;

  return (
    <>
      {data.map((post: Post) => (
        <TwSection key={post._id}>
          <div className="flex justify-between">
            <div className="text-xl font-bold cursor-pointer hover:text-white transition duration-200">
              {post.title}
            </div>
            <div>{post.author}</div>
          </div>
          <div className="text-sm text-gray-600 font-bold cursor-pointer hover:text-white transition duration-200">
            {post.category}
          </div>
          <div className="my-2 cursor-pointer">{post.content}</div>
          <div className="flex text-xs">
            <div className="mr-2">
              댓글: {post.comment !== "" ? post.comment : "0"}
            </div>
            <div>좋아요: {post.like}</div>
            <div className="ml-auto">
              {new Date(post.date).toLocaleString()}
            </div>
          </div>
        </TwSection>
      ))}
    </>
  );
};

export default Item;
