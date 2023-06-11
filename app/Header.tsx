import tw from "tailwind-styled-components";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { SignIn, SignOut } from "./actions";
import { connectDB } from "@/util/database";

const TwLink = tw(Link)`
h-full w-28
flex items-center
text-white
hover:text-black
transition duration-200
active:translate-y-0.5
`;

const TwSpan = tw.span`
h-full w-28
flex items-center justify-center
cursor-pointer
`;

const TwHeader = tw.header`
w-screen h-16 
flex justify-start items-center
bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%
px-1 drop-shadow-lg
`;

export default async function Header() {
  const sessionRes = await getServerSession(authOptions);
  let db = (await connectDB).db("forum");
  let visitedUser = await db
    .collection("like")
    .findOne({ user: sessionRes?.user?.name });

  if (sessionRes && sessionRes.user && !visitedUser) {
    let like = await db.collection("like").findOneAndUpdate(
      { user: sessionRes.user.name },
      {
        $setOnInsert: {
          user: sessionRes.user.name,
          isLiked: [],
          isCommentLiked: [],
        },
      },
      { upsert: true }
    );
  }
  return (
    <TwHeader>
      <TwLink href="/" prefetch={false}>
        <p className="mx-auto">로고</p>
      </TwLink>
      <TwLink href="/board" prefetch={false}>
        <p className="mx-auto">게시판</p>
      </TwLink>
      <TwLink href="/about" prefetch={false}>
        <p className="mx-auto">어바웃</p>
      </TwLink>
      <TwLink href="/" className="ml-auto" prefetch={false}>
        <p className="mx-auto">후원하기</p>
      </TwLink>
      {sessionRes && (
        <TwLink href="/info" prefetch={false} as={"image"}>
          <div className="w-full flex items-center justify-evenly">
            <Image
              className="rounded-full"
              src={sessionRes.user!.image!}
              alt="프로필"
              priority={true}
              width={50}
              height={50}
            />
            <span>{sessionRes.user!.name!}</span>
          </div>
        </TwLink>
      )}
      <TwSpan className="ml-0">{sessionRes ? <SignOut /> : <SignIn />}</TwSpan>
    </TwHeader>
  );
}
