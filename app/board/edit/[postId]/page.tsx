import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Form from "@/app/components/Form";

export default async function Edit(props: { params: { postId: string } }) {
  let db = (await connectDB).db("forum");
  let data = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.postId) });

  return <Form data={data} />;
}
