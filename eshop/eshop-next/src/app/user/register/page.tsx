
 "use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { signupAction } from "@/src/services/actions/signup.action";
import { useActionState } from "react";

type FormState = {
  ok: boolean;
  errors: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  } | {
    server: string[];
  };
};

export default function SignUpPage() {
  const formAction = async (prevState: FormState, formData: FormData) => {
    return await signupAction(formData);
  };

  // @ts-expect-error Type mismatch with useActionState and server action return types
  const [state, dispatch] = useActionState(formAction, { ok: true, errors: {} });

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <Card className="w-full max-w-md dark:border-zinc-800">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Sign up to start shopping
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" action={dispatch}>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" required />
              {state.errors && 'username' in state.errors && state.errors.username && (
                <p className="text-sm text-red-600">{state.errors.username[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
              {state.errors && 'email' in state.errors && state.errors.email && (
                <p className="text-sm text-red-600">{state.errors.email[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
              {state.errors && 'password' in state.errors && state.errors.password && (
                <p className="text-sm text-red-600">{state.errors.password[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" required />
              {state.errors && 'confirmPassword' in state.errors && state.errors.confirmPassword && (
                <p className="text-sm text-red-600">{state.errors.confirmPassword[0]}</p>
              )}
            </div>

            {state.errors && 'server' in state.errors && state.errors.server && (
              <p className="text-sm text-red-600">{state.errors.server[0]}</p>
            )}

            <Button className="w-full" type="submit">
              Sign up
            </Button>

            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/user/signin"
                className="font-medium text-black hover:underline dark:text-white"
              >
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}