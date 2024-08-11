import React from "react";
import { auth } from "@/auth";


const Dashboard = async () =>
    {
        const user : any = (await auth())?.user

        return (
            <div className="font-mono box-border h-72 w-96 p-4 border-4 border-slate-700 bg-slate-400">
                <h1 className="flex justify-center font-extrabold">Welcome, {user?.name}</h1>
                <div className="grid grid-cols-4">
                    <p className="flex justify-center font-mono box-border w-52 p-4 my-4 border-4 border-slate-700 bg-slate-400 text-2xl">Hours: {user?.hours}</p>
                </div>
            </div>
        )
    }

export default Dashboard