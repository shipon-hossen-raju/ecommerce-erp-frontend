import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "antd";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../redux/features/product/productApi";
import { productSchema } from "../../schemas/product.schema";
import type { IProduct } from "../../types/product.type";
import CustomInput from "../form/CustomInput";
import ImageUpload from "../form/ImageUpload";
import PrimaryButton from "../ui/Button";

type TFormValues = z.infer<typeof productSchema>;

type TProps = {
  product: IProduct | null;
  onClose: () => void;
};

const ProductFormModal = ({ product, onClose }: TProps) => {
  const isEdit = !!product;

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(product?.image ?? null);
  const [imageError, setImageError] = useState(false);

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const { handleSubmit, control } = useForm<TFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? "",
      sku: product?.sku ?? "",
      category: product?.category ?? "",
      purchasePrice: product?.purchasePrice ?? 0,
      sellingPrice: product?.sellingPrice ?? 0,
      stockQuantity: product?.stockQuantity ?? 0,
    },
  });

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    if (!isEdit && !image) {
      setImageError(true);
      return;
    }

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        name: data.name,
        sku: data.sku,
        category: data.category,
        purchasePrice: data.purchasePrice,
        sellingPrice: data.sellingPrice,
        stockQuantity: data.stockQuantity,
      }),
    );
    if (image) {
      formData.append("image", image);
    }

    try {
      if (isEdit && product) {
        await updateProduct({ id: product._id, data: formData }).unwrap();
      } else {
        await createProduct(formData).unwrap();
      }
      onClose();
    } catch {
      // failure toast already handled in productApi.onQueryStarted
    }
  };

  return (
    <Modal
      open
      title={isEdit ? "Edit Product" : "Add Product"}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <ImageUpload
          title="Product Image"
          image={image}
          setImage={setImage}
          preview={preview}
          setPreview={setPreview}
          setIconError={() => setImageError(true)}
        />
        {imageError && !image && (
          <p className="text-red-600 text-sm -mt-2">
            Product image is required
          </p>
        )}

        <CustomInput
          label="Product Name"
          name="name"
          control={control}
          placeholder="Enter product name"
        />
        <CustomInput
          label="SKU"
          name="sku"
          control={control}
          placeholder="Enter SKU"
        />
        <CustomInput
          label="Category"
          name="category"
          control={control}
          placeholder="Enter category"
        />
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            label="Purchase Price"
            name="purchasePrice"
            type="number"
            control={control}
            placeholder="0.00"
          />
          <CustomInput
            label="Selling Price"
            name="sellingPrice"
            type="number"
            control={control}
            placeholder="0.00"
          />
        </div>
        <CustomInput
          label="Stock Quantity"
          name="stockQuantity"
          type="number"
          control={control}
          placeholder="0"
        />

        <div className="pt-2">
          <PrimaryButton
            type="submit"
            isLoading={isCreating || isUpdating}
            loadingText={isEdit ? "Updating..." : "Creating..."}
            className="!w-full"
          >
            {isEdit ? "Update Product" : "Create Product"}
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
};

export default ProductFormModal;
