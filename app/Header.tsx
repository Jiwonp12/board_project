import Link from "next/link";
import React from "react";

const Header = () => {
  const linkStyle =
    "h-full flex items-center w-20 hover:text-white transition duration-200 active:translate-y-0.5";
  return (
    <header className="w-screen h-16 flex justify-start items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <Link href="/" className={`${linkStyle}`}>
        <p className="mx-auto">로고</p>
      </Link>
      <Link href="/board" className={`${linkStyle}`}>
        <p className="mx-auto">게시판</p>
      </Link>
      <Link href="/info" className={`${linkStyle}`}>
        <p className="mx-auto">내정보</p>
      </Link>
      <Link href="/about" className={`${linkStyle}`}>
        <p className="mx-auto">어바웃</p>
      </Link>
      <Link href="/" className={`${linkStyle} ml-auto`}>
        <p className="mx-auto">후원하기</p>
      </Link>
      <Link href="/" className={`${linkStyle} ml-0`}>
        <p className="mx-auto">로그인</p>
      </Link>
    </header>
  );
};

export default Header;
