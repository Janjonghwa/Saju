import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";
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

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;

        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        });

        session.user.role = dbUser?.role ?? "user";
      }

      return session;
    },
  },
});
