"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Chat from "../components/chat";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Suspense } from "react";

const Page = () => {
  const router = useRouter();
  const [currentUser, setCurrentuser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentuser(user);
      } else {
        router.push("/");
      }
    });
  }, []);

  return (
    <>
      {currentUser && (
        <div className="flex border-2 rounded-xl w-3/4 h-3/4 border-black overflow-hidden">
          <Suspense fallback={<p>Loading Sidebar...</p>}>
            <Sidebar />
          </Suspense>
          <Suspense fallback={<p>Loading Chat...</p>}>
            <Chat />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Page;
