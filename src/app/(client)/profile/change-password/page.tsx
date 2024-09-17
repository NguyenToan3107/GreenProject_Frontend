"use client";
import Sidebar from "@/app/(client)/_components/Sidebar";
import Link from "next/link";
import React, { useState } from "react";
import { Form, Input, Button, Upload, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Item } = Form;

export default function page() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };
  return (
    <div className="flex w-full h-screen justify-between my-16 px-6">
      {/* Sidebar */}
      <Sidebar />

      {/* Profile Details */}
      <div className="w-4/5 bg-white p-16 shadow-lg h-[600px]">
        <h1 className="text-2xl font-bold mb-3">Đổi Mật Khẩu</h1>
        <p className="mb-2">Quản lý sự thay đổi mật khẩu để bảo vệ tài khoản</p>

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
                  <label className="font-medium">Mật khẩu cũ</label>
                </div>
                <div className="w-2/4">
                  <Form.Item
                    name="password"
                    className="m-0 mt-0"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập!",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập mật khẩu" />
                  </Form.Item>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-1/3">
                  <label className="font-medium">Mật khẩu mới</label>
                </div>
                <div className="w-2/4">
                  <Form.Item
                    name="password"
                    className="m-0 mt-0"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập!",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập mật khẩu" />
                  </Form.Item>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-1/3">
                  <label className="font-medium">Nhập lại mật khẩu mới</label>
                </div>
                <div className="w-2/4">
                  <Form.Item
                    name="password"
                    className="m-0 mt-0"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập!",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập mật khẩu" />
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
          </Form>
        </div>
      </div>
    </div>
  );
}
