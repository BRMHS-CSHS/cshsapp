"use client";
import Link from "next/link";
import Button from "../../components/button";
import { loginCreds_ADMIN } from "@/actions/auth";

export default function Home() {
  const handleSubmit = async (e: any) => {
    const user = await loginCreds_ADMIN(e);
    if (user?.error) alert(user?.error);
  };

  return (
    <main>
      <div className="my-5 flex flex-col items-center justify-center font-mono">
        <h1 className="text-lg font-bold tracking-wider">Admin Login</h1>
        <form action={handleSubmit} className="">
          <input
            className="text-red-600 outline outline-red-600 text-lg rounded-t placeholder-red-600 hover:outline-green-500 transition ease-in-out hover:drop-shadow caret-transparent"
            name="email"
            type="text"
            placeholder="E-Mail"
          ></input>
          <br></br>
          <input
            className="text-red-600 outline outline-red-600 my-3 text-lg rounded-b placeholder-red-600 hover:outline-green-500 transition ease-in-out hover:drop-shadow caret-transparent"
            name="password"
            type="password"
            placeholder="Password"
          ></input>
          <br></br>
          <input
            type="submit"
            className="text-white size-100 bg-red-600 rounded-md h-11 w-20 cursor-pointer hover:bg-green-500 transition ease-in-out hover:drop-shadow "
          ></input>
        </form>
      </div>
    </main>
  );
}
