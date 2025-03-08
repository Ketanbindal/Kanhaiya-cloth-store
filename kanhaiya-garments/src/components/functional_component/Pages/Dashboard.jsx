import React from "react";
import { FaTshirt, FaUsers, FaShoppingCart, FaChartLine } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-5 shadow-lg">
        <h2 className="text-xl font-bold mb-5">Clothing Store</h2>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaTshirt /> Products
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaUsers /> Customers
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaShoppingCart /> Orders
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaChartLine /> Sales
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="p-5 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-2xl font-bold">120</p>
          </div>
          <div className="p-5 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">Total Customers</h3>
            <p className="text-2xl font-bold">350</p>
          </div>
          <div className="p-5 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-2xl font-bold">$25,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}