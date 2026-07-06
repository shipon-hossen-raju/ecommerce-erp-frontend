import { Modal } from "antd";
import { useDeleteProductMutation } from "../../redux/features/product/productApi";
import type { IProduct } from "../../types/product.type";
import PrimaryButton from "../ui/Button";

type TProps = {
  product: IProduct;
  onClose: () => void;
};

const DeleteProductModal = ({ product, onClose }: TProps) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      await deleteProduct(product._id).unwrap();
      onClose();
    } catch {
      // failure toast already handled in productApi.onQueryStarted
    }
  };

  return (
    <Modal
      open
      title="Delete Product"
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <p className="text-gray-600 my-4">
        Are you sure you want to delete{" "}
        <span className="font-semibold">{product.name}</span>? This action
        cannot be undone.
      </p>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <PrimaryButton
          onClick={handleDelete}
          isLoading={isLoading}
          loadingText="Deleting..."
          className="!w-auto px-4 bg-red-600 border-red-600 hover:bg-transparent hover:text-red-600"
        >
          Delete
        </PrimaryButton>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;
