"use client";
import React, {useEffect, useState} from "react";
import { Button, InputNumber } from "antd";
import Link from "next/link";
import {handleApiRequest} from "@/app/util/utils";
import {getMyCart,updateCart,deleteCart} from "@/apis/modules/item";
import {createOrderByCart} from "@/apis/modules/order";
import {useRouter} from "next/navigation";
import {useOrderStore} from "@/app/store/OderStore";


export default function Page() {
  // Sử dụng useState để quản lý giỏ hàng
  const [cartItems, setCartItems] = useState<any[]>([]);
  useEffect(() => {
    fetchMyCart()
  }, []);

  const fetchMyCart=async ()=>{
    const apiCall=()=>getMyCart();
    await handleApiRequest(apiCall,(response)=>{
      console.log(response)
      setCartItems(response.data);
      console.log(cartItems)
    })
  }

  // Hàm tính tổng số tiền cho mỗi sản phẩm
  const calculateTotal = (price: number, quantity: number) => {
    return price * quantity;
  };



  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem =async (id: number) => {

    const deleteCartItem=async ()=>{
      const apiCall=()=>deleteCart(id);
      await handleApiRequest(apiCall,(response)=>{
        const updatedItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedItems);
      })
    }
    await deleteCartItem()
  };


  const updateCartQuantity=async (quantity:number,id:number)=>{
    const apiCall=()=>updateCart(quantity,id);
    await handleApiRequest(apiCall,(response)=>{
      setCartItems((prevItems) =>
          prevItems.map((item) =>
              item.id === id ? { ...item, quantity: quantity } : item
          )
      );
    })
  }

  const increaseQuantity = async (id: number,quantity:number) => {
    await updateCartQuantity(quantity+1,id);
  };

  const decreaseQuantity = async (id: number,quantity:number) => {
    await updateCartQuantity(quantity-1,id)
  };
  const router=useRouter();
  const {setOrder}=useOrderStore(state => state);

  async function handleCreateOrderByCart() {
    const apiCall=()=>createOrderByCart();
    await handleApiRequest(apiCall,(response)=>{
      console.log(response)
      setOrder(response.data);
      router.replace("/payment")
    })
  }

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
                src={item.productItem.product.images[0].url}
                alt={item.productItem.product.name}
                className="w-24 h-24 object-cover rounded-lg text-center"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{item.productItem.product.name}</h3>
                <p className="text-sm text-gray-500">
                  Danh mục: {item.productItem.product.category.name}
                </p>
                <p className="text-sm text-gray-500">
                  Phân loại hàng: {item.productItem.variationOptions.map((option:any)=>option.value).join(' ,')}
                </p>
              </div>
            </div>
          </div>

          {/* Cột giá */}
          <div className="col-span-2 text-center">
            <span className="font-semibold">
              {item.productItem.price.toLocaleString("vi-VN")}đ
            </span>
          </div>

          {/* Cột số lượng */}
          <div className="col-span-2 text-center flex items-center justify-center">
            <Button
              type="default"
              onClick={() => decreaseQuantity(item.id,item.quantity)}
              disabled={item.quantity <= 1}
            >
              -
            </Button>
            <InputNumber
              min={1}
              value={item.quantity}
              disabled={true}
              style={{ width: 60, margin: "0 8px" }}
            />
            <Button type="default" onClick={() => increaseQuantity(item.id,item.quantity)}>
              +
            </Button>
          </div>

          {/* Cột số tiền */}
          <div className="col-span-2 text-center">
            <span className="font-semibold text-brand-primary">
              {item.totalPrice.toLocaleString(
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
          {cartItems!
            .reduce(
              (total, item) =>
                total + calculateTotal(item.productItem.price, item.quantity),
              0
            )
            .toLocaleString("vi-VN")}{" "}
          đ
        </h2>
        <Link href={"/payment"}>
          <Button
              onClick={handleCreateOrderByCart}
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
