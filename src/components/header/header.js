import React from "react";
import "../header/header.css"
import Sidebar from "../sidebar/Sidebar";

function Header() {
  return (
    <div>
    <Sidebar/>
    <div className="container-fluid bg-black">
      <div className="container">
        <h2 className="text-white">Student CRUD</h2>
      </div>
    </div>
    </div>
  );
}

export default Header;
