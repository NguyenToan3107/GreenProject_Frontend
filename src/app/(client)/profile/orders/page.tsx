import Sidebar from "@/app/(client)/_components/Sidebar";
import React from "react";

const products = [
  {
    id: 1,
    imageUrl: "/client/products/product2.png",
    name: "Giỏ đựng tre nứa",
    category: "Loại 1",
    quantity: 2,
    price: 100000,
    orderTime: new Date(),
  },
];

export default function Page() {
  return (
    <div className="flex w-full h-screen justify-between my-16 px-6">
      {/* Sidebar */}
      <Sidebar />

      {/* Orders */}
      <div className="w-4/5 bg-white p-16 shadow-lg h-[600px] overflow-auto">
        <h1 className="text-2xl font-bold mb-3">Đơn Mua</h1>
        <p className="mb-2">Quản lý thông tin đơn mua</p>

        <div className="flex flex-col space-y-4 mt-10 ml-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-start justify-between p-4 border border-gray-300 rounded-lg"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-32 h-32 object-cover"
              />
              <div className="ml-6 flex-grow">
                <h4 className="text-lg font-semibold">{product.name}</h4>
                <p className="text-gray-600">{product.category}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <p>Số lượng: {product.quantity}</p>
                    <p className="font-bold">
                      Giá: {product.price.toLocaleString()} VNĐ
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(product.orderTime).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                      Mua lại
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
