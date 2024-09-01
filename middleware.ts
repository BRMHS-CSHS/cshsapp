import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/admin"];

export async function middleware (req: NextRequest): Promise<any> {
    const session = (await auth());
    if ((session?.user as any)?.role !== "Admin" && protectedRoutes.includes(req.nextUrl.pathname)) {
        const url = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(url.toString());
    }
}
