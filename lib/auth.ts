import { cookies } from "next/headers";

const ADMIN_KEY = "amc@!FpU28<xf_`t]KP3y9";
const AUTH_COOKIE = "santika_auth";

export function validateAdminKey(key: string) {
  return key === ADMIN_KEY;
}

export function setAuthCookie() {
  cookies().set(AUTH_COOKIE, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export function clearAuth() {
  cookies().delete(AUTH_COOKIE);
}