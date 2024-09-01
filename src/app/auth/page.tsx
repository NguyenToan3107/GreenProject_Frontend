"use client";
import { useEffect, useState } from "react";
import SignUpForm from "@/app/auth/_components/SignUpForm";
import { motion, AnimatePresence } from "framer-motion";
import SignInForm from "@/app/auth/_components/SignInForm";

export default function page() {
  const [pathname, setPathname] = useState("");


  useEffect(() => {
      setPathname("/login");

  }, []);
  return (
    <div className="flex flex-row justify-center items-center bg-white lg:shadow-lg rounded-xl">
      <div className="flex flex-col flex-1 justify-center p-10 w-[500px]">

        <AnimatePresence mode="wait">
          {pathname === "/register" && (
              <motion.div
                  key="signup"
                  initial={{opacity: 0, x: 20}}
                  animate={{opacity: 1, x: 0}}
                  exit={{opacity: 0, x: -20}}
                  transition={{duration: 0.3}}
              >
                  <div className="w-screen lg:w-full lg:flex-1 lg:px-0 px-7">
                      <h1 className="text-custom-black-color font-semibold text-2xl">
                          ĐĂNG KÝ TÀI KHOẢN
                      </h1>
                  </div>
                  <SignUpForm setPathname={setPathname}/>
              </motion.div>
          )}

            {pathname === "/login" && (
                <motion.div
                    key="signin"
                    initial={{opacity: 0, x: -20}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: 20}}
                    transition={{duration: 0.3}}
                >
                    <h1 className="text-custom-black-color font-semibold text-2xl">
                        {pathname === "/login" ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
                    </h1>
                    <SignInForm setPathname={setPathname}/>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
        <div
            className="relative w-full h-full hidden lg:block"
            style={{
                backgroundImage: "url(/images/image_signup.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "530px",
          height: "550px",
        }}
      ></div>
    </div>
  );
}
