import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "antd";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import { useCreateSaleMutation } from "../../redux/features/sale/saleApi";
import { saleSchema } from "../../schemas/sale.schema";
import type { IProduct } from "../../types/product.type";
import CustomInput from "../form/CustomInput";
import CustomSelect from "../form/CustomSelect";
import PrimaryButton from "../ui/Button";

type TFormValues = z.infer<typeof saleSchema>;

type TProps = {
  onClose: () => void;
};

const SaleFormModal = ({ onClose }: TProps) => {
  const { data: productsRes } = useGetProductsQuery([
    { name: "limit", value: "1000" },
  ]);
  const products: IProduct[] = productsRes?.data || [];

  const [createSale, { isLoading }] = useCreateSaleMutation();

  const { handleSubmit, control, watch } = useForm<TFormValues>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      items: [{ product: "", quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = watch("items");

  const grandTotal = watchedItems.reduce((sum, item) => {
    const product = products.find((p) => p._id === item.product);
    if (!product || !item.quantity) return sum;
    return sum + product.sellingPrice * Number(item.quantity);
  }, 0);

  const productOptions = products.map((p) => ({
    label: `${p.name} (${p.sku}) - Stock: ${p.stockQuantity}`,
    value: p._id,
  }));

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    try {
      await createSale({
        items: data.items.map((item) => ({
          product: item.product,
          quantity: Number(item.quantity),
        })),
      }).unwrap();
      onClose();
    } catch {
      // failure toast already handled in saleApi.onQueryStarted
    }
  };

  return (
    <Modal
      open
      title="Add Sale"
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={600}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-3">
              <div className="flex-1">
                <CustomSelect
                  label="Product"
                  name={`items.${index}.product`}
                  control={control}
                  placeholder="Select product"
                  options={productOptions}
                />
              </div>
              <div className="w-28">
                <CustomInput
                  label="Quantity"
                  name={`items.${index}.quantity`}
                  type="number"
                  control={control}
                  placeholder="1"
                />
              </div>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-gray-500 hover:text-red-600 mb-2"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => append({ product: "", quantity: 1 })}
          className="flex items-center gap-2 text-primary text-sm font-medium"
        >
          <Plus size={16} /> Add Item
        </button>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-600">
            Estimated Total
          </span>
          <span className="text-lg font-semibold text-gray-800">
            {grandTotal.toFixed(2)}
          </span>
        </div>

        <div className="pt-2">
          <PrimaryButton
            type="submit"
            isLoading={isLoading}
            loadingText="Recording..."
            className="!w-full"
          >
            Record Sale
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
};

export default SaleFormModal;
