import React, { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { data, currentUser } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={ref}>
      {message.senderID !== currentUser.uid && (
        <div className="flex p-1">
          <div className="flex flex-col mr-4 items-center p-1 flex-shrink-0">
            <div className="rounded-full overflow-hidden object-cover ml-2 bg-white w-12 h-12 relative">
              <Image
                src={data.user.photoURL}
                alt="profile picture"
                priority={true}
                fill
              />
            </div>
            <span>Just Now</span>
          </div>
          <div className="flex flex-col mr-2 ">
            {message.text && (
              <p className="bg-blue-300 rounded-tr-lg rounded-br-lg rounded-bl-lg p-2 mb-2 mt-1 max-w-max text-white overflow-auto no-scrollbar">
                {message.text}
              </p>
            )}
            {message.image && (
              <Image
                src={message.image}
                width={300}
                height={300}
                alt="Profile Picture"
              />
            )}
          </div>
        </div>
      )}
      {message.senderID === currentUser.uid && (
        <div className="flex flex-row-reverse p-1">
          <div className="flex flex-col mr-4 items-center p-1 flex-shrink-0">
            <div className="rounded-full overflow-hidden object-cover ml-2 bg-white w-12 h-12 relative">
              <Image
                src={currentUser.photoURL}
                alt="profile picture"
                priority={true}
                fill
              />
            </div>
            <span>Just Now</span>
          </div>
          <div className="flex flex-col mr-2 items-end">
            {message.text && (
              <p className="bg-blue-300 rounded-tr-lg rounded-br-lg rounded-bl-lg p-2 mb-2 mt-1 max-w-max text-white overflow-auto no-scrollbar">
                {message.text}
              </p>
            )}
            {message.image && (
              <Image
                src={message.image}
                width={300}
                height={300}
                alt="Profile Picture"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
