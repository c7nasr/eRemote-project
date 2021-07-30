import React from "react";
import Head from "next/head";

function Code() {
  return (
    <div>
      <Head>
        <title>eRemote - Smart Remote PC Controller</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen bg-gray-900 px-7">
        <div className="m-auto">
          <h3 className="text-center pt-2 m-auto text-white text-xl text-opacity-50">
            Your Authentication Code
          </h3>
          <h1 className="text-center mt-2 m-auto text-white text-3xl md:text-7xl antialiased ">
            NXXX-XXXX-XXXX
          </h1>
          <h4 className="text-center text-white mt-3">
            Enter this code in pc client and click verify to complete
            registration process
          </h4>
          <button
            type="submit"
            className="w-full h-11 mt-2 px-6 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
          >
            I Clicked Verify on PC Client
          </button>
        </div>
      </div>
    </div>
  );
}

export default Code;
