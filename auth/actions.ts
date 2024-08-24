import { db } from "@/db";
import { auth } from "@/auth"


export const register_user = async (credentials: HTMLFormElement) => {
    if (typeof credentials?.email !== "string" || typeof credentials?.password !== "string") throw new Error("Invalid Credentials");
    
    const form = {
        email: credentials.email as string,
        password: credentials.password as string
        //etc.
    }

    if(await db.user.findUnique({
        where: {email: form.email}
    })) throw new Error("Email already exists");

    const res = await db.user.create({
        data: {
            email: form.email,
            password: form.password
            //etc.
        }
    }); 

    if(!res) throw new Error("Something went wrong.");
    return ("Success");
}

export const changeHours = async (email: string, hours: number) => {
    if(!email || !hours) return null; 

    const admin = await auth(); 
    if(admin?.user?.email !== process.env.ADMIN_EMAIL) throw new Error("Unauthorized"); 

    const user = await db.user.update({
        where: { email: email },
        data: { hours: hours }
    })

    if(!user) throw new Error("No email associated."); 
    return ("Success");
}

export const changeEmail = async (email: string, email_change: string) => { 
    if(!email || !email_change) return null; 

    const user = await db.user.update({
        where: { email: email },
        data: { email: email_change }
    })

    if(!user) throw new Error("No email associated."); 
    return ("Success");
}

//add change password