import { cookies } from "next/headers";
import { getUserById, getUserByEmail, createUser } from "./data";
import { createSupabaseServerClient, isSupabaseConfigured } from "./supabase-server";

export const SESSION_COOKIE = "apex_session";

export async function getCurrentUser() {
  // Supabase path
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const email = user.email || "";
        let profile = getUserByEmail(email);
        if (!profile) {
          // sync: create in-memory profile for this Supabase user
          const username = (user.user_metadata?.username || email.split("@")[0] || "user").slice(0, 20);
          const safeUsername = username.replace(/[^a-zA-Z0-9_]/g, "") || "user";
          profile = createUser({ username: safeUsername, email, password: "" });
          // store supabase id mapping by overwriting id? keep email as key
        }
        // attach avatar from metadata if present
        if (user.user_metadata?.avatar_url) profile.avatar = user.user_metadata.avatar_url;
        if (user.user_metadata?.reason) profile.reason = user.user_metadata.reason;
        return profile;
      }
    } catch { /* fall through */ }
    return null;
  }
  // Demo path
  const jar = await cookies();
  const val = jar.get(SESSION_COOKIE)?.value;
  if (!val) return null;
  return getUserById(val) ?? null;
}

export async function setSession(userId: string) {
  if (isSupabaseConfigured()) return; // Supabase manages its own session
  const jar = await cookies();
  jar.set(SESSION_COOKIE, userId, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax" });
}

export async function clearSession() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createSupabaseServerClient();
      await supabase.auth.signOut();
    } catch { /* ignore */ }
    return;
  }
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}