/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

export default async function Products() {
  const url = process.env.NEXT_PUBLIC_API_URL + "/product/list";
  const products: Product[] = await fetch(url).then((res) => res.json());

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      {/* Page title */}
      <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Products
      </h1>

      {/* Products grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col transition-shadow hover:shadow-lg dark:border-zinc-800"
          >
            <CardHeader>
              <CardTitle className="line-clamp-1 text-lg font-semibold">
                {product.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {product.category}
              </p>
            </CardHeader>

            <CardContent className="flex-1 space-y-3">
              <p className="line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                {product.description}
              </p>

              <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                ${product.price.toFixed(2)}
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between text-sm">
              <span
                className={
                  product.stock > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
              >
                {product.stock > 0 ? "In stock" : "Out of stock"}
              </span>

              <button
                className="rounded-md bg-black px-3 py-1.5 text-white transition hover:bg-zinc-800
                           dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Add to cart
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}