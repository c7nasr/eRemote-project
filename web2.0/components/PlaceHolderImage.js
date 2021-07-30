import React from "react";

function PlaceHolderImage({ placeholder }) {
  return (
    <div>
      <div className="w-full bg-gray-400 rounded flex h-64 md:h-96  mt-4 border border-dashed">
        <h1 className="text-gray-50 text-center m-auto text-4xl font-bold antialiased">
          {placeholder}
        </h1>
      </div>
    </div>
  );
}

export default PlaceHolderImage;
