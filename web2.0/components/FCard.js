import React from "react";

export default function FCard({ title, description, icon }) {
  return (
    <div className="flex flex-col border border-opacity-10 border-gray-50  p-7 min-h-6 rounded items-center mb-5">
      <img width={70} height={70} src={icon} />
      <div>
        <h1 className="font-bold text-blue-50 mb-3 mt-2 text-xl text-opacity-95 subpixel-antialiased">
          {title}
        </h1>
        <p className="font-medium text-white text-opacity-70 subpixel-antialiased">
          {description}
        </p>
      </div>
    </div>
  );
}
