import React from "react";
import Head from "next/head";
import NavBar from "../../components/navbar";
import { useForm } from "react-hook-form";
import Alert from "./../../components/Alert";
import { connect } from "react-redux";
import { login_action } from "./../../redux/actions/authentaction.action";
import { toast } from "react-toastify";
import authenticationService from "../../services/authentication.service";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { parseCookies } from "./../../services/cookies.service";
import Cookies from "cookies";
function Login({ login_action, sessionExpired }) {
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const login_data = await login_action(data.email, data.password);
    if (login_data.status === "failed") {
      toast.error("Email or Password is not Correct!", {});
    } else {
      setCookie("token", login_data.token, {
        path: "/",
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      });
      setCookie("refresh_token", login_data.refresh_token, {
        path: "/",
        maxAge: 86400, // Expires after 1hr
        sameSite: true,
      });
      toast.success("Logged in successfully", {});
      router.push("/dashboard");
    }
  };
  return (
    <div>
      <Head>
        <title>eRemote - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className="mt-32">
        <h1 className="text-center text-2xl text-gray-900 mb-4">
          Login to your Dashboard
        </h1>
        <div className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-3/4 md:w-1/2 mx-auto my-auto"
          >
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
                {...register("password", { required: true, minLength: 5 })}
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="********"
              />
              {errors.password && (
                <Alert text={"Password should be from 8 to 32 character"} />
              )}
            </label>

            <button
              type="submit"
              className="w-full h-11 mt-2 px-6 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default connect(null, { login_action })(Login);
export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx.req);
  try {
    await authenticationService.getUserData(cookies.token);
    ctx.res.statusCode = 302;
    ctx.res.setHeader("Location", `/dashboard`); // Replace <link> with your url link
    ctx.res.end();
    return {
      props: { sessionExpired: false },
    };
  } catch (error) {
    try {
      console.log("Session Expired");
      // Send Request to Get New Token based on Refresh Token

      const res = await authenticationService.refresh_token(
        cookies.refresh_token
      );
      if (res.token) {
        const cookies = new Cookies(ctx.req, ctx.res);
        cookies.set("token", res.token);
        ctx.res.statusCode = 302;
        ctx.res.setHeader("Location", `/dashboard`); // Replace <link> with your url link
        ctx.res.end();
      }
    } catch (error) {
      return {
        props: { sessionExpired: false },
      };
    }

    return {
      props: { sessionExpired: true },
    };
  }
}
