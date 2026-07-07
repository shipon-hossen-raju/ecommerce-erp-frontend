import { Pagination } from "antd";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import NoDataFount from "../../components/card/NoDataFount";
import ServerErrorCard from "../../components/card/ServerErrorCard";
import ListLoading from "../../components/loader/ListLoading";
import DeleteProductModal from "../../components/product/DeleteProductModal";
import ProductFormModal from "../../components/product/ProductFormModal";
import PrimaryButton from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import { getUserInfo } from "../../helper/SessionHelper";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import type { IMeta } from "../../types/global.type";
import type { IProduct } from "../../types/product.type";

const LOW_STOCK_THRESHOLD = 5;
const PAGE_LIMIT = 10;

const ProductsPage = () => {
  const user = getUserInfo();
  const canManage = user?.role === "ADMIN" || user?.role === "MANAGER";

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [formModal, setFormModal] = useState<{
    open: boolean;
    product: IProduct | null;
  }>({ open: false, product: null });

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    product: IProduct | null;
  }>({ open: false, product: null });

  const {
    data: resData,
    isLoading,
    isError,
  } = useGetProductsQuery([
    { name: "searchTerm", value: search },
    { name: "page", value: String(page) },
    { name: "limit", value: String(PAGE_LIMIT) },
  ]);

  if (isLoading) {
    return <ListLoading />;
  }

  if (isError) {
    return <ServerErrorCard />;
  }

  const products: IProduct[] = resData?.data || [];
  const meta: IMeta | null = resData?.meta || null;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Products</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchInput
            placeholder="Search by name, SKU or category"
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />
          {canManage && (
            <PrimaryButton
              className="!w-auto px-4"
              onClick={() => setFormModal({ open: true, product: null })}
            >
              <Plus size={18} /> Add Product
            </PrimaryButton>
          )}
        </div>
      </div>

      {products.length === 0 ? (
        <NoDataFount text="No products found" />
      ) : (
        <div className="bg-white rounded-card-radius shadow-card-shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Purchase Price</th>
                <th className="px-4 py-3">Selling Price</th>
                <th className="px-4 py-3">Stock</th>
                {canManage && <th className="px-4 py-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {products.map((product) => {
                const isLowStock = product.stockQuantity < LOW_STOCK_THRESHOLD;
                return (
                  <tr
                    key={product._id}
                    className={isLowStock ? "bg-red-50" : ""}
                  >
                    <td className="px-4 py-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {product.name}
                    </td>
                    <td className="px-4 py-3">{product.sku}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">
                      {product.purchasePrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      {product.sellingPrice.toFixed(2)}
                    </td>
                    <td className={`px-4 py-3 ${isLowStock && "text-red"}`}>
                      {product.stockQuantity}
                      {isLowStock && (
                        <span className="ml-2 text-xs font-medium">
                          Low Stock
                        </span>
                      )}
                    </td>
                    {canManage && (
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setFormModal({ open: true, product })
                            }
                            className="text-gray-500 hover:text-primary"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteModal({ open: true, product })
                            }
                            className="text-gray-500 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {meta && meta.total > 0 && (
        <div className="flex justify-end mt-4">
          <Pagination
            current={meta.page}
            pageSize={meta.limit}
            total={meta.total}
            onChange={(newPage) => setPage(newPage)}
            showSizeChanger={false}
          />
        </div>
      )}

      {formModal.open && (
        <ProductFormModal
          product={formModal.product}
          onClose={() => setFormModal({ open: false, product: null })}
        />
      )}

      {deleteModal.open && deleteModal.product && (
        <DeleteProductModal
          product={deleteModal.product}
          onClose={() => setDeleteModal({ open: false, product: null })}
        />
      )}
    </div>
  );
};

export default ProductsPage;
