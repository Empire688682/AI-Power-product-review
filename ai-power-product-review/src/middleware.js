import { NextResponse } from "next/server";

export function middleware(req) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("AIToken").value || "";

}

export const config = {
  matcher: [
    "/", 
    "/about", 
    "/user", 
    "/analysis"
  ],
};
