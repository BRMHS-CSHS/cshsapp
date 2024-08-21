"use client";

import React from "react";
import Link from "next/link";
import Button from "../button";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth";

const handleClick = async () => {
  logout();
};

const Navbar = () => {
  const user = null; // wip
  const path = usePathname();
  let prop, link: any, click;
  switch (path) {
    case "/":
      prop = "Admin";
      link = "/admin";
      break;
    case "/admin":
      prop = "User";
      link = "/";
      break;
    case "/admin/dashboard":
      prop = "Sign-out";
      link = "/admin";
      click = handleClick;
      break;
    case "/dashboard":
      prop = "Sign-Out";
      link = "/";
      click = handleClick;
      break;
    default:
      prop = "";
      link = "";
  }
  return (
    <nav className="flex items-center w-full h-14 bg-slate-300 shadow-xl">
      <div className="grid grid-cols-3">
        <Link href={link} onClick={click}>
          <Button props={prop}></Button>
        </Link>
        <div className="flex justify-center items-center">{user}</div>
      </div>
    </nav>
  );
};

export default Navbar;
