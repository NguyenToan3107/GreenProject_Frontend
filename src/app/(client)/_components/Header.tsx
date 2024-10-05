"use client"
import Link from "next/link";
import Image from "next/image";

import {LogoutOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import {Dropdown} from "antd";
import {useAuthStore} from "@/app/store/AuthStore";

export default function Header() {
  const {logout}=useAuthStore(state => state);

  async function handleLogout() {
    await logout();
  }

  const items:any = [
    {
      key: 'logout',
      label: <span  onClick={handleLogout}><LogoutOutlined /> Logout</span>, // Kết hợp icon và text trong một phần tử <span>
    },
  ];

  return (
    <header className="bg-white shadow-md px-2">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Image
            src="/client/components/header/logo.jpeg"
            alt="Logo"
            width={180}
            height={100}
            className="h-full object-contain cursor-pointer"
        />
        <nav className="flex justify-center items-center">
          <ul className="flex space-x-4 m-0 p-0">
            <li>
              <Link
                  href="/home"
                  className="hover:text-gray-600 font-[600] px-4"
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                  href="/about"
                  className="hover:text-gray-600 font-[600] px-4"
              >
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link
                  href="/products"
                  className="hover:text-gray-600 font-[600] px-4"
              >
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link
                  href="/contact"
                  className="hover:text-gray-600 font-[600] px-4"
              >
                Dịch vụ
              </Link>
            </li>
            <li>
              <Link
                  href="/contact"
                  className="hover:text-gray-600 font-[600] px-4"
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex justify-between px-4">
          <SearchOutlined className="text-xl mr-6 cursor-pointer"/>

          <Link href="/cart">
            <div className="relative cursor-pointer">
              <ShoppingCartOutlined className="text-xl"/>
              <span
                  className="absolute top-[-20px] right-[-20px] -translate-x-1/2 translate-y-1/2 bg-brand-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        5
      </span>
            </div>
          </Link>
          <Dropdown menu={{items}} trigger={['hover']}>

          <Link href="/profile/account">
            <UserOutlined className="text-xl ml-6 cursor-pointer"/>
          </Link>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
