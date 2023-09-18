"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import { SignUpAccount } from "../firebase";
import { useRouter } from "next/navigation";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await SignUpAccount(
      email,
      password,
      username,
      profilePicture
    );
    setError(error);
    router.push("/Home");
  };

  return (
    <div className="bg-white rounded-xl p-5 flex justify-center items-center flex-col shadow-2xl ">
      <p className="text-2xl text-violet-500 mb-5">Chat-App</p>
      <p className="text-xl text-gray-900 ">Register</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-5 items-center border-2 rounded-xl p-3 border-solid border-black mt-5 w-full"
      >
        <input
          className="border-b-2 border-black p-2 w-96 focus:border-b-2 focus:border-blue-500 focus:outline-none"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border-b-2 border-black p-2 w-96 focus:border-b-2 focus:border-blue-500 focus:outline-none"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-b-2 border-black p-2 w-96 focus:border-b-2 focus:border-blue-500 focus:outline-none"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="hidden"
          type="file"
          placeholder="Profile Picture"
          id="ProfilePicture"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />

        <label className="flex items-center" htmlFor="ProfilePicture">
          <Image
            src="/gallery.png"
            width={50}
            height={50}
            alt="Profile Picture"
          />
          <span className="ml-5">Add Avatar</span>
        </label>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
        >
          Sign Up
        </button>
        {error && <span>{error}</span>}
      </form>
      <div className="mt-3">
        Already have an account? Log In{" "}
        <Link href={"/"} className="text-blue-600 underline">
          Here
        </Link>
      </div>
    </div>
  );
};

export default Register;
