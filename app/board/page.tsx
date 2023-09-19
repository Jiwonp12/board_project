import Item, { Post } from "./Item";
import { connectDB } from "../../util/database";

const page = async () => {
  const db = (await connectDB).db("forum");
  const data: Post[] = await db
    .collection<Post>("post")
    .find()
    .sort({ date: -1 })
    .toArray();

  return (
    <article className="w-full h-full mt-6 flex flex-col items-center justify-start">
      <Item data={data} />
    </article>
  );
};

export default page;
