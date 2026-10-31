import { cookies } from "next/headers";
import { getUserById } from "./data";

export const SESSION_COOKIE = "apex_session";

export async function getCurrentUser() {
  const jar = await cookies();
  const val = jar.get(SESSION_COOKIE)?.value;
  if (!val) return null;
  return getUserById(val) ?? null;
}

export async function setSession(userId: string) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, userId, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax" });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}