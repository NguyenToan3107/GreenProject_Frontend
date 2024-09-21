import Sidebar from "@/app/(client)/_components/Sidebar";
import React from "react";
import { Button } from "antd";

const vouchers = [
  {
    id: 1,
    imageUrl: "/client/products/product2.png",
    name: "Giảm giá 50%",
    startDate: "01/09/2024",
    endDate: "30/09/2024",
  },
  {
    id: 2,
    imageUrl: "/client/products/product2.png",
    name: "Giảm giá 30%",
    startDate: "05/09/2024",
    endDate: "10/09/2024",
  },
  {
    id: 3,
    imageUrl: "/client/products/product2.png",
    name: "Miễn phí vận chuyển",
    startDate: "01/09/2024",
    endDate: "15/09/2024",
  },
  {
    id: 1,
    imageUrl: "/client/products/product2.png",
    name: "Giảm giá 50%",
    startDate: "01/09/2024",
    endDate: "30/09/2024",
  },
];

export default function Page() {
  return (
    <div className="flex w-full h-auto justify-between my-16 mb-40 px-6">
      {/* Sidebar */}
      <Sidebar />

      <div className="w-4/5 flex flex-col gap-5">
        {/* Voucher List */}
        <div className="bg-white p-16 shadow-lg h-[600px] overflow-auto">
          <h1 className="text-2xl font-bold mb-3">Voucher Của Tôi</h1>
          <p className="mb-2">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

          <div className="grid grid-cols-2 gap-6 mt-10 ml-6 h-[350px] overflow-y-auto">
            {vouchers.map((voucher) => (
              <div
                key={voucher.id}
                className="flex p-2 shadow-lg rounded-md items-center bg-white"
              >
                {/* Voucher Image */}
                <img
                  src={voucher.imageUrl}
                  alt={voucher.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                {/* Voucher Content */}
                <div className="ml-10 flex flex-col justify-between">
                  <h4 className="text-lg font-semibold">{voucher.name}</h4>
                  <p className="text-gray-500 text-sm">
                    Bắt đầu: {voucher.startDate}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Kết thúc: {voucher.endDate}
                  </p>

                  <Button type="default" className="mt-2">
                    Chọn
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*Hot Voucher */}
        <div className="bg-white p-16 shadow-lg h-[600px] overflow-auto">
          <h1 className="text-2xl font-bold mb-3">Kho Voucher Hot</h1>
          <p className="mb-2">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

          <div className="grid grid-cols-2 gap-6 mt-10 ml-6 h-[350px] overflow-y-auto">
            {vouchers.map((voucher) => (
              <div
                key={voucher.id}
                className="flex p-2 shadow-lg rounded-md items-center bg-white"
              >
                {/* Voucher Image */}
                <img
                  src={voucher.imageUrl}
                  alt={voucher.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                {/* Voucher Content */}
                <div className="ml-10 flex flex-col justify-between">
                  <h4 className="text-lg font-semibold">{voucher.name}</h4>
                  <p className="text-gray-500 text-sm">
                    Bắt đầu: {voucher.startDate}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Kết thúc: {voucher.endDate}
                  </p>

                  <Button type="default" className="mt-2">
                    Chọn
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
