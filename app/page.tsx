"use client";
import { useRouter } from "next/navigation";
import { loginCreds } from "@/actions/auth";

export default function Home() {
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    const user = await loginCreds(e);
    if (user?.error) alert(user.error);
  };

  return (
    <main>
      <div className="my-5 flex flex-col items-center justify-center font-mono">
        <h1 className="font-bold text-lg tracking-wider">User Login</h1>
        <form action={handleSubmit}>
          <input
            className="text-slate-600 outline outline-slate-600 text-lg rounded-t placeholder-slate-600 hover:outline-green-500 transition ease-in-out hover:drop-shadow caret-transparent"
            name="email"
            type="text"
            placeholder="E-Mail"
          ></input>
          <br></br>
          <input
            type="password"
            className="text-slate-600 outline outline-slate-600 my-3 text-lg rounded-b placeholder-slate-600 hover:outline-green-500 transition ease-in-out hover:drop-shadow caret-transparent"
            name="password"
            placeholder="Password"
          ></input>
          <br></br>
          <input
            type="submit"
            className="text-white size-100 bg-slate-600 rounded-md h-11 w-20 cursor-pointer hover:bg-green-500 transition ease-in-out hover:drop-shadow "
          ></input>
        </form>
      </div>
    </main>
  );
}
