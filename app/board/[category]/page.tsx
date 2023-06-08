import React from "react";
import Item from "../Item";
import { connectDB } from "../../../util/database";

const category = async (props: { params: { category: string } }) => {
  let db = (await connectDB).db("forum");
  let data = await db
    .collection("post")
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
