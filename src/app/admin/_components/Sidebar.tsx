import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="h-auto w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-5 flex items-center space-x-4 bg-gray-900">
        <button className="text-gray-400 hover:text-white focus:outline-none">
          <Bars3Icon className="h-6 w-6" />
        </button>
        <div className="text-2xl font-bold">Admin Panel</div>
      </div>
      <nav className="flex flex-col p-4 space-y-4">
        <Link href="/admin/products" className="hover:bg-gray-700 p-2 rounded">
          Quản lý sản phẩm
        </Link>
        <Link href="/admin/users" className="hover:bg-gray-700 p-2 rounded">
          <FontAwesomeIcon icon={faUser} className="mr-3 text-[18px]" />
          Quản lý người dùng
        </Link>
        <Link
          href="/admin/categories"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Quản lý danh mục
        </Link>
        <Link href="/admin/roles" className="hover:bg-gray-700 p-2 rounded">
          Quản lý quyền
        </Link>
        <Link href="/admin/orders" className="hover:bg-gray-700 p-2 rounded">
          <FontAwesomeIcon icon={faCartShopping} className="mr-3 text-[18px]" />
          Quản lý đơn hàng
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
