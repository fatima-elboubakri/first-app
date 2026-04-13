"use client";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useAuthStore } from "../store";

export default function Header() {
  const isConnected = useAuthStore((s) => s.isConnected);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          eShop
        </Link>

        {/* Navigation */}
        {/*  <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/product"
            className="text-sm font-medium text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
          >
            Products
          </Link>

          <Link
            href="/orders"
            className="text-sm font-medium text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
          >
            Orders
          </Link>
        </nav> */}

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <ShoppingCart className="h-5 w-5" />
          </Link>

          <Link
            href={isConnected ? "/user" : "/user/signin"}
            className="rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 justify-between flex"
          >
            <User className="h-5 w-5" />
            <p>{isConnected ? "My Account" : "Sign In"}</p>
          </Link>
        </div>
      </div>
    </header>
  );
}
