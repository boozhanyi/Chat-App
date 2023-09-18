"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [photo, setPhoto] = useState("/gallery.png");
  const [username, setUsername] = useState("ppp");
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPhoto(user.photoURL);
        setUsername(user.displayName);
      }
    });
  }, []);

  const logOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <div className="bg-slate-800 p-2 flex items-center justify-between flex-wrap h-16">
      <span className="text-white hover:text-red-600 font-medium text-xl">
        Chat-App
      </span>
      <div className="flex items-center space-x-3 flex-wrap">
        <div className="rounded-full overflow-hidden object-cover ml-2 bg-white w-8 h-8 relative">
          <Image src={photo} alt="profile picture" priority={true} fill />
        </div>
        <span className="text-white font-medium text-md">{username}</span>
        <button
          onClick={logOut}
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
