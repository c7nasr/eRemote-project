import React from "react";
import Head from "next/head";
// add token to url to validate
function UnlockRansom() {
  return (
    <div className="flex bg-gray-900 h-screen text-white">
      <Head>
        <title>eRemote - Unlock your PC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="m-auto text-center">
        <img src="/logo.png" className="mx-auto  opacity-50 " />

        <h1 className="text-2xl">Unlock your pc from emergency locker</h1>
        <h3 className="text-6xl font-semibold mt-1">NXXX-XXXX-XXXX</h3>
        <h3 className="text-base text-green-800  mt-1">
          Thank you for trusting our service
        </h3>
      </div>
    </div>
  );
}

export default UnlockRansom;
