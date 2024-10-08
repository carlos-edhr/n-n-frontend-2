"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { deleteProduct } from "../products.api";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductCard = ({ product }: any) => {
  const router = useRouter();

  async function handleRemoveProduct(id: string) {
    await deleteProduct(id);
    router.refresh();
  }
  return (
    <>
      <Card
        onClick={() => {
          router.push(`/products/${product.id}`);
        }}
        key={product.id}
      >
        <CardHeader>
          <CardTitle className="flex justify-between">
            {product.name}
            <span className="text-sm text-muted-foreground">
              ${product.price}
            </span>
          </CardTitle>
        </CardHeader>
        <img src={product.image} alt="" />
        <CardContent>
          <p>{product.description}</p>
          <CardFooter className="flex justify-between">
            <Button
              className="mt-5"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/products/${product.id}/edit`);
              }}
            >
              Editar
            </Button>
            <Button
              onClick={() => handleRemoveProduct(product.id)}
              className="mt-5"
              variant="destructive"
            >
              Eliminar
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
