import tw from "tailwind-styled-components";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { SignIn, SignOut } from "./actions";

const TwLink = tw(Link)`
h-full w-28
flex items-center
hover:text-white
transition duration-200
active:translate-y-0.5
`;

const TwSpan = tw.span`
h-full w-28
flex items-center justify-center
hover:text-white
transition duration-200
active:translate-y-0.5
cursor-pointer
`;

const TwHeader = tw.header`
w-screen h-16 
flex justify-start items-center 
bg-gradient-to-r from-cyan-500 to-blue-500
px-1
`;

export default async function Header() {
  const sessionRes = await getServerSession(authOptions);

  return (
    <TwHeader>
      <TwLink href="/">
        <p className="mx-auto">로고</p>
      </TwLink>
      <TwLink href="/board">
        <p className="mx-auto">게시판</p>
      </TwLink>
      <TwLink href="/about">
        <p className="mx-auto">어바웃</p>
      </TwLink>
      <TwLink href="/" className="ml-auto">
        <p className="mx-auto">후원하기</p>
      </TwLink>
      {sessionRes && (
        <TwLink href="/info">
          <div className="w-full flex items-center justify-evenly">
            <Image
              className="rounded-full"
              src={sessionRes.user!.image!}
              alt="프로필"
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
