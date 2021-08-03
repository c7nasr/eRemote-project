import React from "react";
import Head from "next/head";
import Sidebar from "./../../components/sidebar";
import CameraAndScreenImage from "./../../components/CameraAndScreenImage";
import PlaceHolderImage from "./../../components/PlaceHolderImage";
import { useDispatch, useSelector } from "react-redux";
import authenticationService from "../../services/authentication.service";
import {
  addSocketListener,
  useConnectSocket,
} from "./../../hooks/connect.socket.hook";
import Loading from "../../components/Loading";
import {
  getHistory,
  getScreenshot,
} from "./../../redux/actions/screenshot.action";
import NoScreenCamera from "../../components/NoScreenCamera";
import ordersService from "../../services/orders.service";
import { formatTime } from "../../services/time.service";
import { fileDownloadHandler } from "../../functions/screenshot.functions";
function Screenshot({ userData, token }) {
  const user_state = useSelector((state) => state.auth.user);
  const socket_state = useSelector((state) => state.socket);
  const screenshot_state = useSelector((state) => state.screenshot);
  const [isConnected] = useConnectSocket(userData);
  const dispatch = useDispatch();
  addSocketListener(token);
  ordersService.addScreenshotListener();

  React.useEffect(() => {
    dispatch(getHistory(token));
  }, [token]);

  console.log(screenshot_state.incoming_screenshot);
  return (
    <div>
      <Head>
        <title>eRemote - Screenshot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="md:flex md:flex-row ">
        <div className="flex-row md:flex-col ">
          <Sidebar />
        </div>

        {!screenshot_state.is_loading ? (
          <div className="min-h-screen flex items-start flex-col md:flex-row py-7 px-2 md:px-7 w-full md:flex-wrap h-screen">
            <div className="w-full">
              <h1 className="text-2xl font-bold antialiased">
                Screenshot tool
              </h1>
              <p className="text-lg ">
                Tool allow you to take instant screenshot of whatever on your
                desktop.
              </p>

              {screenshot_state.incoming_screenshot.data ? (
                <img
                  src={screenshot_state.incoming_screenshot.data}
                  onClick={() =>
                    fileDownloadHandler(
                      screenshot_state.incoming_screenshot.data,
                      "incoming_screenshot"
                    )
                  }
                  className="rounded border"
                />
              ) : (
                <PlaceHolderImage placeholder="Click Take Screenshot to take screenshot" />
              )}

              <button
                onClick={() =>
                  dispatch(
                    getScreenshot(token, user_state.key, socket_state.socket)
                  )
                }
                className={
                  !socket_state.is_pc_connected ||
                  screenshot_state.incoming_screenshot.is_incoming
                    ? "btn-screenshot-disabled"
                    : "btn-screenshot-enabled"
                }
                disabled={
                  !socket_state.is_pc_connected ||
                  screenshot_state.incoming_screenshot.is_incoming
                }
              >
                Take Screenshot
              </button>
              <h1 className="mt-2 text-xl font-bold">History of Screenshot</h1>
              <div className="flex flex-col flex-wrap md:flex-row">
                {screenshot_state.history.length > 0 ? (
                  screenshot_state.history.map((item) => (
                    <CameraAndScreenImage
                      i_link={item.media}
                      date={formatTime(item.updatedAt)}
                    />
                  ))
                ) : (
                  <NoScreenCamera
                    text="You Don't have any screenshot history. Send some requests to
                  make history"
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <Loading text="We're processing a great work for you." />
        )}
      </div>
    </div>
  );
}

export default Screenshot;
export async function getServerSideProps(ctx) {
  return authenticationService.authenticationProtocol(ctx);
}
