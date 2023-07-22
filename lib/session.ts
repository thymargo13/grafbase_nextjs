// keep all data about current logged in user

import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./actions";

export const authOptions: NextAuthOptions = {
  providers: [
    // ! means can be undefined
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    // 13 hours = 60*60
    encode: ({ secret, token }) => {
      const encodeed = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000 + 60 * 60),
        },
        secret
      );
      return encodeed;
    },
    decode: async ({ secret, token }) => {
      const decodeed = jsonwebtoken.verify(token!, secret) as JWT;
      return decodeed;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.png",
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;
      try {
        const data = (await getUser(email)) as {
          user?: UserProfile;
        };

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };
        return newSession;
      } catch (error) {
        console.error(error);
        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        // get the user if they exist
        const userExists = (await getUser(user?.email as string)) as {
          user?: UserProfile;
        };

        // else create
        if (!userExists.user) {
          await createUser(
            user.name as string,
            user.email as string,
            user.image as string
          );
        }
        //return true
        return true;
      } catch (err: any) {
        console.log("file: session.ts:40 🚬💀 signIn 🚬💀 err:", err);
        return false;
      }
    },
  },
};

export const getCurrentUser = async () => {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  console.log("file: session.ts:51 🚬💀 getCurrentUser 🚬💀 session:", session);

  return session;
};

// Google user
// name, email, avatarUrl ->

// our user
// projects, description, githubUrl, linkedInUrl
