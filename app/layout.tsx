import tw from "tailwind-styled-components";
import "./globals.css";
import Header from "./Header";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const TwMain = tw.main`
  w-full h-full
  flex justify-between flex-grow
`;

const TwFooter = tw.footer`
flex justify-center items-center 
p-2
bg-blue-950 text-white
text-xs
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen h-full flex flex-col">
        {/* @ts-expect-error Async Server Component */}
        <Header />
        <TwMain>{children}</TwMain>
        <TwFooter>COPYRIGHT © 2023. ALL RIGHTS RESERVED by Jiwon Park</TwFooter>
      </body>
    </html>
  );
}
