import Button from "@/app/components/Button";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Comment from "@/app/components/Comment";
import CommentBtn from "@/app/components/CommentBtn";

const Detail = async (props: { params: { postId: string } }) => {
  const sessionRes = await getServerSession(authOptions);
  let db = (await connectDB).db("forum");
  let data = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.postId) });
  let like = await db.collection("like").findOne({
    user: sessionRes?.user?.name,
  });
  let comment = await db
    .collection("comment")
    .find({ parent: props.params.postId })
    .toArray();

  return (
    <div>
      <section
        className={
          data?.category === "front"
            ? "bg-blue-50 w-[70vw] h-[424px] mt-6 p-4 rounded-md drop-shadow-md"
            : "bg-green-50 w-[70vw] h-[424px] mt-6 p-4 rounded-md drop-shadow-md"
        }
      >
        <h2 className="text-base">
          {data?.category === "front" ? "프론트엔드" : "백엔드"}
        </h2>
        <div className="flex">
          <h1 className="py-2 text-2xl font-extrabold">{data?.title}</h1>
        </div>
        <div className="py-2 flex justify-between items-center border-b-2 border-solid border-black">
          <div className="text-sm flex items-center">
            <p className="font-bold">{data?.author}</p>
            <p>ㅣ{new Date(data?.date).toLocaleString()}</p>
          </div>
        </div>
        <div className="py-2 flex items-center">
          <Button
            dataId={data?._id.toString()}
            author={data?.author}
            username={sessionRes?.user?.name}
            isLiked={like.isLiked.findIndex(
              postId => postId.toString() === props.params.postId
            )}
          />
          <span>{data?.like}</span>
        </div>
        <article className="h-2/4 mt-4 p-1 break-words">
          {data?.content}
        </article>
      </section>
      <Comment postId={data?._id?.toString()} />
      <ul>
        {data.comment === "0" ? (
          <li className="mb-2 p-1 bg-gray-200 rounded-md">댓글이 없어잉..</li>
        ) : (
          comment.map(el => (
            <li
              key={el._id.toString()}
              className="mb-2 p-1 flex flex-col bg-gray-200 rounded-md"
            >
              <div className="flex items-center">
                <div className="mr-1">{el.user}</div>
                <CommentBtn
                  user={el.user}
                  username={sessionRes?.user?.name}
                  postId={data?._id.toString()}
                  commentId={el._id.toString()}
                  isCommentLiked={like.isCommentLiked}
                />
                <div>{el.like}</div>
              </div>
              <div>{el.content}</div>
              <div className="text-sm">
                {new Date(el.date).toLocaleString()}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Detail;
