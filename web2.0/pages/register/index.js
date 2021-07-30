import React from "react";
import Head from "next/head";
import NavBar from "../../components/navbar";
import { useForm } from "react-hook-form";
import Alert from "./../../components/Alert";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <Head>
        <title>eRemote - Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="container mx-auto">
        <div className="mt-5">
          <h3 className="text-4xl antialiased  mt-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 text-center">
            Thank Your For Choosing eRemote
          </h3>
          <img
            src="/logo.png"
            width={128}
            alt="Remotena"
            className="flex justify-center items-center mx-auto mb-4 mt-3"
          />
          <div className="px-7">
            <h1 className="text-xl antialiased mb-2">
              1. Download Latest Version of Desktop Client{" "}
              <a href="/" className="text-blue-700">
                from here.
              </a>
            </h1>

            <h1 className="text-xl antialiased mb-2">
              2. Install Desktop Client V2.0.1.
            </h1>
            <h1 className="text-xl antialiased mb-2">
              3. Once PC Client installed it will ask you for authentication
              code ex: NXXX-XXXX-XXXX.
            </h1>
            <h1 className="text-xl antialiased mb-2">
              4. Register New Account to get your code.
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-7 mx-auto mt-11">
          <label className="block">
            <span className="text-gray-800">Your Email</span>
            <input
              {...register("email", {
                required: true,
                maxLength: 20,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              type="email"
              placeholder="john@example.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.email && <Alert text={"Email format isn't correct"} />}
          </label>

          <label className="block mt-4">
            <span className="text-gray-800">Password</span>
            <input
              {...register("password", {
                required: true,
                minLength: 5,
                maxLength: 32,
              })}
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="********"
            />
            {errors.password && (
              <Alert text={"Password should be from 5 to 32 character"} />
            )}
          </label>

          <button
            type="submit"
            className="w-full h-11 mt-2 px-6 text-white transition-colors duration-150 bg-green-600 rounded-lg focus:shadow-outline hover:bg-green-700"
          >
            Register
          </button>
        </form>
      </main>
    </div>
  );
}

export default Register;
