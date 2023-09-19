import { ObjectId } from "mongodb";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";

export interface Post {
  _id: ObjectId;
  title: string;
  content: string;
  author: string;
  category: string;
  comment: string;
  date: string;
  like: string;
}

interface ItemProps {
  data: Post[];
}

const Item = ({ data }: ItemProps) => {
  const TwSection = tw.section`
  w-[70vw] h-[8rem]
  flex flex-col
  mx-2 mb-6 p-2 
  rounded-md drop-shadow-md
  hover:scale-105 transition duration-200
  break-words
  `;

  return (
    <>
      {data.map(post => (
        <TwSection
          key={post._id.toString()}
          className={
            post.category === "front" ? "bg-blue-400" : "bg-emerald-400"
          }
        >
          <div className="flex justify-between">
            <Link href={`/board/detail/${post._id}`}>
              <h1 className="text-xl font-bold cursor-pointer hover:text-white transition duration-200">
                {post.title}
              </h1>
            </Link>
            <div>{post.author}</div>
          </div>
          <Link
            href={post.category === "front" ? "/board/front" : "/board/back"}
          >
            <h2 className="text-sm text-gray-600 font-bold cursor-pointer hover:text-white transition duration-200">
              {post.category === "front" ? "프론트엔드" : "백엔드"}
            </h2>
          </Link>
          <Link
            href={`/board/detail/${post._id}`}
            className="flex-grow cursor-pointer"
          >
            {post.content.slice(0, 80)}
          </Link>
          <div className="flex text-xs items-center">
            <FontAwesomeIcon
              icon={faComment}
              className="fa-comment w-[16px] h-[16px] mr-1 text-slate-50 drop-shadow-sm"
            />
            <div className="mr-4">{post.comment}</div>
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
