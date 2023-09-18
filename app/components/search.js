"use client";

import React, { useState } from "react";
import Image from "next/image";
import { auth, searchChat, searchUsers } from "../firebase";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUsers] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    const result = await searchUsers(username);
    if (result) {
      setUsers(result);
      setError(false);
    } else {
      setError(true);
      setUsers(null);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleChat = async () => {
    const currentUser = auth.currentUser;

    const combinedID =
      currentUser.uid > user.id
        ? currentUser.uid + user.id
        : user.id + currentUser.uid;

    await searchChat(combinedID, currentUser, user);

    setUsers(null);
    setUsername("");
  };

  return (
    <div className="flex mt-2 flex-col">
      <input
        className="bg-transparent outline-none border-b w-4/5 ml-2 p-2 text-white"
        type="text"
        placeholder="Search Users"
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKey}
        value={username}
      />
      {error && (
        <div className="mt-5 flex items-center text-white justify-center">
          <span>No Users Found</span>
        </div>
      )}
      {user && (
        <div
          onClick={handleChat}
          className="mt-5 flex items-center flex-wrap border-b pb-2 pt-2 hover:bg-slate-900"
        >
          <div className="rounded-full overflow-hidden object-cover ml-2 bg-white w-14 h-14 relative">
            <Image
              src={user.data().ProfileImage}
              alt="profile picture"
              priority={true}
              fill
            />
          </div>
          <div className="flex flex-col ml-2 mr-2">
            <span className="text-white hover:text-red-600 hover:cursor-pointer font-medium text-xl">
              {user.data().Username}
            </span>
            <p className="text-white  font-small text-md">Hello</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
