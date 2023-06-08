import Item from "./Item";
import { connectDB } from "../../util/database";

const page = async () => {
  let db = (await connectDB).db("forum");
  let data = await db.collection("post").find().sort({ date: -1 }).toArray();
  return (
    <article className="w-full h-full mt-6 flex flex-col items-center justify-start">
      <Item data={data} />
    </article>
  );
};

export default page;
