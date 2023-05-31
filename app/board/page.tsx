import Item from "./Item";
import { connectDB } from "../../util/database";

const page = async () => {
  let db = (await connectDB).db("forum");
  let data = await db.collection("post").find().toArray();
  return (
    <article className="w-full h-full flex flex-col items-center mt-4">
      <Item data={data} />
    </article>
  );
};

export default page;
