import React from "react";

function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-black to-gray-700 gap-2 flex-col">
      <span className="px-2 py-1 my-4 font-bold text-slate-200 rounded-md text-8xl">
        404
      </span>
      <span className="my-4 text-4xl font-bold text-center text-slate-200">
        Page not found
      </span>
    </div>
  );
}

export default NotFound;
