"use client";
import { redirect } from "next/navigation";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { registerRequest } from "@/apis/modules/auth";

export default function SignInForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const register = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await registerRequest({
        username: username,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      });

      console.log(response);
      if (response.status == 201) {
        window.location.href = "/";
      }
    } catch (error: any) {
      console.log(error);
      setError(error.response?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };
  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirmChange = (event: any) => {
    setPasswordConfirm(event.target.value);
  };
  return (
    <div>
      <form
        className="mt-4 w-screen lg:flex-1 lg:w-full lg:px-0 px-7"
        onSubmit={register}
      >
        <div className="mt-2 border-b border-gray pb-2 flex items-center px-3">
          <FontAwesomeIcon icon={faUser} className="mr-3 text-[18px]" />
          <input
            type="text"
            placeholder="Họ và tên"
            onChange={(e) => handleUsernameChange(e)}
            required
            className="border border-none focus:outline-none text-base flex-1 py-[3px]"
          />
        </div>

        <div className="mt-6 border-b border-gray pb-2 flex items-center px-3">
          <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-[18px]" />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => handleEmail(e)}
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

        <div className="mt-6 border-b border-gray pb-2 flex items-center px-3">
          <FontAwesomeIcon icon={faKey} className="mr-3 text-[18px]" />
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            onChange={(e) => handlePasswordConfirmChange(e)}
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
          Đăng ký
        </button>
        {error && (
          <p className="mt-4 text-red-600 bg-red-100 border border-red-300 rounded-md p-2 text-sm">
            {error}
          </p>
        )}
      </form>

      <p className="text-brand-gray text-center mt-5">
        Bạn đã có tài khoản?
        <Link href="/login" className="text-brand-primary ml-2">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}
