import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
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
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-xl mr-6 cursor-pointer"
          />
          <Link href="/cart">
            <div className="relative cursor-pointer">
              <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
              <span className="absolute top-[-20px] right-[-20px] -translate-x-1/2 translate-y-1/2 bg-brand-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                5
              </span>
            </div>
          </Link>
          <Link href="/profile/account">
            <FontAwesomeIcon
              icon={faUser}
              className="text-xl ml-6 cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
