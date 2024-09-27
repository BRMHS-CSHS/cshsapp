"use server";
import { db } from "@/db";
import { signIn, signOut, hashPassword } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

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
        password: await hashPassword(credentials.password as string),
        name: credentials.name as string,
        hours: Number.parseInt(credentials.hours),
        grade: Number.parseInt(credentials.grade)
    };

    if (await db.user.findUnique({ where: { email: form.email } })) { throw new Error("Email already exists"); }

    const res = await db.user.create({
        data: {
            email: form.email,
            password: form.password,
            password_initial: form.password,
            name: form.name,
            hours: form.hours,
            grade: form.grade
        }
    });

    if (!res) throw new Error("Something went wrong.");
    return "Success";
};

export const registerService = async (credentials: any): Promise<string> => {
    if (
        typeof credentials?.name !== "string"
        || typeof credentials?.location !== "string"
        || !credentials?.name
        || !credentials?.location
        || !credentials?.date
    ) { throw new Error("Invalid Credentials"); }

    const form = {
        name: credentials.name as string,
        location: credentials.location as string,
        date: credentials.date
    };

    const res = await db.services.create({
        data: {
            name: form.name,
            location: form.location,
            date: form.date
        }
    });

    if (!res) throw new Error("Something went wrong.");
    return "Success";
};

export const loginUser: any = async (credentials: any) => {
    if (!credentials.email || !credentials.password) throw new Error("Invalid Credentials");

    const data = {
        email: credentials.email as string,
        password: credentials.password as string
    };

    try {
        await signIn("user", data);
    } catch (error: any) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return ("Invalid Credentials");
                default:
                    return ("Something went wrong: Bad Username or Password");
            }
        }
    }
    redirect("/");
};

export const logout = async (): Promise<any> => {
    await signOut({ redirect: true, redirectTo: "/" });
    revalidatePath("/");
};

export const getUsers = async (): Promise<any> => {
    const users = await db.user.findMany({
        where: { role: "User" }
    });

    let temp = {
        id: 0,
        email: "",
        name: "",
        grade: 0,
        hours: 0,
        status: "active"
    };

    const result: Array<typeof temp> = [];
    for (let i = 1; i < users.length + 1; i++) {
        temp.id = i;
        temp.email = users[i - 1].email;
        temp.grade = users[i - 1].grade;
        temp.hours = users[i - 1].hours;
        temp.name = users[i - 1].name;
        result.push(temp);
        temp = {
            id: 0,
            email: "",
            name: "",
            grade: 0,
            hours: 0,
            status: "active"
        };
    }

    return result;
};

export const getServices = async (): Promise<any> => {
    const res = await db.services.findMany();

    let temp = {
        m_id: "",
        id: 0,
        name: "",
        location: "",
        date: ""
    };

    const result: Array<typeof temp> = [];
    for (let i = 0; i < res.length; i++) {
        const year = res[i].date.getFullYear().toString();
        const month = res[i].date.getMonth().toString();
        const day = res[i].date.getDay().toString();

        const date = `${month}/${day}/${year}`;

        temp.id = i + 1;
        temp.m_id = res[i].id;
        temp.name = res[i].name;
        temp.location = res[i].location;
        temp.date = date;
        result.push(temp);
        temp = {
            m_id: "",
            id: 0,
            name: "",
            location: "",
            date: ""
        };
    }

    return result;
};

// user method
export const changePassword = async (email: string, oldPassword: string, newPassword: string): Promise<void> => {
    if (
        !email
        || typeof email !== "string"
    ) throw new Error("Invalid Session");

    if (email === process.env.ADMIN_EMAIL) throw new Error("Restricted Access");

    const user = await db.user.findUnique({
        where: {
            email: email
        }
    });

    if (!bcrypt.compareSync(oldPassword, user?.password!)) throw new Error("Bad Old Password");

    const res = await db.user.update({
        where: {
            email: email
        },
        data: {
            password: await hashPassword(newPassword)
        }
    });

    if (!res) throw new Error("Something went wrong!");
    redirect("/");
};

export const forgotPassword = async (email: string, password_initial: string): Promise<void> => {
    if (
        !email
        || typeof email !== "string"
        || !password_initial
        || typeof password_initial !== "string"
    ) throw new Error("Invalid Credentials");

    const user = await db.user.findUnique({
        where: {
            email: email
        }
    });
    if (!user) throw new Error("E-mail could not be found");
    if (bcrypt.compareSync(password_initial, user?.password_initial)) {
        const res = await db.user.update({
            where: {
                email: user?.email
            },
            data: {
                password: user?.password_initial
            }
        });

        if (!res) throw new Error("Something went wrong!");
        redirect("/forgot_success");
    }
    throw new Error("Invalid Credentials");
};

export const addService = async (userEmail: string, serviceId: string): Promise<any> => {
    if (
        !userEmail
        || typeof userEmail !== "string"
        || !serviceId
        || typeof serviceId !== "string"
    ) throw new Error("Something went wrong!");

    const user = await db.user.findFirst({
        where: {
            email: userEmail
        }
    });

    const services = user?.services;
    for (const service of services!) if (serviceId === service) return;
    services?.push(serviceId);

    const res = await db.user.update({
        where: {
            email: userEmail
        },
        data: {
            services: services
        }
    });

    if (!res) throw new Error("Something went wrong!");
    return res;
};

export const getUserService = async (serviceId: string, index = 0): Promise<any> => {
    if (
        typeof serviceId !== "string"
    ) throw new Error("Something went wrong!");
    if (!serviceId) return null;

    const res = await db.services.findFirst({
        where: {
            id: serviceId
        }
    });

    const year = res?.date.getFullYear().toString();
    const month = res?.date.getMonth().toString();
    const day = res?.date.getDay().toString();
    const date = `${month}/${day}/${year}`;

    const result = {
        m_id: res?.id,
        id: index,
        name: res?.name,
        location: res?.location,
        date: date
    };

    return result;
};

export const changeHighScore = async (userId: string, high_score: number): Promise<any> => {
    if (
        !userId
        || typeof userId !== "string"
        || typeof high_score !== "number"
    ) throw new Error("Something went wrong!");

    const res = await db.user.update({
        where: {
            id: userId
        },
        data: {
            high_score: high_score
        }
    });

    return res;
};

// administrator methods

export const deleteUser = async (email: string): Promise<any> => {
    if (
        !email
        || typeof email !== "string"
    ) throw new Error("Invalid Credentials");

    const res = await db.user.delete({
        where: {
            email: email
        }
    });

    if (!res) throw new Error("Something went wrong");
    return res;
};

export const deleteService = async (id: string): Promise<any> => {
    if (
        !id
        || typeof id !== "string"
    ) throw new Error("Invalid Credentials");

    const res = await db.services.delete({
        where: {
            id: id
        }
    });

    if (!res) throw new Error("Something went wrong");
    return res;
};

export const changeEmail = async (oldEmail: string, newEmail: string): Promise<string> => {
    if (
        !oldEmail
        || typeof oldEmail !== "string"
        || !newEmail
        || typeof newEmail !== "string"
    ) throw new Error("Invalid Credentials");

    const res = await db.user.update({
        where: { email: oldEmail },
        data: { email: newEmail }
    });

    if (!res) throw new Error("No email associated.");
    return "Success";
};

export const changeName = async (email: string, name: string): Promise<string> => {
    if (
        !email
        || typeof email !== "string"
        || !name
        || typeof name !== "string"
    ) throw new Error("Invalid Credentials");

    const res = await db.user.update({
        where: { email: email },
        data: { name: name }
    });

    if (!res) throw new Error("No email associated.");
    return "Success";
};

export const changeGrade = async (email: string, grade: number): Promise<string> => {
    if (
        !email
        || typeof email !== "string"
        || !grade
        || typeof grade !== "number"
    ) throw new Error("Invalid Credentials");

    const res = await db.user.update({
        where: { email: email },
        data: { grade: grade }
    });

    if (!res) throw new Error("No email associated.");
    return "Success";
};

export const changeHours = async (email: string, hours: number): Promise<string> => {
    if (
        !email
        || typeof email !== "string"
        || !hours
        || typeof hours !== "number"
    ) throw new Error("Invalid Credentials");

    const res = await db.user.update({
        where: { email: email },
        data: { hours: hours }
    });

    if (!res) throw new Error("No email associated.");
    return "Success";
};

export const changeName_Service = async (id: string, name: string): Promise<string> => {
    if (
        !id
        || typeof id !== "string"
        || !name
        || typeof name !== "string"
    ) throw new Error("Invalid Credentials");

    const res = await db.services.update({
        where: { id: id },
        data: { name: name }
    });

    if (!res) throw new Error("No email associated.");
    return "Success";
};

export const changeLocation_Service = async (id: string, location: string): Promise<string> => {
    if (
        !id
        || typeof id !== "string"
        || !location
        || typeof location !== "string"
    ) throw new Error("Invalid Credentials");

    const res = await db.services.update({
        where: { id: id },
        data: { location: location }
    });

    if (!res) throw new Error("No email associated.");
    return "Success";
};

export const changeDate_Service = async (id: string, date: Date): Promise<string> => {
    if (
        !id
        || typeof id !== "string"
        || !date
    ) throw new Error("Invalid Credentials");

    const res = await db.services.update({
        where: { id: id },
        data: { date: date }
    });

    if (!res) throw new Error("No email associated.");
    return "Success";
};
