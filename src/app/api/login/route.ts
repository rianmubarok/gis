import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  const adminUser = process.env.ADMIN_USER || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (username === adminUser && password === adminPassword) {
    const redirectUrl =
      (formData.get("from") as string) || "/admin";

    const res = NextResponse.redirect(new URL(redirectUrl, req.url));
    res.cookies.set("admin_auth", "1", {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return res;
  }

  const url = new URL("/login", req.url);
  url.searchParams.set("error", "invalid");
  return NextResponse.redirect(url);
}


