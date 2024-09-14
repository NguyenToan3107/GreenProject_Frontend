"use client"

import {ToastContainer} from "react-toastify";
import {Flex, Spin} from "antd";
import {useAuthStore} from "@/app/store/AuthStore";


export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const {loading}=useAuthStore();

  return (
    <main className="flex justify-center items-center bg-brand-primary h-screen">
        <Flex gap="middle" vertical>
      <ToastContainer/>

      <Spin spinning={loading} delay={500}>
      {children}
      </Spin>

        </Flex>
    </main>
  );
}
