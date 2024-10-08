/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductForm from "./_components/product-form";
import { getProduct } from "../products.api";

interface ProductsNewPageProps {
  params: {
    id: string;
  };
}

async function ProductsNewPage({ params }: ProductsNewPageProps) {
  console.log(params);
  const product = await getProduct(params.id);

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm product={product} />
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductsNewPage;
