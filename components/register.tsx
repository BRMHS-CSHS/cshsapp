import React from "react";
import { useRouter } from "next/navigation";
import { register } from "@/actions/auth";

var validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

var error = null;

const RegisterPage = () => {
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    const email = e.get("email") as string;

    if (!email.match(validRegex)) {
      alert("Invalid email address!");
      return false;
    }

    const res = await register(e);

    error = res?.error;
    if (error) alert(error);
    else alert("Successful.");
  };
  return (
    <div className="bg-slate-400 rounded-lg p-3 outline">
      <div className="my-5 flex flex-col items-center justify-center font-mono">
        <h1 className="text-lg font-bold tracking-wider">Register A User</h1>
        <form action={handleSubmit} className="">
          <input
            className="text-red-600 outline outline-red-600 text-lg rounded-t placeholder-red-600 hover:outline-green-500 transition ease-in-out hover:drop-shadow caret-transparent"
            name="name"
            type="text"
            placeholder="Name"
          ></input>
          <br></br>
          <br></br>
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
            className="text-red-600 outline outline-red-600 my-3 text-lg rounded-b placeholder-red-600 hover:outline-green-500 transition ease-in-out hover:drop-shadow caret-transparent"
            name="hours"
            type="number"
            placeholder="Hours"
          ></input>
          <br></br>
          <input
            type="submit"
            className="text-white size-100 bg-red-600 rounded-md h-11 w-20 cursor-pointer hover:bg-green-500 transition ease-in-out hover:drop-shadow "
          ></input>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
