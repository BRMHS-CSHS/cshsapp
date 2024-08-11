import React from "react"
import Link from "next/link"
import Button from "./button"

const Navbar = () =>
    {
      return (
        <nav className="w-full h-14 bg-slate-300 shadow-xl">
          <Link href="/admin"><Button props="Admin"></Button> </Link>
        </nav>
      )
    }
  
export default Navbar;