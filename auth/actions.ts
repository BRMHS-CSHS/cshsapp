"use server";
import { db } from "@/db";
import { auth } from "@/auth";

export const registerUser = async (credentials: any): Promise<string> => {
    if (
        typeof credentials?.email !== "string"
        || typeof credentials?.password !== "string"
        || typeof credentials?.name !== "string"
        || !credentials?.grade
        || !credentials?.hours
    ) { throw new Error("Invalid Credentials"); }

    const form = {
        email: credentials.email as string,
        password: credentials.password as string,
        name: credentials.name as string,
        hours: Number.parseInt(credentials.hours),
        grade: Number.parseInt(credentials.grade)
    };

    if (await db.user.findUnique({ where: { email: form.email } })) { throw new Error("Email already exists"); }

    const res = await db.user.create({
        data: {
            email: form.email,
            password: form.password,
            name: form.name,
            hours: form.hours,
            grade: form.grade
        }
    });

    if (!res) throw new Error("Something went wrong.");
    return "Success";
};

export const changeHours = async (
    email?: string,
    hours?: number
): Promise<string> => {
    if (!email || !hours) throw new Error("Invalid parameters.");

    const admin = await auth();
    if (admin?.user?.email !== process.env.ADMIN_EMAIL) { throw new Error("Unauthorized"); }

    const user = await db.user.update({
        where: { email: email },
        data: { hours: hours }
    });

    if (!user) throw new Error("No email associated.");
    return "Success";
};

export const changeEmail = async (
    oldEmail?: string,
    newEmail?: string
): Promise<string> => {
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
