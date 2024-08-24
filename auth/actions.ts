import { db } from "@/db";
import { auth } from "@/auth";

export const registerUser = async (credentials: HTMLFormElement): Promise<string> => {
    if (typeof credentials?.email !== "string" || typeof credentials?.password !== "string") throw new Error("Invalid Credentials");

    const form = {
        email: credentials.email,
        password: credentials.password
        // etc.
    };

    if (await db.user.findUnique({ where: { email: form.email } })) throw new Error("Email already exists");

    const res = await db.user.create({
        data: {
            email: form.email,
            password: form.password
            // etc.
        }
    });

    if (!res) throw new Error("Something went wrong.");
    return "Success";
};

export const changeHours = async (email?: string, hours?: number): Promise<string> => {
    if (!email || !hours) throw new Error("Invalid parameters.");

    const admin = await auth();
    if (admin?.user?.email !== process.env.ADMIN_EMAIL) throw new Error("Unauthorized");

    const user = await db.user.update({
        where: { email: email },
        data: { hours: hours }
    });

    if (!user) throw new Error("No email associated.");
    return "Success";
};

export const changeEmail = async (oldEmail?: string, newEmail?: string): Promise<string> => {
    if (!oldEmail || !newEmail) throw new Error("Invalid parameters.");

    const user = await db.user.update({
        where: { email: oldEmail },
        data: { email: newEmail }
    });

    if (!user) throw new Error("No email associated.");
    return "Success";
};

/**
 * @todo add change password functionality
 */
