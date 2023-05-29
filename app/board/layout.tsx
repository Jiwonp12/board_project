import tw from "tailwind-styled-components";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

const TwLink = tw(Link)`
  flex justify-center items-center
  w-32 h-12
  mb-6
  bg-emerald-500
  rounded-md
`;

export default async function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionRes = await getServerSession(authOptions);

  return (
    <>
      <aside className="w-[12%] flex flex-col justify-start items-center shrink-0 p-6 bg-amber-200">
        <TwLink href="/">글쓰기</TwLink>
        <TwLink href="/board">전체글</TwLink>
        <TwLink href="/">프론트</TwLink>
        <TwLink href="/">백엔드</TwLink>
        <TwLink href="/">좋아요</TwLink>
      </aside>
      <div className="w-[76%]">{children}</div>
      <aside className="w-[12%] flex flex-col justify-center items-center shrink-0 p-6 bg-amber-200">
        광고야잉
      </aside>
    </>
  );
}
