"use client";
import React, { useState } from "react";
import { Button, Checkbox, Input, InputNumber, Modal } from "antd";
import Link from "next/link";

// Mảng sản phẩm ban đầu
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

const addresses = [
  {
    name: "NGUYEN VAN A",
    phone: "0123456789",
    address: "Đường Mễ Trì, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội",
  },
  {
    name: "NGUYEN VAN B",
    phone: "0987654321",
    address: "Số 10, Nguyễn Trãi, Thanh Xuân, Hà Nội",
  },
  {
    name: "NGUYEN VAN C",
    phone: "0222222222",
    address: "Đường Láng, Đống Đa, Hà Nội",
  },
];

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

const paymentMethods = [
  {
    id: 1,
    name: "Thanh toán qua ví MoMo",
    image: "/client/products/product2.png",
  },
  {
    id: 2,
    name: "Thanh toán bằng Stripe",
    image: "/client/products/product2.png",
  },
  {
    id: 3,
    name: "Thanh toán bằng VNPAY",
    image: "/client/products/product2.png",
  },
  {
    id: 4,
    name: "Thanh toán khi nhận hàng",
    image: "/client/products/product2.png",
  },
];

export default function Page() {
  // Sử dụng useState để quản lý giỏ hàng
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<
    number | null
  >(0); // Quản lý địa chỉ được chọn
  const [isModalVisibleAddress, setIsModalVisibleAddress] = useState(false);
  const [isAddAddressModalVisible, setIsAddAddressModalVisible] =
    useState(false); // For new address modal

  const [isVoucherModalVisible, setIsVoucherModalVisible] = useState(false); // For voucher modal
  const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);

  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false); // For payment method modal
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | null
  >(null);

  // Xử lý modal address
  const showModalAddress = () => {
    setIsModalVisibleAddress(true);
  };

  const handleOkAddress = () => {
    setIsModalVisibleAddress(false);
  };

  const handleCancelAddress = () => {
    setIsModalVisibleAddress(false);
  };

  const handleSelectAddress = (index: number) => {
    setSelectedAddressIndex(index);
  };

  const showAddAddressModal = () => {
    setIsAddAddressModalVisible(true);
    setIsModalVisibleAddress(false);
  };
  const handleAddAddressCancel = () => setIsAddAddressModalVisible(false);

  //////////////////////

  // Xử lý modal voucher
  const showVoucherModal = () => setIsVoucherModalVisible(true);
  const handleVoucherModalCancel = () => setIsVoucherModalVisible(false);

  const handleSelectVoucher = (index: number) => setSelectedVoucher(index);

  //////////////////////

  // Xử lý modal payment
  const showPaymentModal = () => setIsPaymentModalVisible(true);
  const handlePaymentModalCancel = () => setIsPaymentModalVisible(false);

  const handleSelectPaymentMethod = (index: number) =>
    setSelectedPaymentMethod(index);
  //////////////////////

  // Hàm tính tổng số tiền cho mỗi sản phẩm
  const calculateTotal = (price: number, quantity: number) => {
    return price * quantity;
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  return (
    <div className="container p-10 my-10 mb-36">
      <h1 className="text-2xl font-bold mb-8">Thanh Toán Đơn Hàng</h1>
      <div className=" bg-[#F5F5F5] rounded-sm flex flex-row items-center justify-between p-6 mb-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-[17px]">Địa chỉ nhận hàng</h2>
          <div className="flex flex-row gap-5">
            {/* <p>NGUYEN VAN A - 0123456789</p> */}
            {/* <p>Đường Mễ Trì, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội</p> */}
            <p>
              {addresses[selectedAddressIndex!]?.name} -{" "}
              {addresses[selectedAddressIndex!]?.phone}
            </p>
            <p>{addresses[selectedAddressIndex!]?.address}</p>
          </div>
        </div>
        <p
          className="underline cursor-pointer text-brand-primary"
          onClick={showModalAddress}
        >
          Thay đổi
        </p>
      </div>
      <div>
        <div className="grid grid-cols-12 gap-6 bg-[#F5F5F5] p-4 rounded-lg">
          <div className="col-span-5 font-semibold text-start ml-4">
            Sản phẩm
          </div>
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
              <p>{item.quantity}</p>
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
      </div>

      {/* Chọn Voucher */}
      <div className=" bg-[#F5F5F5] rounded-sm flex flex-row items-center justify-between mt-6 px-6 py-4 mb-4">
        <div className="flex flex-row gap-2">
          <h2 className="font-semibold text-[17px]">Mã Giảm Giá GreenNova</h2>
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
            {vouchers[selectedVoucher!]?.name ?? "Miễn phí vận chuyển"}
          </Button>
        </div>
        <p
          className="underline cursor-pointer text-brand-primary"
          onClick={showVoucherModal}
        >
          Chọn Voucher
        </p>
      </div>

      {/* Chọn phương thức thanh toán */}
      <div className=" bg-[#F5F5F5] rounded-sm flex flex-row items-center justify-between mt-6 px-6 py-4 mb-4">
        <div className="flex flex-row gap-2">
          <h2 className="font-semibold text-[17px]">Hình Thức Thanh Toán</h2>
          <Button
            className="mx-4"
            type="default"
            style={{
              borderColor: "#4BAF47",
              color: "#4BAF47",
              padding: "10px 30px",
              borderRadius: "6px",
            }}
          >
            {paymentMethods[selectedPaymentMethod!]?.name ??
              "Thanh toán khi nhận hàng"}
          </Button>
        </div>
        <p
          className="underline cursor-pointer text-brand-primary"
          onClick={showPaymentModal}
        >
          Chọn
        </p>
      </div>

      {/* Tổng tiền */}
      <div className="mt-8 flex flex-row justify-end gap-4 bg-[#F8FAF4] p-4">
        <div className="flex flex-col">
          <div className="flex justify-between gap-36 w-full mb-2">
            <h2 className="text-lg">Tổng tiền hàng:</h2>
            <span className="text-brand-primary">
              {cartItems
                .reduce(
                  (total, item) =>
                    total + calculateTotal(item.price, item.quantity),
                  0
                )
                .toLocaleString("vi-VN")}{" "}
              đ
            </span>
          </div>

          <div className="flex justify-between gap-36 w-full mb-2">
            <h2>Phí vận chuyển:</h2>
            <span className="text-brand-primary">30,000đ</span>
          </div>

          <div className="flex justify-between gap-36 w-full mb-2">
            <h2>Giảm giá:</h2>
            <span className="text-brand-primary">-50,000đ</span>
          </div>

          <div className="flex justify-between gap-36 w-full font-bold mt-4">
            <h2 className="text-lg">Thành tiền:</h2>
            <span className="text-brand-primary">
              {cartItems
                .reduce(
                  (total, item) =>
                    total + calculateTotal(item.price, item.quantity),
                  0
                )
                .toLocaleString("vi-VN")}{" "}
              đ
            </span>
          </div>
        </div>
      </div>

      <Link href={"/payment"}>
        <Button
          type="primary"
          style={{
            borderColor: "#4BAF47",
            padding: "12px 28px",
            fontSize: "1rem",
            borderRadius: "6px",
            marginTop: "16px",
            float: "right",
          }}
        >
          Đặt hàng
        </Button>
      </Link>

      <Modal
        visible={isModalVisibleAddress}
        onOk={handleOkAddress}
        onCancel={handleCancelAddress}
        okText="Xác nhận"
        cancelText="Trở lại"
        closable={false}
      >
        <div>
          <div className="flex flex-row justify-between p-2">
            <p className="font-semibold">Địa Chỉ Của Bạn</p>
            <p
              className="underline cursor-pointer text-brand-primary"
              onClick={showAddAddressModal}
            >
              Thêm địa chỉ
            </p>
          </div>
          <div>
            {addresses.map((item, index) => (
              <div
                key={index}
                className="flex flex-row justify-start gap-3 items-center p-2 border-b"
              >
                <Checkbox
                  checked={selectedAddressIndex === index}
                  onChange={() => handleSelectAddress(index)}
                />
                <div>
                  <h2 className="font-semibold mb-1">{`${item.name} - ${item.phone}`}</h2>
                  <p className="text-gray-500">{item.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Add New Address Modal */}
      <Modal
        visible={isAddAddressModalVisible}
        // onOk={handleAddNewAddress} // Save the new address
        onCancel={handleAddAddressCancel}
        okText="OK"
        cancelText="Trở lại"
      >
        <h2 className="font-semibold">Thêm Địa Chỉ Mới</h2>
        <Input placeholder="Họ và tên" name="name" className="mt-4" />
        <Input placeholder="Số điện thoại" name="phone" className="mt-4" />
        <Input
          placeholder="Nhập địa chỉ mới của bạn"
          name="address"
          className="mt-4"
        />
      </Modal>

      {/* Voucher Modal */}
      <Modal
        visible={isVoucherModalVisible}
        onOk={handleVoucherModalCancel}
        onCancel={handleVoucherModalCancel}
        okText="OK"
        cancelText="Trở lại"
      >
        <h2 className="font-semibold">Chọn Mã Giảm Giá</h2>
        <div className="grid grid-cols-1 h-[250px] overflow-y-auto">
          {vouchers.map((voucher, index) => (
            <div
              key={voucher.id}
              className="flex p-2 shadow-lg items-center bg-white border-b"
            >
              <Checkbox
                checked={selectedVoucher === index}
                onChange={() => handleSelectVoucher(index)}
              />
              {/* Voucher Image */}
              <img
                src={voucher.imageUrl}
                alt={voucher.name}
                className="w-24 h-24 object-cover rounded-lg ml-3"
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
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Payment Modal */}
      <Modal
        visible={isPaymentModalVisible}
        onOk={handlePaymentModalCancel}
        onCancel={handlePaymentModalCancel}
        okText="OK"
        cancelText="Trở lại"
      >
        <h2 className="font-semibold">Chọn Phương Thức Thanh Toán</h2>
        <div>
          {paymentMethods.map((method, index) => (
            <div
              key={method.id}
              className="flex flex-row justify-start gap-3 items-center p-2 border-b"
            >
              <Checkbox
                checked={selectedPaymentMethod === index}
                onChange={() => handleSelectPaymentMethod(index)}
              />
              <img
                src={method.image}
                alt={method.name}
                style={{ width: "50px", height: "50px" }}
              />
              <div>
                <h3>{method.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
