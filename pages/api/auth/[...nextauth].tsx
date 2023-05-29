import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
// import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
    KakaoProvider({
      clientId: process.env.KAKAO_ID || "",
      clientSecret: process.env.KAKAO_SECRET || "",
    }),
  ],
  secret: process.env.JWT_SECRET,
};
export default NextAuth(authOptions);
