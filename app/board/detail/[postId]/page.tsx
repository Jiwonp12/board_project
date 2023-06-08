import Button from "@/app/components/Button";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const Detail = async (props: { params: { postId: string } }) => {
  const sessionRes = await getServerSession(authOptions);
  let db = (await connectDB).db("forum");
  let data = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.postId) });
  let like = await db.collection("like").findOne({
    user: sessionRes?.user?.name,
  });
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
      <div className="drop-shadow-sm">
        <form className="w-[70vw] h-[50px] mt-2 flex">
          <input
            required
            name="comment"
            placeholder="댓글을 입력하세요"
            className="w-full h-full mr-4 p-1 bg-gray-200 rounded-md"
          />
          <button
            type="submit"
            className="w-[100px] h-full ml-auto bg-gray-200 rounded-md"
          >
            작성
          </button>
        </form>
        <article>
          {data.comment.length !== 0 ? data.comment : "댓글이 없어잉.."}
        </article>
      </div>
    </div>
  );
};

export default Detail;
