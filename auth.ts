import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { saltAndHashPassword } from "./utils/helper";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.hours = token.hours;
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.hours = user.hours;
      }
      return token;
    },
  },
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "role" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const email = credentials.email as string;
        const hash = saltAndHashPassword(credentials.password as string);

        let user: any = await db.user.findUnique({
          where: {
            email,
          },
        });

        const isMatch = bcrypt.compareSync(
          credentials.password as string,
          user.password as string
        );
        if (!isMatch) {
          throw new Error("Incorrect password.");
        }

        return user;
      },
    }),
    Credentials({
      id: "admin",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials: any) => {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        if (
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD
        )
          return credentials;
        return null;
      },
    }),
  ],
});
