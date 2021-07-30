import React from "react";
import Head from "next/head";
import Sidebar from "./../../components/sidebar";
import PowerActivity from "./../../components/PowerActivity";

function Power() {
  return (
    <div>
      <Head>
        <title>eRemote - Power Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="md:flex md:flex-row ">
        <div className="flex-row md:flex-col ">
          <Sidebar />
        </div>
        <div className="min-h-screen flex items-start flex-col md:flex-row py-7 px-2 md:px-7 w-full md:flex-wrap h-screen">
          <div className="w-full">
            <h1 className="text-3xl font-bold antialiased">Power Center</h1>
            <p>
              Restart, Shutdown your PC in a few clicks Instantly or with smart
              time!
            </p>
            <div className="w-full flex flex-col  mx-auto justify-evenly mt-5 ">
              <button className="bg-blue-900 p-7 rounded-md text-center mb-2 ">
                <img src="/icons/restart.png" width={64} className="mx-auto" />
                <h4 className="text-white text-2xl mt-2">
                  Restart Your Device
                </h4>
              </button>
              <button className="bg-red-900 p-7 rounded-md ">
                <img src="/icons/shutdown.png" width={64} className="mx-auto" />
                <h4 className="text-white text-2xl mt-2">
                  Shutdown Your Device
                </h4>
              </button>
            </div>
            <h1 className="text-center text-6xl font-extrabold mt-5 text-gray-600">
              OR
            </h1>
            <div className="flex flex-row items-center my-4 border rounded border-opacity-50 border-indigo-700 md:border-0 p-2">
              <div className="mx-auto items-center">
                <h1 className="text-3xl font-bold mb-1">After</h1>
                <span>
                  <input
                    type={"number"}
                    placeholder="1"
                    min={1}
                    max={99}
                    className="rounded-xl w-auto border-purple-900"
                  />
                  <select className="rounded-xl ml-1 w-auto border-purple-900">
                    <option defaultChecked value="min">
                      Minutes
                    </option>
                    <option value="hr">Hours</option>
                  </select>
                </span>
                <select className="rounded-xl ml-1 w-auto border-red-900">
                  <option defaultChecked value="off">
                    Shutdown
                  </option>
                  <option value="restart">Restart</option>
                </select>
                <h1 className="text-3xl font-bold text-right">My PC</h1>
                <button className="text-2xl font-base bg-purple-900 p-2 text-white rounded shadow-lg mt-3 w-full mb-2 mx-auto">
                  Send
                </button>
              </div>
            </div>
            <PowerActivity />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Power;
