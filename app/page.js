"use client";
import React from "react";
import Link from "next/link";
import { logIn } from "./firebase";
import { useRouter } from "next/navigation";

const LogIn = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    await logIn(email, password);
    router.push("/Home");
  };

  return (
    <div className="bg-white rounded-xl p-10 flex justify-center items-center flex-col shadow-2xl  ">
      <p className="text-2xl text-violet-500 mb-5">Chat-App</p>
      <p className="text-xl text-gray-900 ">Log In</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-5 items-center border-2 rounded-xl p-3 border-solid border-black mt-5"
      >
        <input
          className="border-b-2 border-black p-2 w-96 focus:border-b-2 focus:border-blue-500 focus:outline-none"
          type="email"
          placeholder="Email"
        />
        <input
          className="border-b-2 border-black p-2 w-96 focus:border-b-2 focus:border-blue-500 focus:outline-none"
          type="password"
          placeholder="Password"
        />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Log In
        </button>
      </form>
      <div className="mt-3">
        Dont have an account? Register{" "}
        <Link href={"/Register"} className="text-blue-600 underline">
          Here
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
