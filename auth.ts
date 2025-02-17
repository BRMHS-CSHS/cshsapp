import NextAuth, { type User } from "next-auth";
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

export interface AuthUser extends User {
    hours: number
    role: string
    services: string[]
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    callbacks: {
        session: async ({ session, token = null }) => {
            // if it exists, which it doesn't. will replace later.

            if (token) {
                (session.user as any).id = token.id;
                session.user.email = token.email!;
                session.user.name = token.name;
                (session.user as any).hours = token.hours;
                (session.user as any).role = token.role;
                (session.user as any).services = token.services;
                (session.user as any).high_score = token.high_score;
            }

            return session;
        },
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.hours = (user as any).hours;
                token.role = (user as any).role;
                token.services = (user as any).services;
                token.high_score = (user as any).high_score;
            }

            return token;
        }
    },
    providers: [
        Credentials({
            id: "user",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
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
        })
    ]
});
