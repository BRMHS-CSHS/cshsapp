import React from "react";
import Link from "next/link";
import Button from ".././button";
import { logout } from "@/actions/auth";

const Navbar_admin = async () => {
  return (
    <nav className="flex items-center w-full h-14 bg-slate-300 shadow-xl">
      <Link href="/">
        <Button props="Logout" action={await logout}></Button>{" "}
      </Link>
    </nav>
  );
};

export default Navbar_admin;
