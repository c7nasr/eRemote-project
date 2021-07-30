import React from "react";
import FCard from "./FCard";

export default function Features() {
  return (
    <div className="bg-green-800">
      <h1 className="text-center mt-12 py-5 text-2xl text-white uppercase font-semibold antialiased pb-4">
        A lot of features are waiting for you
      </h1>

      <div class="grid grid-cols-1 text-center pt-3 sm:grid-cols-3 gap-4  text-gray-900 w-full md:w-3/4 px-5 py-5 items-center mx-auto">
        <FCard
          icon="/icons/lock.png"
          title="Windows Lock"
          description={
            "With one click, You can Lock 🗝 Your PC with your Windows Lock Remotely. Not Just that! We also tracking all lock unlock events happen to your machine and you can review it any time any where and Download Reports."
          }
        />
        <FCard
          icon="/icons/power.png"
          title="Power Controller"
          description={
            "Power Controller mange you to restart or shutdown your pc remotely. We also offer a tracking reports for every single power request you can review it any time any where and Download Reports."
          }
        />
        <FCard
          icon="/icons/emergency.png"
          title="Emergency Locker"
          description={
            "Emergency Locker is smart new way to lock your PC. it's generates OTP accessible only by you. it uses your web cam to capture failed unlock retries! Click to know more about it"
          }
        />
        <FCard
          icon="/icons/eye.png"
          title="Eye on the Sky"
          description={
            "Eye on the sky. Forgot your pc? no problem. you can use Eye on the sky tool to capture photo from webcam of your laptop or pc. it's simple with one click and silent 🔇"
          }
        />
        <FCard
          icon="/icons/microphone.png"
          title="Ear on the Sky"
          description={
            "Want to hear what happen around? we offer you LIVE voice transmission from your microphone to your Dashboard with 2ms latency!. Click to know more"
          }
        />
        <FCard
          icon="/icons/screenshot.png"
          title="Screenshot Tool"
          description={
            "Screenshot tool is too simple it takes screenshot for whatever on your screen and send it to your Dashboard instantly!"
          }
        />
      </div>
      <h3 className="text-center text-gray-100 pb-4 text-xl font-bold ">
        And more are Waiting for you
      </h3>
    </div>
  );
}
