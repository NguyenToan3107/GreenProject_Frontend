import Sidebar from "@/app/(client)/_components/Sidebar";
import React from "react";
import { Form, Input, Button } from "antd";

const products = [
  {
    id: 1,
    imageUrl: "/client/products/product2.png",
    name: "Giỏ đựng tre nứa",
    category: "Loại 1",
    quantity: 2,
    price: 100000,
  },
  {
    id: 2,
    imageUrl: "/client/products/product2.png",
    name: "Giỏ đựng tre nứa",
    category: "Loại 1",
    quantity: 2,
    price: 100000,
  },
  {
    id: 3,
    imageUrl: "/client/products/product2.png",
    name: "Giỏ đựng tre nứa",
    category: "Loại 1",
    quantity: 2,
    price: 100000,
  },
];

export default function Page() {
  const totalPrice = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  return (
    <div className="flex w-full h-screen justify-between my-16 px-6">
      {/* Sidebar */}
      <Sidebar />

      {/* Orders */}
      <div className="w-4/5 bg-white p-12 shadow-lg h-[600px] overflow-auto">
        <h1 className="text-2xl font-bold mb-3">Đơn Mua</h1>
        <p className="mb-2">Quản lý thông tin đơn mua</p>

        <div className="flex flex-col mt-6">
          <div className="flex justify-between">
            <p className="text-xl ml-7">Đơn hàng #1</p>
            <p className="font-thin text-xs">
              Thời gian đặt hàng: 12:30 15/11/2024
            </p>
          </div>
          <div className="flex flex-col space-y-4 ml-6 h-60 overflow-y-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center p-2 border-b rounded-lg"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-24 h-24 object-cover"
                />
                <div className="ml-6 flex-grow items-start">
                  <h4 className="text-lg font-semibold">{product.name}</h4>
                  <p className="text-gray-500">{product.category}</p>
                  <p className="text-gray-500">Số lượng: x{product.quantity}</p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="font-semibold text-brand-primary">
                    {product.price.toLocaleString()}đ
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 justify-end mt-10">
          <div className="space-y-2 fon text-right font-semibold">
            Thành tiền:
            <span className="ml-3 text-lg text-brand-primary">
              {totalPrice.toLocaleString()}đ
            </span>
          </div>
          <div className="flex space-x-2 justify-end">
            <Button
              type="primary"
              style={{ padding: "10px 40px", borderRadius: "6px" }}
            >
              Mua lại
            </Button>
            <Button
              className="mx-4"
              type="default"
              style={{
                borderColor: "#4BAF47",
                color: "#4BAF47",
                padding: "10px 40px",
                borderRadius: "6px",
              }}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
