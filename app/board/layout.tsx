import tw from "tailwind-styled-components";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

const TwLink = tw(Link)`
  flex justify-center items-center
  w-32 h-16
  mb-6
  text-white
  rounded-md drop-shadow-md
  hover:text-black  hover:shadow-inner transition duration-200
`;

export default async function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionRes = await getServerSession(authOptions);
  return (
    <>
      <aside className="w-[12%] min-w-[130px] flex flex-col justify-start items-center shrink-0 p-6 bg-transparent">
        {sessionRes === null ? (
          <TwLink
            href="/login"
            className="bg-gray-500  hover:bg-gray-400 transition duration-200"
            prefetch={false}
          >
            로그인
          </TwLink>
        ) : (
          <TwLink
            href="/board/write"
            className="bg-orange-500  hover:bg-orange-400 transition duration-200"
            prefetch={false}
          >
            글쓰기
          </TwLink>
        )}
        <TwLink
          href="/board"
          className="bg-yellow-500 hover:bg-yellow-400 transition duration-200"
          prefetch={false}
        >
          전체글
        </TwLink>
        <TwLink
          href="/board/front"
          className="bg-blue-500  hover:bg-blue-400 transition duration-200"
          prefetch={false}
        >
          프론트
        </TwLink>
        <TwLink
          href="/board/back"
          className="bg-emerald-500  hover:bg-emerald-400 transition duration-200"
          prefetch={false}
        >
          백엔드
        </TwLink>
        <TwLink
          href="/board"
          className="bg-red-500  hover:bg-red-400 transition duration-200"
          prefetch={false}
        >
          좋아요
        </TwLink>
      </aside>
      <div className="w-[76%] flex justify-center">{children}</div>
      <aside className="w-[12%] min-w-[130px] flex flex-col justify-center items-center shrink-0 p-6 bg-transparent">
        광고야잉
      </aside>
    </>
  );
}
