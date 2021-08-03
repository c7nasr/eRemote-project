import React from "react";

function Loading({ text }) {
  return (
    <div className="bg-gray-900 text-white w-full flex h-screen">
      <div className="m-auto text-center p-2">
        <h1 className="mb-2 text-5xl">{text}</h1>
        <h1 className="text-base">Please Wait</h1>
      </div>
    </div>
  );
}

export default Loading;
