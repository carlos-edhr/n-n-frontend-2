import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getProducts } from "./products/products.api";

import React from "react";
import ProductCard from "./products/_components/product-card";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  console.log(products);
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Next Nest App</h1>

        <Link className={buttonVariants()} href="/products/new">
          Create Product
        </Link>
      </div>
      <div className="grid px-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 pt-8">
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </>
  );
}
