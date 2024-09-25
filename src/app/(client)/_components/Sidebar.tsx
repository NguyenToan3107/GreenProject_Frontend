"use client";
import { getUserInfo } from "@/apis/modules/user";
import { useUserStore } from "@/app/store/UserStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Sidebar() {
  // const [user, setUser] = useState<any>(null);
  const { user, setUser } = useUserStore((state) => state);

  const getUser = async () => {
    const res: any = await getUserInfo();
    // console.log(res);
    if (res.code == 200) {
      setUser(res.data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-1/5 bg-gray-200 p-5 shadow-lg h-[600px] mr-5">
      <div className="flex items-center mb-6">
        <img
          src={user?.avatar || "/client/user/default_user.jpg"}
          alt="Avatar"
          className="w-16 h-16 rounded-full object-cover"
        />
        <span className="ml-4 font-bold text-gray-700">{user?.username}</span>
      </div>

      <ul className="space-y-4">
        <li className="flex items-center cursor-pointer hover:text-brand-primary">
          <Link href="/profile/account" className="flex items-center">
            <span className="material-symbols-outlined mr-3 text-gray-500 hover:text-gray-500">
              id_card
            </span>
            Tài khoản của tôi
          </Link>
        </li>
        <li className="flex items-center cursor-pointer hover:text-brand-primary">
          <Link href="/profile/orders" className="flex items-center">
            <span className="material-symbols-outlined mr-3 text-gray-500 hover:text-gray-500">
              shopping_cart
            </span>
            Đơn mua
          </Link>
        </li>
        <li className="flex items-center cursor-pointer hover:text-brand-primary">
          <Link href="/profile/vouchers" className="flex items-center">
            <span className="material-symbols-outlined mr-3 text-gray-500 hover:text-gray-500">
              card_giftcard
            </span>
            Kho voucher
          </Link>
        </li>
        <li className="flex items-center cursor-pointer hover:text-brand-primary">
          <Link href="/profile/change-password" className="flex items-center">
            <span className="material-symbols-outlined mr-3 text-gray-500 hover:text-gray-500">
              lock
            </span>
            Đổi mật khẩu
          </Link>
        </li>
        <li className="flex items-center cursor-pointer hover:text-brand-primary">
          <Link href="/profile/address" className="flex items-center">
            <span className="material-symbols-outlined mr-3 text-gray-500 hover:text-gray-500">
              location_on
            </span>
            Địa chỉ
          </Link>
        </li>
      </ul>
    </div>
  );
}
