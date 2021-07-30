import React from "react";
import Head from "next/head";
import Sidebar from "../../components/sidebar";
import AudioSpectrum from "react-audio-spectrum";
import { useStopwatch, useTimer } from "react-timer-hook";
import CircularSlider from "@fseehawer/react-circular-slider";
import { useDebounce } from "use-debounce";

function Microphone() {
  const ref = React.useRef();
  const [isPlaying, SetIsPlaying] = React.useState(false);
  const [currentVolume, setCurrentVolume] = React.useState(30);
  const debouncedVolume = useDebounce(currentVolume, 200);

  React.useEffect(() => {
    console.log(debouncedVolume[0]);
  }, [debouncedVolume[0]]);

  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  return (
    <div>
      <Head>
        <title>eRemote - Microphone and Media</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="md:flex md:flex-row ">
        <div className="flex-row md:flex-col ">
          <Sidebar />
        </div>
        <div className="min-h-screen flex items-start flex-col md:flex-row py-7 px-2 md:px-7 w-full md:flex-wrap h-screen">
          <div className="w-full">
            <h1 className="text-3xl font-bold antialiased">
              Microphone and Media
            </h1>
            <p>Control your PC Media and listen live with your microphone</p>
            <div className="bg-gray-900 w-full  rounded-md p-8 shadow-2xl mt-3">
              <img
                src="/dash/microphone.png"
                width={150}
                className="mx-auto"
                onClick={() => {
                  ref.current.play();
                  start();
                  SetIsPlaying(true);
                }}
              />
              <audio
                id="audio-element"
                src="/beep.wav"
                preload
                ref={ref}
              ></audio>
              {isPlaying ? (
                <>
                  <div className="w-full flex">
                    <div className="mx-auto">
                      <AudioSpectrum
                        id="audio-canvas"
                        height={200}
                        audioId={"audio-element"}
                        capColor={"red"}
                        capHeight={2}
                        meterWidth={2}
                        meterCount={512}
                        meterColor={[
                          { stop: 0, color: "#f00" },
                          { stop: 0.5, color: "#0CD7FD" },
                          { stop: 1, color: "red" },
                        ]}
                        gap={4}
                      />
                    </div>
                  </div>
                  <div
                    className="text-white antialiased"
                    style={{ textAlign: "center" }}
                  >
                    <div style={{ fontSize: "100px" }}>
                      <span>{hours}</span>:<span>{minutes}</span>:
                      <span>{seconds}</span>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className="w-full bg-gray-900 rounded-md shadow-md flex flex-col md:flex-row pb-5 mb-5">
            <div className="p-7 mx-auto">
              <CircularSlider
                label="Speaker Volume"
                labelColor="#fff"
                knobColor="#005a58"
                progressColorFrom="#00bfbd"
                progressColorTo="#009c9a"
                progressSize={24}
                trackColor="#eeeeee"
                trackSize={24}
                max={100}
                appendToValue={"%"}
                dataIndex={currentVolume}
                onChange={async (value) => {
                  setCurrentVolume(value);
                }}
              />
              <img src="/media/mute.png" width={64} className="mx-auto mt-3" />
            </div>

            <div className="flex flex-row items-center  mx-auto ">
              <img src="/media/back.png" width={64} className="mr-7" />
              <img src="/media/play.png" width={64} className="mr-7" />
              <img src="/media/stop.png" width={64} className="mr-7" />
              <img src="/media/forward.png" width={64} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Microphone;
