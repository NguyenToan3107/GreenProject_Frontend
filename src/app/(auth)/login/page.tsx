"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SignInForm from "@/app/(auth)/_components/SignInForm";
import SignUpForm from "@/app/(auth)/_components/SignUpForm";

export default function AuthPage() {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  return (
    <div className="flex flex-row justify-center items-center bg-white lg:shadow-lg rounded-xl">
      <div className="flex flex-col flex-1 justify-center p-10 w-[500px]">
        <div className="w-screen lg:w-full lg:flex-1 lg:px-0 px-7">
          <h1 className="text-custom-black-color font-semibold text-2xl">
            {pathname === "/login" ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
          </h1>
        </div>

        <AnimatePresence mode="wait">
          {pathname === "/login" && (
            <motion.div
              key="signin"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <SignInForm />
            </motion.div>
          )}

          {pathname === "/register" && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SignUpForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Image
        className="rounded-r-xl border-none hidden lg:block h-auto object-cover"
        width={530}
        height={550}
        src="/images/image_login.jpg"
        alt="1"
        quality={75}
      />
    </div>
  );
}
