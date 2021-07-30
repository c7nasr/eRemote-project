import React from "react";
import Head from "next/head";
import Sidebar from "./../../components/sidebar";
import PlaceHolderImage from "./../../components/PlaceHolderImage";
import CameraAndScreenImage from "./../../components/CameraAndScreenImage";

function Camera() {
  return (
    <div>
      <Head>
        <title>eRemote - Camera Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="md:flex md:flex-row ">
        <div className="flex-row md:flex-col ">
          <Sidebar />
        </div>

        <div className="min-h-screen flex items-start flex-col md:flex-row py-7 px-2 md:px-7 w-full md:flex-wrap h-screen">
          <div className="w-full">
            <h1 className="text-2xl font-bold antialiased">Camera tool</h1>
            <p className="text-lg ">
              Tool allow you to take instant camera photo of whatever
              surrounding it.
            </p>
            <PlaceHolderImage placeholder="Click Take Camera Shot to take camera Shot" />
            <button className={"btn-screenshot-enabled"}>
              Take Camera Shot
            </button>
            <h1 className="mt-2 text-xl font-bold">History of Camera</h1>
            <div className="flex flex-col flex-wrap md:flex-row ">
              <CameraAndScreenImage
                i_link="https://i.ibb.co/pKtrM7w/miai3c-DSp3.jpg"
                date="04:00PM@17July 2021"
              />
              <CameraAndScreenImage
                i_link="https://i.ibb.co/pKtrM7w/miai3c-DSp3.jpg"
                date="04:00PM@17July 2021"
              />
              <CameraAndScreenImage
                i_link="https://i.ibb.co/pKtrM7w/miai3c-DSp3.jpg"
                date="04:00PM@17July 2021"
              />
              <CameraAndScreenImage
                i_link="https://i.ibb.co/pKtrM7w/miai3c-DSp3.jpg"
                date="04:00PM@17July 2021"
              />
              <CameraAndScreenImage
                i_link="https://i.ibb.co/pKtrM7w/miai3c-DSp3.jpg"
                date="04:00PM@17July 2021"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Camera;
