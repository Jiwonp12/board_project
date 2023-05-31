import Button from "@/app/components/Button";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

const Detail = async (props: { params: { postId: string } }) => {
  let db = (await connectDB).db("forum");
  let data = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.postId) });
  return (
    <section className="w-[70vw] h-[78vh] mt-8 p-4 bg-slate-100 rounded-md">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-extrabold">{data?.title}</h1>
      </div>
      <div className="p-1 flex justify-between items-center">
        <p className="w-1/3 text-sm">{new Date(data?.date).toLocaleString()}</p>
        <h2 className="text-lg">
          {data?.category === "front" ? "프론트엔드" : "백엔드"}
        </h2>
        <div className="w-1/3 flex items-center justify-end">
          <Button dataId={data?._id.toString()} />
          <span>{data?.like}</span>
        </div>
      </div>
      <article className="h-2/4 p-1 bg-slate-200 rounded-md">
        {data?.content}
      </article>
      <div>
        댓글 작성 인풋
        <div>제출bt</div>
      </div>
      <article>댓글</article>
    </section>
  );
};

export default Detail;
