import React from "react";
import Navbar from "./navbar";
import Search from "./search";
import Chats from "./chats";

const Sidebar = () => {
  return (
    <div className="w-1/3 bg-slate-600">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
