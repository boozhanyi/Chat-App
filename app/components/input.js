import React, { useContext, useState } from "react";
import Image from "next/image";
import { ChatContext } from "../context/ChatContext";
import {
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const { data, currentUser } = useContext(ChatContext);

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());
      await uploadBytesResumable(storageRef, image);

      const downloadUrl = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "Chat", data.chatID), {
        message: arrayUnion({
          id: uuid(),
          text,
          senderID: currentUser.uid,
          date: Timestamp.now(),
          image: downloadUrl,
        }),
      });

      console.log("Sended");
    } else {
      await updateDoc(doc(db, "Chat", data.chatID), {
        message: arrayUnion({
          id: uuid(),
          text,
          senderID: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      console.log("Sended");
    }

    await updateDoc(doc(db, "UserChat", currentUser.uid), {
      [data.chatID + ".lastMessage"]: {
        text,
      },
      [data.chatID + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "UserChat", data.user.uid), {
      [data.chatID + ".lastMessage"]: {
        text,
      },
      [data.chatID + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  };

  return (
    <div className="bg-white mt-auto flex justify-between p-3 items-center">
      <input
        className="outline-none w-full mr-2"
        type="text"
        placeholder="Type Something"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="flex space-x-4 items-center">
        <Image src="/file.png" width={25} height={25} alt="File" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="file">
          <Image
            className=" max-w-max"
            src="/gallery.png"
            width={30}
            height={30}
            alt="Gallery"
          />
        </label>
        <button
          onClick={handleSend}
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-md p-2 w-20"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
