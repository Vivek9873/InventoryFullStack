"use client";

import { useState, useEffect } from "react";
import { productAPI } from "@/app/lib/api";
import { Product } from "@/app/types/index";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import SellerProductCard from "@/app/components/SellerProductCard";
import AddProductModal from "@/app/components/AddProductModal";

export default function SellerDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    if (user?.role !== "Seller") {
      router.push("/products");
      return;
    }
    fetchMyProducts();
  }, [isAuthenticated, user]);

  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getMyProducts();
      setProducts(response.data);
    } catch (err: unknown) {
      if (err instanceof Error)
        setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await productAPI.delete(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err: unknown) {
      if (err instanceof Error)
        alert(err.message || "Failed to delete product");
    }
  };

  const handleProductAdded = () => {
    fetchMyProducts();
    setIsModalOpen(false);
  };

  if (!isAuthenticated || user?.role !== "Seller") {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Products</h1>
          <p className="text-gray-600">Manage your inventory</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Product
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No products yet
          </h3>
          <p className="mt-1 text-gray-500">
            Get started by adding your first product
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Add Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <SellerProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
              onUpdate={fetchMyProducts}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <AddProductModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleProductAdded}
        />
      )}
    </div>
  );
}
