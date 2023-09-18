import React, { useContext, useEffect, useState } from "react";
import Message from "./message";
import { ChatContext } from "../context/ChatContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

const Messages = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Chat", data.chatID), (doc) => {
      if (doc.exists) {
        setMessages(doc.data().message);
      }
    });
    return () => {
      unsub();
    };
  }, [data.chatID]);

  return (
    <div className="bg-slate-300 grow overflow-y-auto overflow-x-auto no-scrollbar flex flex-col pt-3">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
