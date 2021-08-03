import React, { useState } from "react";
import { ImInfo } from "@react-icons/all-files/im/ImInfo";
import { BiFullscreen } from "@react-icons/all-files/bi/BiFullscreen";
import { BiMicrophone } from "@react-icons/all-files/bi/BiMicrophone";
import { MdSecurity } from "@react-icons/all-files/md/MdSecurity";
import { AiOutlineCamera } from "@react-icons/all-files/ai/AiOutlineCamera";
import { ImPowerCord } from "@react-icons/all-files/im/ImPowerCord";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../services/time.service";

function Sidebar() {
  const [OpenSideBar, setOpenSideBar] = useState(false);
  const socket_state = useSelector((state) => state.socket);
  const user_state = useSelector((state) => state.auth.user);

  const router = useRouter();
  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <>
      <div class="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        <a href="#" class="block p-4 text-white font-bold">
          Remotena
        </a>

        <button
          class="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700"
          onClick={() => setOpenSideBar(!OpenSideBar)}
        >
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div
        className={`bg-white dark:bg-gray-800  border-r  ${
          OpenSideBar ? "hidden " : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-evenly ">
          <div className="w-72 h-screen">
            <div className="flex items-center justify-start mx-6 mt-10">
              <img className="h-10 justify-center mx-auto" src="/logo.png" />
            </div>
            <div className="flex flex-row mx-auto justify-center">
              <h1 className="text-center opacity-50">
                {capitalizeFirstLetter(user_state?.key)}{" "}
                {socket_state.is_pc_connected ? "Online" : "Offline"}
              </h1>
            </div>
            <nav className="mt-10 px-6 ">
              <a
                onClick={(e) => handleClick(e, "/dashboard")}
                className={
                  router.pathname == "/dashboard" ? "active-link" : "link"
                }
              >
                <ImInfo size={20} />
                <span className="mx-4 text-lg font-normal">Home</span>
                <span className="flex-grow text-right"></span>
              </a>
              <a
                onClick={(e) => handleClick(e, "/dashboard/screenshot")}
                className={
                  router.pathname == "/dashboard/screenshot"
                    ? "active-link"
                    : "link"
                }
              >
                <BiFullscreen size={20} />

                <span className="mx-4 text-lg font-normal">
                  Screenshot Control
                </span>
                <span className="flex-grow text-right"></span>
              </a>
              <a
                onClick={(e) => handleClick(e, "/dashboard/security")}
                className={
                  router.pathname == "/dashboard/security"
                    ? "active-link"
                    : "link"
                }
              >
                <MdSecurity size={20} />

                <span className="mx-4 text-lg font-normal">
                  Security Center
                </span>
                <span className="flex-grow text-right"></span>
              </a>
              <a
                className={
                  router.pathname == "/dashboard/microphone"
                    ? "active-link"
                    : "link"
                }
                onClick={(e) => handleClick(e, "/dashboard/microphone")}
              >
                <BiMicrophone size={20} />
                <span className="mx-4 text-lg font-normal">
                  Microphone & Media
                </span>
              </a>

              <a
                className={
                  router.pathname == "/dashboard/camera"
                    ? "active-link"
                    : "link"
                }
                onClick={(e) => handleClick(e, "/dashboard/camera")}
              >
                <AiOutlineCamera size={20} />

                <span className="mx-4 text-lg font-normal">Camera Center</span>
              </a>
              <a
                className={
                  router.pathname == "/dashboard/power" ? "active-link" : "link"
                }
                onClick={(e) => handleClick(e, "/dashboard/power")}
              >
                <ImPowerCord size={20} />

                <span className="mx-4 text-lg font-normal">Power Center</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
