import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/admin/dashboard"]
const protectedRoutes_user = ["/admin/dashboard"]
const protectedRoutes_admin = ["/dashboard"]

export async function middleware(req : NextRequest) {
    const res = NextResponse.next(); 
    const session = (await auth())?.user;
    const isLoggedIn : boolean = session ? true : false; 
    let isProtected : boolean = protectedRoutes.includes(req.nextUrl.pathname);

    res.headers.set("username", session?.name as string)
    res.headers.set("next-url", req.nextUrl.pathname)

    if(!isLoggedIn && isProtected) return NextResponse.redirect((new URL("/", req.nextUrl.origin)).toString());
    
    const isAdmin = session?.email === process.env.ADMIN_EMAIL;
    isProtected = protectedRoutes_user.includes(req.nextUrl.pathname);
    
    if(!isAdmin && isProtected) return NextResponse.redirect((new URL("/dashboard", req.nextUrl.origin)).toString());
    
    return res;
}

export const config = {
    matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
  };