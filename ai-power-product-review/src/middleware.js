import { NextResponse } from "next/server";

export function middleware(req) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("AIToken")?.value || "";
  const userOnly = path === "/userAnalysis";
  const newUser = path === "/verify-email";
  const resetPwd = path === "/resetpassword";
  if (!token && userOnly) {
    return NextResponse.redirect(new URL("/", req.url), { status: 307 });
  }
  if (token && (newUser || resetPwd)) {
    return NextResponse.redirect(new URL("/", req.url), { status: 307 });
  }
}

export const config = {
  matcher: ["/", "/about", "/userAnalysis", "/analysis", "/verify-email", "/resetpassword"],
};
