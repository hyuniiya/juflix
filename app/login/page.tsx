"use client";
import Input from "@/components/elements/Input";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "회원가입" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log("");
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/background.jpeg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="w-full h-full bg-black lg:bg-opacity-50">
        <nav className="px-8 py-3">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={150}
            height={60}
            loading="eager"
            priority="high"
          />
        </nav>
        <div className="flex justify-center ">
          <div className="w-full bg-black bg-opacity-75 px-16 py-16 self-center lg:w-2/5 lg:max-w-md rounded-md">
            <h2 className="text-white text-2xl font-semibold mb-7">
              {variant === "login" ? "로그인" : "회원가입"}
            </h2>
            {variant === "회원가입" && (
              <Input
                id="name"
                value={name}
                label="이름"
                onChange={(e: any) => setName(e.target.value)}
              />
            )}
            <Input
              id="Email"
              value={email}
              label="이메일"
              type="Email"
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              value={password}
              label="비밀번호"
              type="password"
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <button
              onClick={variant === "login" ? login : register}
              className="w-full bg-red-600 text-white rounded-md py-3 mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "로그인" : "가입하기"}
            </button>
            <p className="text-neutral-500 mt-8">
              아직 회원이 아니신가요?
              <span
                onClick={toggleVariant}
                className="text-white ml-1 cursor-pointer hover:underline"
              >
                회원가입
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
