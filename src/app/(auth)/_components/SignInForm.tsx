"use client";
import Image from "next/image";
import { loginRequest } from "@/apis/modules/auth";
import { redirect } from "next/navigation";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const login = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await loginRequest({
        username: username,
        password: password,
      });

      console.log(response);
      if (response.status == 200) {
        window.location.href = "/";
      }
    } catch (error: any) {
      console.log(error);
      setError(error.response?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <form
        className="mt-6 w-screen lg:flex-1 lg:w-full lg:px-0 px-7"
        onSubmit={login}
      >
        <div className="mt-2 border-b border-gray pb-2 flex items-center px-3">
          <FontAwesomeIcon icon={faUser} className="mr-3 text-[18px]" />
          <input
            type="text"
            placeholder="Tên đăng nhập"
            onChange={(e) => handleUsernameChange(e)}
            required
            className="border border-none focus:outline-none text-base flex-1 py-[3px]"
          />
        </div>

        <div className="mt-6 border-b border-gray pb-2 flex items-center px-3">
          <FontAwesomeIcon icon={faKey} className="mr-3 text-[18px]" />
          <input
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => handlePasswordChange(e)}
            required
            className="border border-none focus:outline-none text-base flex-1 py-[3px]"
          />
        </div>

        <p className="mt-5 text-xs cursor-pointer text-brand-blue">
          Quên mật khẩu
        </p>
        <button
          type="submit"
          className="mt-5 w-full bg-brand-primary text-white rounded-md py-2"
        >
          {loading ? "Đăng nhập" : "Đăng nhập"}
        </button>
        {error && (
          <p className="mt-4 text-red-600 bg-red-100 border border-red-300 rounded-md p-2 text-sm">
            {error}
          </p>
        )}
      </form>

      <div className="flex flex-col items-center w-full max-w-md">
        <div className="mt-4 relative w-full mb-4">
          <div className="flex items-center justify-center">
            <div className="flex-grow border-t border-brand-gray"></div>
            <span className="mx-4 text-brand-gray whitespace-nowrap">HOẶC</span>
            <div className="flex-grow border-t border-brand-gray"></div>
          </div>
        </div>

        <div className="flex flex-row w-full max-w-md">
          <button className="flex-1 flex items-center justify-center border border-gray-300 bg-white text-black py-2 px-4 rounded-md mr-2">
            <Image
              className="rounded-xl mr-2"
              width={30}
              height={30}
              src="/images/google.png"
              alt="Google"
              quality={75}
            />
            Google
          </button>
          <button className="flex-1 flex items-center justify-center border border-gray-300 bg-white text-black py-2 px-4 rounded-md ml-2">
            <Image
              className="rounded-xl mr-2"
              width={30}
              height={30}
              src="/images/github.png"
              alt="GitHub"
              quality={75}
            />
            GitHub
          </button>
        </div>
      </div>

      <p className="text-brand-gray text-center mt-5">
        Bạn chưa có tài khoản?
        <Link href="/register" className="text-brand-primary ml-2">
          Đăng ký
        </Link>
      </p>
    </div>
  );
}
