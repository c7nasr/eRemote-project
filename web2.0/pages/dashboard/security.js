import React from "react";
import Head from "next/head";
import Sidebar from "./../../components/sidebar";
import SecurityActivity from "../../components/SecurityActivity";

export default function Security() {
  return (
    <div>
      <Head>
        <title>eRemote - Security Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="md:flex md:flex-row ">
        <div className="flex-row md:flex-col ">
          <Sidebar />
        </div>

        <div className="min-h-screen flex items-start flex-col md:flex-row py-7 px-2 md:px-7 w-full md:flex-wrap h-screen">
          <div className="w-full">
            <h1 className="text-2xl font-bold antialiased">Security Center</h1>
            <p className="text-lg ">Control your pc security in a few clicks</p>

            <div class="flex flex-col md:flex-row w-full text-white">
              <div class="grid flex-grow h-auto card bg-gray-700 rounded-box py-8 rounded-t md:rounded-l">
                <h1 className="font-extrabold text-2xl text-center">
                  🔐 Desktop Locker
                </h1>
                <ul className="mx-4">
                  <li>🔐 Desktop Locker is the default windows locker.</li>
                  <li>
                    🔐 It locks your screen with normal PC password (If
                    Existed).
                  </li>
                  <li>
                    🔐 We provide tracking for every unlock or lock event. you
                    can check it on table
                  </li>
                </ul>

                <button className="w-3/4 mx-auto rounded shadow-md  font-semibold mt-5 bg-yellow-700 p-2">
                  Lock my Desktop
                </button>
              </div>
              <div class="grid flex-grow h-auto card bg-gray-700 rounded-box py-8 rounded-b md:rounded-r">
                <h1 className="font-extrabold text-2xl text-center">
                  🚨 Emergency Locker
                </h1>
                <ul className="mx-4">
                  <li>🚨 Emergency Locker is a locker with OTP.</li>
                  <li>
                    🚨 Can't be unlocked except by the auto generated password.
                  </li>
                  <li>
                    🚨 Can't be bypassed. we tasted it against 17 scenario
                  </li>
                </ul>

                <button className="w-3/4 mx-auto rounded shadow-md  font-semibold mt-5 bg-red-700 p-2">
                  Lock my Desktop with Emergency Locker
                </button>
              </div>
            </div>
            <h3 className="font-bold text-2xl mt-3">
              History of Security Center
            </h3>
            <div className="md:hidden">
              <h1 className="text-red-500 text-center">
                Security Logs not avalible to view from mobile devices. Request
                desktop site or open from PC to check them out.
              </h1>
            </div>
            <div className="hidden md:block">
              <SecurityActivity />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
