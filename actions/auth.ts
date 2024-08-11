"use server"
import { signIn, signOut } from "@/auth"
import { revalidatePath } from "next/cache";
import { db } from "@/db"
import { AuthError } from "next-auth";
import { saltAndHashPassword } from "@/utils/helper";
import { redirect } from "next/navigation";

export const login = async (provider: string) =>
    {
        await signIn(provider, { redirectTo: "/dashboard" })
    }

export const logout = async () =>
    {
        await signOut({ redirectTo: "/" }); 
        revalidatePath("/")
    }

export const loginCreds = async (formData:FormData) =>
    {
        const rawFormData = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            redirectTo: "/dashboard"
        }

        try {
            await signIn("credentials", rawFormData);
        } catch (error : any) {
            if(error instanceof AuthError)
                {
                    switch(error.type)
                    {
                        case "CredentialsSignin":
                            return {error : "Invalid Credentials" }
                        default:
                            return { error: "Something went wrong!" }
                    }
                }
            throw error; 
        }
        revalidatePath("/")
    }

export const loginCreds_ADMIN = async (formData:FormData) =>
    {
        const rawFormData = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            redirectTo: "/admin/dashboard"
        }

        try {
            await signIn("admin", rawFormData);
        } catch (error : any) {
            if(error instanceof AuthError)
                {
                    switch(error.type)
                    {
                        case "CredentialsSignin":
                            return {error : "Invalid Credentials" }
                        default:
                            return { error: "Something went wrong!" }
                    }
                }
            throw error; 
        }
        revalidatePath("/")
    }

export const register = async (formData : FormData) =>
{   
    const rawFormData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: saltAndHashPassword(formData.get("password") as string),
        hours: parseInt(String(formData.get("hours"))),
        redirectTo: "/dashboard"
    }

    const user = await db.user.findUnique({
        where: { email: rawFormData.email }
    })

    if(user) return { error: "Email already exists" };

    const res = await db.user.create({
        data: {
            name: rawFormData.name,
            email: rawFormData.email,
            password: rawFormData.password,
            hours: rawFormData.hours
        }
    })

}

export const getData = async () =>
{
    const collection = await db.user.findMany()
    return collection; 
}