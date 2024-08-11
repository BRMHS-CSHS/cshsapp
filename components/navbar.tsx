"use client"

import React from "react"
import Link from "next/link"
import Button from "./button"
import { usePathname } from "next/navigation"
import { logout } from "@/actions/auth"

const handleClick = async () =>
    {
      logout();
    }

const Navbar = () =>
    {
      const path = usePathname(); 
      let prop, link : any, click; 
      switch(path)
      {
        case "/":
          prop = "Admin"
          link = "/admin"
          console.log(prop)
          break;
        case "/admin":
          prop = "User"
          link = "/"
          break;
        case "/admin/dashboard":
          prop = "Sign-out"
          link = "/admin"
          break;
        case "/dashboard":
          prop = "Sign-Out"
          link = "/"
          click = handleClick
          break;
        default:
          prop = ""
          link = ""
      }

      return (
        <nav className="w-full h-14 bg-slate-300 shadow-xl">
          <Link href={link} onClick={click}><Button props={prop}></Button></Link>
        </nav>
      )
    }
  
export default Navbar;