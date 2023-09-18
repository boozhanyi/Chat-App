"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { auth, db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chat, setChat] = useState([]);
  const { dispatch, currentUser } = useContext(ChatContext);

  useEffect(() => {
    const getChat = () => {
      const unsub = onSnapshot(doc(db, "UserChat", currentUser.uid), (doc) => {
        setChat(doc.data());
      });
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChat();
  }, [currentUser.uid]);

  const handleSelect = (info) => {
    dispatch({ type: "CHANGE_USER", payload: info });
  };

  return (
    <div>
      {Object.entries(chat)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            key={chat[0]}
            className="mt-5 flex items-center flex-wrap pb-1 pt-2 hover:bg-slate-900"
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <div className="rounded-full overflow-hidden object-cover ml-2 bg-white w-14 h-14 relative">
              <Image
                src={chat[1].userInfo.photoURL}
                alt="profile picture"
                priority={true}
                fill
              />
            </div>
            <div className="flex flex-col ml-2 mr-2">
              <span className="text-white hover:text-red-600 hover:cursor-pointer font-medium text-xl">
                {chat[1].userInfo.displayName}
              </span>
              <p className="text-white  font-small text-md">
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
