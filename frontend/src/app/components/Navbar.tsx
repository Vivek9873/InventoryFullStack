"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  if (!isAuthenticated || pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link
              href="/products"
              className="text-2xl font-bold text-indigo-600"
            >
              Inventory
            </Link>
            <Link
              href="/products"
              className={`${
                pathname === "/products"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              } px-3 py-2 text-sm font-medium transition-colors`}
            >
              All Products
            </Link>
            {user?.role === "Seller" && (
              <Link
                href="/seller/dashboard"
                className={`${
                  pathname.startsWith("/seller")
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                } px-3 py-2 text-sm font-medium transition-colors`}
              >
                My Products
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {user?.username}
                </span>
                <span className="text-xs text-gray-500">{user?.role}</span>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
