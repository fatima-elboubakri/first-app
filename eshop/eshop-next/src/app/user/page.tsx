import { Package, ShoppingCart, Settings } from "lucide-react";
import Link from "next/link";

export default function User() {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="mb-8 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Dashboard
        </h2>

        <ul className="space-y-2">
          <li>
            <Link className="flex w-full items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-black dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white" href={"/product"}>
              <Package className="h-5 w-5" />
              Products
            </Link>
          </li>

          <li>
            <Link className="flex w-full items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-black dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white" href={"/order"}>
              <ShoppingCart className="h-5 w-5" />
              Orders
            </Link>
          </li>

          <li>
            <Link className="flex w-full items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-black dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white" href={"/settings"}>
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col p-8">
        <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Orders
        </h1>

        <div className="rounded-lg border bg-white p-6 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
          Active tab detail: list orders / settings
        </div>
      </main>
    </div>
  );
}