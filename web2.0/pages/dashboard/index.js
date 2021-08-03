import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Sidebar from "./../../components/sidebar";
import LastActivity from "./../../components/LastActivity";
import authenticationService from "../../services/authentication.service";
import { formatTime, formatTimeAgo } from "../../services/time.service";
import { useSelector } from "react-redux";

import {
  useConnectSocket,
  addSocketListener,
} from "./../../hooks/connect.socket.hook";
const Map = dynamic(() => import("../../components/Map"), {
  loading: () => "Getting Last Known Location...",
  ssr: false,
});

function Dashboard({ userData, token }) {
  const user_state = useSelector((state) => state.auth.user);
  const socket_state = useSelector((state) => state.socket);

  const [isConnected] = useConnectSocket(userData);
  addSocketListener(token);

  if (!user_state || !user_state.pc)
    return <div className="h-screen bg-gray-900 text-white">Loading...</div>;
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
          <div
            className={
              socket_state.is_pc_connected ? "online_pc" : "offline_pc"
            }
          >
            <h1 className="font-bold text-2xl">
              Your PC is {socket_state.is_pc_connected ? "Online" : "Offline"}
            </h1>
            <p className="font text-base opacity-95">
              {socket_state.is_pc_connected
                ? "Your PC is LIVE and Reachable from our servers. you could use all functions without limits"
                : " We can't reach the desktop client. Maybe no active internet connection or PC is not running."}
            </p>
            <h5 className="font text-sm opacity-75">
              Last Update was from {formatTimeAgo(user_state.pc.updatedAt)} (
              {formatTime(user_state.pc.updatedAt)})
            </h5>
          </div>

          <div className="bg-blue-700 p-3 h-auto md:ml-4 flex flex-row items-center rounded w-full md:w-1/5 text-white mb-2">
            <img src="/dash/processor.png" width={64} height={80} />
            <div>
              <h1 className="font-base text-base ml-2">{user_state.pc.cpu}</h1>
              <h1 className="font-base text-base ml-2">{user_state.pc.gpu}</h1>
              <h1 className="font-base text-base ml-2">
                {user_state.pc.ram} GB
              </h1>
            </div>
          </div>

          <div className="bg-purple-600 p-3 h-auto md:ml-4 flex flex-row items-center rounded w-full md:w-1/4 text-white mb-2">
            <img src="/dash/windows.png" width={64} height={80} />
            <div>
              <h1 className="font-base text-2xl ml-2">
                {user_state.pc.system}
              </h1>
              <h1 className="font-base text-2xl ml-2">
                {user_state.pc.username}
              </h1>
            </div>
          </div>

          <div className="bg-yellow-700 p-3 h-auto md:ml-4 flex flex-row items-center rounded w-full md:w-1/4 text-white mb-2">
            <img src="/dash/battery.png" width={64} height={80} />
            <div>
              <h1 className="font-bold text-6xl ml-2">
                {user_state.pc.battery
                  ? user_state.pc.battery_percentage * 1
                  : "0%"}
              </h1>
            </div>
          </div>

          <div
            className={
              user_state.pc.is_desktop_locked
                ? "desktop_locked"
                : "desktop_unlocked"
            }
          >
            <img src="/dash/lock.png" width={64} height={80} />
            <div>
              <h1 className="font-bold text-4xl ml-2">
                {user_state.pc.is_desktop_locked
                  ? "Your Desktop is Locked"
                  : "Your Desktop is Unlocked"}
              </h1>
              <h5 className="font text-sm opacity-75 ml-3">
                Last Update was from {formatTimeAgo(user_state.pc.updatedAt)} (
                {formatTime(user_state.pc.updatedAt)})
              </h5>
            </div>
          </div>

          <div className="bg-gray-800 p-3 h-auto md:ml-4 flex flex-row items-center rounded w-full text-white mb-2">
            <img src="/dash/speaker.png" width={64} height={80} />
            <div>
              <h1 className="font-bold text-4xl ml-2">
                {user_state.pc.current_volume * 100}%
              </h1>
              <h5 className="font text-sm opacity-75 ml-3">
                Detected {user_state.pc.mic * 1} Microphone and{" "}
                {user_state.pc.is_have_speakers * 1} Speaker and{" "}
                {user_state.pc.cam * 1} Camera
              </h5>
            </div>
          </div>

          <LastActivity />
          {user_state.pc?.last_location ? (
            <div className="w-full h-auto">
              <Map location={user_state.pc?.last_location} />
            </div>
          ) : (
            <div>
              We Can't Get your PC Location. Please check GPS permissions on
              your pc and try again
            </div>
          )}

          <div className="w-full  bg-indigo-600  shadow-sm mb-2 text-center  text-white">
            <h1>
              {user_state.pc.ip}:{user_state.pc.mac_address}- {user_state.key}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
export async function getServerSideProps(ctx) {
  return authenticationService.authenticationProtocol(ctx);
}
