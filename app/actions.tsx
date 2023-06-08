"use client";

import { signIn, signOut } from "next-auth/react";
import kakao from "../public/kakao_login_medium.png";
import Image from "next/image";

export function SignOut() {
  return (
    <button
      className="flex bg-black text-white px-4 py-3 rounded-md font-semibold text-sm hover:text-white transition-all border border-gray-800"
      onClick={() => signOut()}
    >
      로그아웃
    </button>
  );
}

export function SignIn() {
  return (
    <>
      <Image
        className="mx-auto"
        src={kakao}
        alt="카카오 로그인"
        priority={true}
        onClick={() => {
          signIn();
        }}
      />
      {/* <span
        className="bg-slate-500"
        onClick={() => {
          signIn("github");
        }}
      >
        깃허브 로그인
      </span> */}
    </>
  );
}
