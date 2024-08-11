"use client";
import { loginCreds, register } from "@/actions/auth";
import { useRouter } from "next/navigation";
import Userlist from "@/components/userlist";

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-3 my-5">
        <h1 className="my-5 flex items-center justify-center font-bold text-lg tracking-wider">
          List of Users
        </h1>
        <div className="">
          <Userlist />
        </div>
      </div>
      <div className="my-5 flex flex-col items-center justify-center font-mono"></div>
    </main>
  );
}
