"use client";
import Image from "next/image";
import { getUserInfo, loginRequest } from "@/apis/modules/auth";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { cookies } from "next/headers";
import { setLocalStorage } from "@/ultis/localStorageUtils";

interface SignInFormProps {
  setPathname?: (value: ((prevState: string) => string) | string) => void;
}

export default function SignInForm({ setPathname }: SignInFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const login = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response: any = await loginRequest({
        username: username,
        password: password,
      });

      console.log(response);

      if (response.code == 200) {
        setLocalStorage("user_data", response.data);
        const authorities: Array<string> = response.data.authorities;
        console.log(authorities.at(0));

        if (authorities[0] == "ADMIN") {
          window.location.href = "/admin";
        } else if (authorities[0] == "USER") {
          window.location.href = "/home";
        }
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

  function loginWithGithub() {
    window.location.href = "http://localhost:7000/oauth2/authorization/github";
  }

  function loginWithGoogle() {
    window.location.href = "http://localhost:7000/oauth2/authorization/google";
  }

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      <form className="mt-6 w-full px-5 lg:px-0" onSubmit={login}>
        <div className="mt-2 border-b border-gray-400 pb-2 flex items-center px-3">
          <FontAwesomeIcon icon={faUser} className="mr-3 text-[18px]" />
          <input
            type="text"
            placeholder="Tên đăng nhập"
            onChange={(e) => handleUsernameChange(e)}
            required
            className="border-none focus:outline-none text-base flex-1 py-[3px]"
          />
        </div>

        <div className="mt-6 border-b border-gray-400 pb-2 flex items-center px-3">
          <FontAwesomeIcon icon={faKey} className="mr-3 text-[18px]" />
          <input
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => handlePasswordChange(e)}
            required
            className="border-none focus:outline-none text-base flex-1 py-[3px]"
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

      <div className="flex flex-col items-center w-full">
        <div className="mt-4 relative w-full mb-4">
          <div className="flex items-center justify-center">
            <div className="flex-grow border-t border-brand-gray"></div>
            <span className="mx-4 text-brand-gray whitespace-nowrap">HOẶC</span>
            <div className="flex-grow border-t border-brand-gray"></div>
          </div>
        </div>

        <div className="flex flex-row w-full max-w-md">
          <button
            onClick={loginWithGoogle}
            className="flex-1 flex items-center justify-center border border-gray-300 bg-white text-black py-2 px-4 rounded-md mr-2"
          >
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

          <button
            onClick={loginWithGithub}
            className="flex-1 flex items-center justify-center border border-gray-300 bg-white text-black py-2 px-4 rounded-md ml-2"
          >
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
        <a
          onClick={() => setPathname?.("/register")}
          className="text-brand-primary ml-2 cursor-pointer"
        >
          Đăng ký
        </a>
      </p>
    </div>
  );
}
