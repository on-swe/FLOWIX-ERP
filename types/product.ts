
export interface Product {
    id: string;
    sku: string;
    barcode?: string;
    name: string;
    category: string;
    stock: number;
    minStock: number;
    price: number;
    cost: number;
    status: "in-stock" | "low-stock" | "out-of-stock";
    lastUpdated: string;
    location: string;
    supplier: string;
    images?: string[];
    description?: string;
    weight?: number;
    dimensions?: string;
    expiryDate?: string;
  }
  