import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes_admin = ["/admin"];
const protectedRoutes_user = ["/dashboard", "/contact_page", "/settings", "/service-history"];

export async function middleware (req: NextRequest): Promise<any> {
    const session = (await auth());

    // hack temp because no db access to fix
    if (session?.user?.email !== process.env.ADMIN_EMAIL && (session?.user as any)?.role !== "Admin" && protectedRoutes_admin.includes(req.nextUrl.pathname)) {
        const url = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(url.toString());
    }

    if (!session?.user && protectedRoutes_user.includes(req.nextUrl.pathname)) {
        const url = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(url.toString());
    }
}
