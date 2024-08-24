import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";

/**
 * bcrypt > bcryptjs, but isomorphic JS.
 */
import bcrypt from "bcryptjs";
import { db } from "./db";

/**
 * The number of rounds to salt.
 * 10 rounds takes around 0.5-1.0sec to run.
 * 15 rounds takes around 5.0 sec to run.
 * @default 10
 */
const SALT_ROUNDS = 10;

/**
 * Hash any password. Never expose the salt to the application.
 * @param password The password to hash.
 */
export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, SALT_ROUNDS);

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    callbacks: {
        session: async ({ session, token = null }) => {
            // if it exists, which it doesn't. will replace later.
            if (token) {
                session.user.email = token.email!;
                session.user.name = token.name;
                (session.user as any).hours = token.hours;
            }

            return session;
        }
    },
    providers: [
        Credentials({
            id: "user",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                role: { label: "Role", type: "role" }
            },
            authorize: async credentials => {
                if (typeof credentials?.email !== "string" || typeof credentials?.password !== "string") return null;

                const user = await db.user.findUnique({ where: { email: credentials.email } });
                if (user === null) return null;

                /**
                 * @note Password is base64-encoded before sending to server.
                 */
                const hashMatch = await bcrypt.compare(credentials.password, user.password);
                if (!hashMatch) throw new Error("The credentials provided do not exist.");

                return user;
            }
        }),
        Credentials({
            id: "admin",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },

            authorize: (credentials : any)  => {
                if (!credentials || !credentials.email || !credentials.password) return null;
          
                const email = credentials.email as string;
                const password = credentials.password as string;
          
                if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) return credentials;
                throw new Error("Bad Credentials"); 
            }
        })
        // todo: admin implementation -> auth ✔
    ]
});
