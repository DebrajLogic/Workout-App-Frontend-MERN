import React from "react";

function Layout({ children }) {
  return (
    <div className="w-full h-screen my-10 p-10 bg-opacity-85 flex justify-center items-start">
      {children}
    </div>
  );
}

export default Layout;
