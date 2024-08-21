import React from "react";
import Link from "next/link";
import Button from ".././button";
import { logout } from "@/actions/auth";
import { auth } from "@/auth";

const Navbar_user = async () => {
  const user = (await auth())?.user;

  return (
    <nav className="flex flex-row justify-between items-center w-full h-14 bg-slate-300 shadow-xl">
      <Link href="/">
        <Button props="Logout" action={await logout}></Button>
      </Link>
      <h1 className="font-bold text-3xl">{user?.email}</h1>
      <div>
        <Button props="Service History"></Button>
      </div>
    </nav>
  );
};

export default Navbar_user;
