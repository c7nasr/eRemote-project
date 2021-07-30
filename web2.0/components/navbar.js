import React from "react";
import { useRouter } from "next/router";

import { useSpring, animated } from "react-spring";

function NavBar() {
  const [show, setShow] = React.useState(false);
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
  const router = useRouter();

  return (
    <nav className="w-full">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <svg
            aria-label="Home"
            className="cursor-pointer w-8 sm:w-auto"
            id="logo"
            enableBackground="new 0 0 300 300"
            height={54}
            viewBox="0 0 300 300"
            width={53}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g>
              <path
                fill="#FBD38D"
                d="m234.735 35.532c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16zm0 24c-4.412 0-8-3.588-8-8s3.588-8 8-8 8 3.588 8 8-3.588 8-8 8zm-62.529-14c0-2.502 2.028-4.53 4.53-4.53s4.53 2.028 4.53 4.53c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.027-4.53-4.529zm89.059 60c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.028-4.53-4.529c0-2.502 2.028-4.53 4.53-4.53s4.53 2.029 4.53 4.53zm-40.522-5.459-88-51.064c-1.242-.723-2.773-.723-4.016 0l-88 51.064c-1.232.715-1.992 2.033-1.992 3.459v104c0 1.404.736 2.705 1.938 3.428l88 52.936c.635.381 1.35.572 2.062.572s1.428-.191 2.062-.572l88-52.936c1.201-.723 1.938-2.023 1.938-3.428v-104c0-1.426-.76-2.744-1.992-3.459zm-90.008-42.98 80.085 46.47-52.95 31.289-23.135-13.607v-21.713c0-2.209-1.791-4-4-4s-4 1.791-4 4v21.713l-26.027 15.309c-1.223.719-1.973 2.029-1.973 3.447v29.795l-52 30.727v-94.688zm0 198.707-80.189-48.237 51.467-30.412 24.723 14.539v19.842c0 2.209 1.791 4 4 4s4-1.791 4-4v-19.842l26.027-15.307c1.223-.719 1.973-2.029 1.973-3.447v-31.667l52-30.728v94.729z"
              />
            </g>
          </svg>
          <p className="ml-2 lg:ml-4 text-base lg:text-2xl font-bold text-gray-800">
            eRemote
          </p>
        </div>
        <div>
          <div
            onClick={() => setShow(!show)}
            className="sm:block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
          >
            <svg
              aria-haspopup="true"
              aria-label="Main Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1={4} y1={8} x2={20} y2={8} />
              <line x1={4} y1={16} x2={20} y2={16} />
            </svg>
          </div>
          <div
            id="menu"
            className={show ? "lg:hidden block" : "md:block lg:block hidden"}
          >
            <div
              onClick={() => setShow(!show)}
              className="block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none z-30 top-0 pt-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </div>
            <ul className="flex text-3xl md:text-base items-center py-8 md:flex flex-col md:flex-row justify-center fixed md:relative top-0 bottom-0 left-0 right-0 bg-white z-20">
              <li className="text-gray-600 hover:text-gray-800 cursor-pointer md:ml-10 pt-10 md:pt-0">
                <a href="javascript: void(0)">Download</a>
              </li>
              <li className="text-gray-600 hover:text-gray-800 cursor-pointer md:ml-10 pt-10 md:pt-0">
                <a onClick={() => router.push("/register")}>Register</a>
              </li>
              <li className="text-gray-600 hover:text-gray-800 cursor-pointer md:ml-10 pt-10 md:pt-0">
                <a onClick={() => router.push("/login")}>Login</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
