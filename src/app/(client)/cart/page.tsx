"use client";
import React, {useEffect, useState} from "react";
import { Button, InputNumber } from "antd";
import Link from "next/link";
import {handleApiRequest} from "@/app/util/utils";
import {getMyCart} from "@/apis/modules/item";


const initialCartItems = [
  {
    id: 1,
    name: "Sản phẩm 1",
    price: 50000,
    quantity: 1,
    imageUrl: "/client/products/product2.png",
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    price: 150000,
    quantity: 2,
    imageUrl: "/client/products/product2.png",
  },
  {
    id: 3,
    name: "Sản phẩm 3",
    price: 300000,
    quantity: 1,
    imageUrl: "/client/products/product2.png",
  },
];

export default function Page() {
  // Sử dụng useState để quản lý giỏ hàng
  const [cartItems, setCartItems] = useState(initialCartItems);
  useEffect(() => {
    const fetchMyCart=async ()=>{
      const apiCall=()=>getMyCart();
      await handleApiRequest(apiCall,(response)=>{
        console.log(response)
      })
    }
    fetchMyCart()
  }, []);

  // Hàm tính tổng số tiền cho mỗi sản phẩm
  const calculateTotal = (price: number, quantity: number) => {
    return price * quantity;
  };

  const handleQuantityChange = (value: number | null, id: number) => {
    const updatedItems = cartItems.map(
      (item) => (item.id === id ? { ...item, quantity: value ?? 1 } : item) // Đảm bảo quantity không bao giờ là null
    );
    setCartItems(updatedItems);
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  // Hàm tăng số lượng sản phẩm
  const increaseQuantity = (id: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
  };

  // Hàm giảm số lượng sản phẩm
  const decreaseQuantity = (id: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
  };

  return (
    <div className="container p-10 my-10">
      <h1 className="text-2xl font-bold mb-8">Giỏ hàng</h1>

      <div className="grid grid-cols-12 gap-6 bg-gray-200 p-4 rounded-lg">
        <div className="col-span-5 font-semibold text-start ml-4">Sản phẩm</div>
        <div className="col-span-2 text-center font-semibold">Đơn giá</div>
        <div className="col-span-2 text-center font-semibold">Số lượng</div>
        <div className="col-span-2 text-center font-semibold">Số tiền</div>
        <div className="col-span-1 text-center font-semibold">Thao tác</div>
      </div>

      {/* Danh sách sản phẩm trong giỏ hàng */}
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-12 gap-6 items-center bg-white p-4 mt-4 rounded-lg border-b"
        >
          {/* Cột sản phẩm */}
          <div className="col-span-5">
            <div className="flex flex-row gap-8">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg text-center"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Danh mục: Đồ dùng bằng tre
                </p>
                <p className="text-sm text-gray-500">
                  Phân loại hàng: 31, Vàng
                </p>
              </div>
            </div>
          </div>

          {/* Cột giá */}
          <div className="col-span-2 text-center">
            <span className="font-semibold">
              {item.price.toLocaleString("vi-VN")}đ
            </span>
          </div>

          {/* Cột số lượng */}
          <div className="col-span-2 text-center flex items-center justify-center">
            <Button
              type="default"
              onClick={() => decreaseQuantity(item.id)}
              disabled={item.quantity <= 1}
            >
              -
            </Button>
            <InputNumber
              min={1}
              value={item.quantity}
              onChange={(value) => handleQuantityChange(value, item.id)}
              style={{ width: 60, margin: "0 8px" }}
            />
            <Button type="default" onClick={() => increaseQuantity(item.id)}>
              +
            </Button>
          </div>

          {/* Cột số tiền */}
          <div className="col-span-2 text-center">
            <span className="font-semibold text-brand-primary">
              {calculateTotal(item.price, item.quantity).toLocaleString(
                "vi-VN"
              )}{" "}
              đ
            </span>
          </div>

          {/* Nút xóa */}
          <div className="col-span-1 text-center text-red-700 text-lg cursor-pointer">
            <p onClick={() => handleRemoveItem(item.id)}>Xóa</p>
          </div>
        </div>
      ))}

      {/* Tổng tiền */}
      <div className="mt-8 flex flex-row justify-end items-center gap-4">
        <h2 className="text-lg font-bold">
          Tổng tiền:{" "}
          {cartItems
            .reduce(
              (total, item) =>
                total + calculateTotal(item.price, item.quantity),
              0
            )
            .toLocaleString("vi-VN")}{" "}
          đ
        </h2>
        <Link href={"/payment"}>
          <Button
            type="primary"
            style={{
              borderColor: "#4BAF47",
              padding: "16px 40px",
              fontSize: "1rem",
              borderRadius: "6px",
            }}
          >
            Đặt hàng
          </Button>
        </Link>
      </div>
    </div>
  );
}
