import Link from "next/link";

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex py-4">
      <section className="pl-4 h-full flex flex-col justify-start">
        <Link href="/"></Link>
        <div>전체글</div>
        <div>프론트</div>
        <div>백엔드</div>
        <div>좋아요 한 글</div>
      </section>
      {children}
    </div>
  );
}
