import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Messages from "./messages";
import Input from "./input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="flex flex-col w-2/3">
      <div className="flex justify-between p-2 bg-slate-500 h-20">
        <div className="flex space-x-4 items-center">
          <div className="rounded-full overflow-hidden object-cover ml-2 bg-white w-12 h-12 relative">
            <Image src={data.user?.photoURL} alt="profile picture" fill />
          </div>

          <span className="text-white font-medium text-xl">
            {data.user?.displayName}
          </span>
        </div>
        <div className="flex ml-2 space-x-5 items-center">
          <Image src="/camera.png" width={25} height={25} alt="Camera" />
          <Image src="/add.png" width={25} height={25} alt="Add" />
          <Image src="/more.png" width={25} height={25} alt="More" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
