import tw from "tailwind-styled-components";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

const TwLink = tw(Link)`
  flex justify-center items-center
  w-16 h-8
  mb-4
  bg-emerald-500
  rounded-sm
`;

const TwDiv = tw.div`
  flex justify-center items-center
  w-16 h-8
  mb-4
  bg-emerald-500
  rounded-sm
  cursor-pointer
`;

export default async function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionRes = await getServerSession(authOptions);

  return (
    <>
      <aside className="flex-grow flex flex-col justify-start p-6 bg-amber-200">
        <TwLink href="/">글쓰기</TwLink>
        <TwDiv>전체글</TwDiv>
        <TwDiv>프론트</TwDiv>
        <TwDiv>백엔드</TwDiv>
        <TwDiv>좋아요</TwDiv>
      </aside>
      {children}
      <aside className="flex-grow flex flex-col justify-center p-6 bg-amber-200">
        광고야잉
      </aside>
    </>
  );
}
