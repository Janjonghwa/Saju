import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";

const googleClientId = process.env.AUTH_GOOGLE_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET;
const kakaoClientId = process.env.AUTH_KAKAO_ID;
const kakaoClientSecret = process.env.AUTH_KAKAO_SECRET;
const naverClientId = process.env.AUTH_NAVER_ID;
const naverClientSecret = process.env.AUTH_NAVER_SECRET;

const providers = [];

if (googleClientId && googleClientSecret) {
  providers.push(
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  );
}

if (kakaoClientId && kakaoClientSecret) {
  providers.push(
    Kakao({
      clientId: kakaoClientId,
      clientSecret: kakaoClientSecret,
      authorization: "https://kauth.kakao.com/oauth/authorize",
      token: "https://kauth.kakao.com/oauth/token",
      userinfo: "https://kapi.kakao.com/v2/user/me",
    }),
  );
}

if (naverClientId && naverClientSecret) {
  providers.push(
    Naver({
      clientId: naverClientId,
      clientSecret: naverClientSecret,
    }),
  );
}

// Guest login provider
providers.push(
  Credentials({
    id: "guest",
    name: "게스트 로그인",
    credentials: {},
    async authorize() {
      // Create or find a guest user
      const guestId = `guest_${Date.now()}`;
      const guestUser = await prisma.user.upsert({
        where: { email: `${guestId}@guest.local` },
        update: {},
        create: {
          id: guestId,
          email: `${guestId}@guest.local`,
          name: "게스트",
          role: "user",
        },
      });

      return {
        id: guestUser.id,
        name: guestUser.name,
        email: guestUser.email,
      };
    },
  }),
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;

        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { role: true },
        });

        session.user.role = dbUser?.role ?? "user";
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }

      return token;
    },
  },
});
