"use client";
import Sidebar from "@/app/(client)/_components/Sidebar";
import React, { useState } from "react";
import { Form, Input, Button, Modal, message } from "antd";

// Define the Address type
type Address = {
  name: string;
  phone: string;
  address: string;
};

const { Item } = Form;

const initialAddresses: Address[] = [
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

export default function Page() {
  const [form] = Form.useForm();
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null); // Set the type for editingAddress

  const showModal = (address: Address | null = null) => {
    setEditingAddress(address);
    form.setFieldsValue(address || { name: "", phone: "", address: "" });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values: Address) => {
        if (editingAddress) {
          // Update the address
          setAddresses((prev) =>
            prev.map((item) =>
              item === editingAddress ? { ...editingAddress, ...values } : item
            )
          );
          message.success("Cập nhật địa chỉ thành công!");
        } else {
          // Add new address
          setAddresses((prev) => [...prev, values]);
          message.success("Thêm địa chỉ thành công!");
        }
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (address: Address) => {
    setAddresses((prev) => prev.filter((item) => item !== address));
    message.success("Xóa địa chỉ thành công!");
  };

  return (
    <div className="flex w-full h-screen justify-between my-16 px-6">
      {/* Sidebar */}
      <Sidebar />

      {/* Address Section */}
      <div className="w-4/5 bg-white p-16 shadow-lg h-[600px]">
        <h1 className="text-2xl font-bold mb-3">Địa chỉ của tôi</h1>
        <p className="mb-2">Quản lý địa chỉ giao hàng của bạn</p>

        <div className="flex flex-col gap-6 mt-10 ml-6 h-full">
          {" "}
          <div className="w-full overflow-y-auto h-[300px]">
            {" "}
            {addresses.map((item, index) => (
              <div
                key={index}
                className="flex flex-row justify-between gap-6 mt-4 items-center p-2 border-b w-full"
              >
                <div className="flex flex-col gap-1 flex-grow">
                  <h2 className="font-medium mb-1">{`${item.name} - ${item.phone}`}</h2>
                  <p className="text-gray-500">{item.address}</p>
                </div>
                <div className="flex flex-row gap-4">
                  <p
                    className="underline text-brand-primary cursor-pointer"
                    onClick={() => showModal(item)}
                  >
                    Cập nhật
                  </p>
                  <p
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDelete(item)}
                  >
                    Xóa
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p
            className="underline text-xl cursor-pointer text-brand-primary"
            onClick={() => showModal()}
          >
            Thêm địa chỉ
          </p>
        </div>
      </div>

      {/* Add/Update Address Modal */}
      <Modal
        title={editingAddress ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Item>
          <Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^\d+$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Item>
          <Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Item>
        </Form>
      </Modal>
    </div>
  );
}
