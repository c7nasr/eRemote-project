import React, { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Sidebar from "./../../components/sidebar";
import LastActivity from "./../../components/LastActivity";
const Map = dynamic(() => import("../../components/Map"), {
  loading: () => "Loading...",
  ssr: false,
});

function Dashboard() {
  return (
    <div>
      <Head>
        <title>eRemote - Control Panel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="md:flex md:flex-row ">
        <div className="flex-row md:flex-col ">
          <Sidebar />
        </div>

        <div className="flex flex-col md:flex-row py-7 px-2 md:px-7 w-full h-1/2 flex-auto md:flex-wrap ">
          <div className="bg-red-800 p-3 h-auto md:ml-4 rounded w-full  text-white mb-2">
            <h1 className="font-bold text-2xl">Your PC is Offline</h1>
            <p className="font text-base opacity-95">
              We can't reach the desktop client. Maybe no active internet
              connection or PC is not running.
            </p>
            <h5 className="font text-sm opacity-75">
              Last Update was from 3 days ago (3 July 2021 @ 05:06PM)
            </h5>
          </div>

          <div className="bg-blue-700 p-3 h-auto md:ml-4 flex flex-row items-center rounded w-full md:w-1/5 text-white mb-2">
            <img src="/dash/processor.png" width={64} height={80} />
            <div>
              <h1 className="font-base text-xl ml-2">CPU detected</h1>
              <h1 className="font-base text-xl ml-2">GPU detected</h1>
              <h1 className="font-base text-xl ml-2">Ram Detected</h1>
            </div>
          </div>

          <div className="bg-purple-600 p-3 h-auto md:ml-4 flex flex-row items-center rounded w-full md:w-1/4 text-white mb-2">
            <img src="/dash/windows.png" width={64} height={80} />
            <div>
              <h1 className="font-base text-2xl ml-2">System</h1>
              <h1 className="font-base text-2xl ml-2">Username</h1>
            </div>
          </div>

          <div className="bg-yellow-700 p-3 h-auto md:ml-4 flex flex-row items-center rounded w-full md:w-1/4 text-white mb-2">
            <img src="/dash/battery.png" width={64} height={80} />
            <div>
              <h1 className="font-bold text-6xl ml-2">0%</h1>
            </div>
          </div>

          <div className="bg-red-600 p-3 h-auto md:ml-4 flex flex-row items-center rounded w-full md:w-1/4 text-white mb-2">
            <img src="/dash/lock.png" width={64} height={80} />
            <div>
              <h1 className="font-bold text-4xl ml-2">
                Your Desktop is Locked
              </h1>
              <h5 className="font text-sm opacity-75 ml-3">
                Last Update was from 3 days ago (3 July 2021 @ 05:06PM)
              </h5>
            </div>
          </div>

          <div className="bg-gray-800 p-3 h-auto md:ml-4 flex flex-row items-center rounded w-full  text-white mb-2">
            <img src="/dash/speaker.png" width={64} height={80} />
            <div>
              <h1 className="font-bold text-4xl ml-2">1%</h1>
              <h5 className="font text-sm opacity-75 ml-3">
                Detected X Microphone and X Speaker and X Camera
              </h5>
            </div>
          </div>

          <LastActivity />
          <div className="w-full h-auto">
            <Map />
          </div>
          <div className="w-full  bg-indigo-600  shadow-sm mb-2 text-center  text-white">
            <h1>192.168.1.1:54-A0-50-7E-64-4A - NXXX-XXXX-XXXX</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
