import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userLoginHandler } from "../handlers";
import jwt from "jsonwebtoken";
import { AuthPayload } from "@/types";



export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "Email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        console.log("IN AUTHORIZE");
        if (!credentials) {
          throw new Error("Please fill in all the fieadadwlds");
        }

        const res = await userLoginHandler(credentials);
        if (res.errorCode) {
          throw new Error(res.errorMessage);
        } else if (res.status === 200) {
          return { ...res.content };
        } else throw new Error("Please try again after some time");
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60,
    encode: async ({ secret, token, maxAge }) => {
      if (!token || !maxAge) return Promise.resolve("");

      const jwtClaims = {
        sub: token.id,
        iat: Date.now() / 1000,
        exp: Math.floor(Date.now() / 1000) + maxAge,
        user: token.user,
      };

      const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: "HS256" });
      return Promise.resolve(encodedToken);
    },
    decode: async ({ secret, token }) => {
      try {
        const decodedToken = jwt.verify(token!, secret, {
          algorithms: ["HS256"],
        });
        return Promise.resolve(decodedToken as any);
      } catch (error) {
        return Promise.resolve("");
      }
    },
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.user = token.user as AuthPayload;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
