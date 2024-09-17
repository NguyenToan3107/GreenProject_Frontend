"use client";
import Sidebar from "@/app/(client)/_components/Sidebar";
import Link from "next/link";
import React, { useState } from "react";
import { Form, Input, Button, Upload, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Item } = Form;

export default function page() {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (file: any) => {
    const reader = new FileReader();
    reader.onload = () => setImageUrl(reader.result as string);
    reader.readAsDataURL(file);
    return false; // Prevent automatic upload
  };

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    console.log("Selected image URL:", imageUrl);
    // Handle form submission with values and selected image URL
  };
  return (
    <div className="flex w-full h-screen justify-between my-16 px-6">
      {/* Sidebar */}
      <Sidebar />

      {/* Profile Details */}
      <div className="w-4/5 bg-white p-16 shadow-lg h-[600px]">
        <h1 className="text-2xl font-bold mb-3">Hồ sơ của tôi</h1>
        <p className="mb-2">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

        <div className="flex w-full mt-10 ml-6">
          <Form
            form={form}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            className="flex flex-grow justify-between"
          >
            <div className="w-2/3 pr-4 flex flex-col space-y-4">
              <div className="flex items-center">
                <div className="w-1/3">
                  <label className="font-medium">Tên đăng nhập</label>
                </div>
                <div className="w-2/4">
                  <Form.Item
                    name="username"
                    className="m-0 mt-0"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="w-1/3">
                  <label className="font-medium">Họ và tên</label>
                </div>
                <div className="w-2/4">
                  <Form.Item
                    name="fullName"
                    className="m-0"
                    rules={[
                      { required: true, message: "Vui lòng nhập họ và tên!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="w-1/3">
                  <label className="font-medium">Email</label>
                </div>
                <div className="w-2/4">
                  <Form.Item
                    name="email"
                    className="m-0"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Vui lòng nhập email hợp lệ!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="w-1/3">
                  <label className="font-medium">Số điện thoại</label>
                </div>
                <div className="w-2/4">
                  <Form.Item
                    name="phone"
                    className="m-0"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>

              <div className="flex justify-center mt-auto mr-[60px]">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-40 rounded-lg"
                >
                  Lưu
                </Button>
              </div>
            </div>

            <div className="w-1/3 flex flex-col items-center space-y-4">
              <Image
                src={imageUrl || "/client/products/product2.png"}
                alt="Avatar"
                width={150}
                height={150}
                className="rounded-full object-cover"
              />
              <Upload showUploadList={false} beforeUpload={handleImageChange}>
                <Button>Chọn ảnh</Button>
              </Upload>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
