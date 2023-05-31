import Link from "next/link";
import tw from "tailwind-styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";

// interface Post {
//   _id: ObjectId;
//   title: string;
//   content: string;
//   author: string;
//   category: string;
//   comment: string[];
//   date: string;
//   like: number;
//   isLiked: boolean;
// }
const Item = ({ data }) => {
  const TwSection = tw.section`
  w-[70vw] h-[20vh]
  flex flex-col justify-center 
  mx-2 mt-4 p-4 
  bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md drop-shadow-md
  hover:scale-105 transition duration-200
  truncate
  `;

  return (
    <>
      {data.map(post => (
        <TwSection key={post._id.toString()}>
          <div className="flex justify-between">
            <Link href={`/board/detail/${post._id}`}>
              <h1 className="text-xl font-bold cursor-pointer hover:text-white transition duration-200">
                {post.title}
              </h1>
            </Link>
            <div>{post.author}</div>
          </div>
          <h2 className="text-sm text-gray-600 font-bold cursor-pointer hover:text-white transition duration-200">
            {post.category === "front" ? "프론트엔드" : "백엔드"}
          </h2>
          <article className="my-2 cursor-pointer">{post.content}</article>
          <div className="flex text-xs items-center">
            <FontAwesomeIcon
              icon={faComment}
              className="fa-comment w-[16px] h-[16px] mr-1 text-slate-50 drop-shadow-sm"
            />
            <div className="mr-4">{post.comment.length}</div>
            <FontAwesomeIcon
              icon={faHeart}
              className="fa-heart w-[16px] h-[16px] mr-1 text-red-500 drop-shadow-sm"
            />
            <span>{post.like}</span>
            <p className="ml-auto">{new Date(post.date).toLocaleString()}</p>
          </div>
        </TwSection>
      ))}
    </>
  );
};

export default Item;
