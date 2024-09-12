import React from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  BellIcon,
} from "@heroicons/react/24/solid";

export default function Header()  {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Thanh tìm kiếm */}
        <div className="flex-grow max-w-lg mx-4 ml-[300px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <MagnifyingGlassIcon className="h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
          </div>
        </div>

        {/* Thông báo và Hồ sơ người dùng */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white focus:outline-none">
            <BellIcon className="h-6 w-6" />
          </button>
          <img
            src="/admin/default_user.jpg"
            alt="User Avatar"
            className="h-8 w-8 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};


