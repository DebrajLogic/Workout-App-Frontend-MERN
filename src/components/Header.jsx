import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="shadow-md w-full py-4 px-10">
      <Link to="/">
        <h1 className="text-blue-500 text-2xl font-semibold">Workout App</h1>
      </Link>
    </div>
  );
}

export default Header;
