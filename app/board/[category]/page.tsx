import React from "react";
import Item from "../Item";
import { connectDB } from "../../../util/database";

const category = async (props: { params: { category: string } }) => {
  let db = (await connectDB).db("forum");
  let data = await db
    .collection("post")
    .find({ category: props.params.category })
    .toArray();

  return (
    <article className="w-full h-full flex flex-col items-center mt-4">
      <Item data={data} />
    </article>
  );
};

export default category;
