import React from "react";

function CameraAndScreenImage({ i_link, date }) {
  const fileDownloadHandler = async (pictures, image_id) => {
    const response = await fetch(pictures);
    response.blob().then((blob) => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = image_id + ".jpeg";
      a.click();
    });
  };
  return (
    <div className=" relative bg-gray-400 w-full md:w-1/5 rounded-md mt-4 mr-4 cursor-pointer border-4 ">
      <img src={i_link} onClick={() => fileDownloadHandler({ i_link }, date)} />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gray-300 opacity-75">
        <h1>{date}</h1>
      </div>
    </div>
  );
}

export default CameraAndScreenImage;
