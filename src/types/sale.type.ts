export type ISaleItem = {
  product: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

export type ISale = {
  _id: string;
  items: ISaleItem[];
  grandTotal: number;
  soldBy: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
};
