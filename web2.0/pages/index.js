import Head from "next/head";
import React from "react";
import NavBar from "./../components/navbar";
import Hero from "../components/Hero";
import Features from "./../components/Featurers";

export default function Home() {
  return (
    <div>
      <Head>
        <title>eRemote - Smart Remote PC Controller</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-secondary-content	">
        <>
          <NavBar />
          <Hero />
          <Features />
        </>
      </main>
    </div>
  );
}
