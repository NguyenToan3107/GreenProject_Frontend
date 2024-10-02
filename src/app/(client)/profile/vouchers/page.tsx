"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/(client)/_components/Sidebar";
import { Button } from "antd";
import {useVoucherStore} from "@/app/store/VoucherStore";

export default function Page() {
  const {
    userVouchers,
    validVouchers,
    setUserVouchers,
    getMyVoucher,
    getAllValidVoucher,
    redeemVoucher,
  } = useVoucherStore((state) => state);

  const fetchMyVoucher=async ()=>{
    const res:any = await getMyVoucher(0);

    if(res.code == 200){
      
    }
  }

  const fetchValidVouchers=async ()=>{
    const res:any = await getAllValidVoucher(0);

    if(res.code == 200){
      
    }
  }

  useEffect(() => {
    if (!userVouchers || userVouchers.length === 0) {
      fetchMyVoucher(); 
    }

    if (!userVouchers || userVouchers.length === 0) {
      fetchValidVouchers(); 
    }
  }, []); 

  const handleRedeemVoucher = async(id:number) =>{
    const res:any = await redeemVoucher(id);
    console.log(res)
    if(res.code == 200){
      setUserVouchers([...userVouchers, res.data]);
    }
  }


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
            
            {userVouchers.map((voucher) => (
              <div
                key={voucher.id}
                className="flex p-2 shadow-lg rounded-md items-center bg-white"
              >
                {/* Voucher Image */}
                {/* <img
                  src={voucher.imageUrl}
                  alt={voucher.name}
                  className="w-28 h-28 object-cover rounded-lg"
                /> */}

                {/* Voucher Content */}
                <div className="ml-10 flex flex-col justify-between">
                  <h4 className="text-lg font-semibold">{voucher.name}</h4>
                  <p className="text-gray-500 text-sm">
                    Bắt đầu: {voucher.startDate}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Kết thúc: {voucher.endDate}
                  </p>

                  {/* <Button type="default" className="mt-2">
                    Chọn
                  </Button> */}
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
            {validVouchers.map((voucher) => (
              <div
                key={voucher.id}
                className="flex p-2 shadow-lg rounded-md items-center bg-white"
              >
                {/* Voucher Image */}
                <img
                  src={
                    voucher.type === 'FREE_SHIP' 
                      ? './public/products/FREE_SHIP.png' 
                      : voucher.type === 'DISCOUNT_AMOUNT' 
                      ? './public/products/DISCOUNT.png' 
                      : './public/products/DISCOUNT.png'
                  }
                alt={voucher.name}
                className="w-28 h-28 object-cover rounded-lg" />

                {/* Voucher Content */}
                <div className="ml-10 flex flex-col justify-between">
                  <h4 className="text-lg font-semibold">{voucher.name}</h4>
                  <p className="text-gray-500 text-sm">
                    Bắt đầu: {voucher.startDate}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Kết thúc: {voucher.endDate}
                  </p>
                  <p>
                    Số điểm cần để đổi: {voucher.pointsRequired}
                  </p>
                  <Button onClick={ () =>handleRedeemVoucher(voucher.id)} type="default" className="mt-2">
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
