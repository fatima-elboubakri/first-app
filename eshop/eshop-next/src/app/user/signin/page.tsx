"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { signInAction } from "@/src/services/actions/signin.action";
import { useAuthStore } from "@/src/store";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/dist/client/components/navigation";

export default function SignInPage() {
 
const [state, formAction] = useActionState(signInAction, {
    ok: false,
    message: "",
  });

  const login = useAuthStore((s) => s.login);
  const router = useRouter();


  useEffect(() => {
    if (state.ok) {
      login();              
      router.push("/");     
    }
  }, [state, login, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <Card className="w-full max-w-md dark:border-zinc-800">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">
            Welcome back
          </CardTitle>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Sign in to your account
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" action={formAction}>
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="yourname"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-xs text-zinc-500 hover:underline dark:text-zinc-400"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Submit */}
            <Button className="w-full">
              Sign in
            </Button>

            {/* Signup link */}
            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              Don’t have an account?{" "}
              <Link
                href="/user/register"
                className="font-medium text-black hover:underline dark:text-white"
              >
                Sign up
              </Link>
            </p>
            <p>{state?.message || ""}</p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}