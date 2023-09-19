import React from "react";
import Item, { Post } from "../Item";
import { connectDB } from "../../../util/database";

const category = async (props: { params: { category: string } }) => {
  const db = (await connectDB).db("forum");
  const data: Post[] = await db
    .collection<Post>("post")
    .find({ category: props.params.category })
    .sort({ date: -1 })
    .toArray();

  return (
    <article className="w-full h-full mt-6 flex flex-col items-center justify-start">
      <Item data={data} />
    </article>
  );
};

export default category;
