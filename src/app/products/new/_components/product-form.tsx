"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { createProduct, updateProduct } from "../../products.api";
import { useParams, useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductForm = ({ product }: any) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      image: product?.image,
    },
  });
  const router = useRouter();
  const params = useParams<{ id: string }>();
  console.log(params);
  const onSubmit = handleSubmit(async (data) => {
    if (params?.id) {
      const res = await updateProduct(params.id, {
        ...data,
        price: parseFloat(data.price),
      });
      console.log(res);
    } else {
      await createProduct({
        ...data,
        price: parseFloat(data.price),
      });
    }

    router.push("/");
    router.refresh();
  });
  return (
    <form onSubmit={onSubmit}>
      <label>Product Name</label>
      <Input {...register("name")} />
      <label>Description</label>
      <Input {...register("description")} />
      <label>Price</label>
      <Input {...register("price")} />
      <label>Image</label>
      <Input {...register("image")} />
      <Button> {params.id ? "Update Product" : "Create Product"}</Button>
    </form>
  );
};

export default ProductForm;
