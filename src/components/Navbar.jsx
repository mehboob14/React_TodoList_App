import React from "react";

function Navbar() {
  return (
    <div className="container flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md">
      
      <div className="logo text-xl font-bold text-blue-500">iTask</div>

  
      <ul className="flex items-center gap-8 text-gray-700">
        <li className="hover:text-blue-500 cursor-pointer">Home</li>
        <li className="hover:text-blue-500 cursor-pointer">My Tasks</li>
      </ul>
    </div>
  );
}

export default Navbar;
