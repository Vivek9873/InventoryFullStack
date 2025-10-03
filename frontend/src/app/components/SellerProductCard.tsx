"use client";

import { useState } from "react";
import { Product } from "@/app/types";
import Image from "next/image";
import EditProductModal from "@/app/components/EditProductModal";

interface SellerProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

export default function SellerProductCard({
  product,
  onDelete,
  onUpdate,
}: SellerProductCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 w-full bg-gray-200">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
              {product.name}
            </h3>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
              {product.type}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-indigo-600">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500">
                Stock: {product.quantity} units
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditProductModal
          product={product}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={() => {
            onUpdate();
            setIsEditModalOpen(false);
          }}
        />
      )}
    </>
  );
}
