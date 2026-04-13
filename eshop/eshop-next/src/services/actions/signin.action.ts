"use server";

import { z } from "zod";

const signInSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export async function signInAction(
  prevState: any,
  formData: FormData
) {
  const payload = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const parsed = signInSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Invalid credentials",
    };
  }

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/auth/signin",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    }
  );

  if (!res.ok) {
    return {
      ok: false,
      message: "Login failed",
    };
  }

  // ✅ success
  return {
    ok: true,
    message: "Login successful",
  };
}