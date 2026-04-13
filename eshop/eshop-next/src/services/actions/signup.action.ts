"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function signupAction(formData: FormData) {
  const rawData = Object.fromEntries(formData);

  const parsed = signUpSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { confirmPassword, ...payload } = parsed.data;
  const payloadWithRole = { ...payload, role: 'user' };
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payloadWithRole),
  });
console.log(res);
  if (!res.ok) {
    return {
      ok: false,
      errors: {
        server: ["Failed to create account"],
      },
    };
  }
  redirect("/user/signin");
  return { ok: true };
}
