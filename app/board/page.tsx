import Item, { Post } from "./Item";
import { connectDB } from "../../util/database";

const page = async () => {
  const db = (await connectDB).db("forum");
  const dataArray = await db
    .collection("post")
    .find()
    .sort({ date: -1 })
    .toArray();

  const data: Post[] = dataArray.map(item => ({
    _id: item._id,
    title: item.title,
    content: item.content,
    author: item.author,
    category: item.category,
    comment: item.comment,
    date: item.date,
    like: item.like,
  }));
  return (
    <article className="w-full h-full mt-6 flex flex-col items-center justify-start">
      <Item data={data} />
    </article>
  );
};

export default page;
