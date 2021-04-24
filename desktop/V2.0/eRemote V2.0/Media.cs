using NAudio.CoreAudioApi;
using NAudio.Wave;
using System;
using System.IO;
using System.Runtime.InteropServices;

namespace eRemote_V2._0
{
    class Media
    {
        [DllImport("user32.dll", SetLastError = true)]
        static extern void keybd_event(byte bVk, byte bScan, int dwFlags, int dwExtraInfo);
        public const int KEY_DOWN_EVENT = 0x0001; 
        public static WaveInEvent recorder;
        private static void ToggleVolume(int level)
        {
            try
            {
                //Instantiate an Enumerator to find audio devices
                MMDeviceEnumerator MMDE = new MMDeviceEnumerator();
                //Get all the devices, no matter what condition or status
                MMDeviceCollection DevCol = MMDE.EnumerateAudioEndPoints(DataFlow.All, NAudio.CoreAudioApi.DeviceState.All);
                //Loop through all devices
                foreach (NAudio.CoreAudioApi.MMDevice dev in DevCol)
                {
                    try
                    {
                        if (dev.State == NAudio.CoreAudioApi.DeviceState.Active)
                        {
                            var newVolume = (float)Math.Max(Math.Min(level, 100), 0) / (float)100;

                            //Set at maximum volume
                            dev.AudioEndpointVolume.MasterVolumeLevelScalar = newVolume;

                            dev.AudioEndpointVolume.Mute = level == 0;

                            //Get its audio volume
                        }
                        else
                        {
                        }
                    }
                    catch (Exception ex)
                    {
                        //Do something with exception when an audio endpoint could not be muted
                    }
                }
            }
            catch (Exception ex)
            {
                //When something happend that prevent us to iterate through the devices
            }
        }
        public static int IsHaveMicrophone()
        {
            int waveInDevices = WaveIn.DeviceCount;
            if (waveInDevices != 0)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }

        public static int IsHaveSpeakers()
        {
            int waveOutDevices = WaveOut.DeviceCount;
            if (waveOutDevices != 0)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        public static bool Mute_pc()
        {
            ToggleVolume(0);
            return true;
        }
        public static bool ChangeVolume(int RequestedVolume)
        {
            ToggleVolume(RequestedVolume);
            return true;
        }
        public static string CurrentVolume()
        {
            try
            {
                MMDeviceEnumerator MMDE = new MMDeviceEnumerator();
                return MMDE.GetDefaultAudioEndpoint(DataFlow.Render, Role.Communications).AudioEndpointVolume.MasterVolumeLevelScalar.ToString();
            }
            catch (Exception)
            {

                return "0";
            }
        }


        public static void PlayPauseMedia()
        {
            keybd_event(0xB3, 0, KEY_DOWN_EVENT, 0);
        }

        public static void NextMedia()
        {
            keybd_event(0xB0, 0, KEY_DOWN_EVENT, 0);
        }


        public static void PeriviousMedia()
        {
            keybd_event(0xB1, 0, KEY_DOWN_EVENT, 0);
        }
        public static void StartVoiceTransmition(float Vol=0.5f)
        {

            recorder = new WaveInEvent();

            var waveSourceSpeakers = new WasapiLoopbackCapture();

            recorder.BufferMilliseconds = 1000;
            recorder.WaveFormat = waveSourceSpeakers.WaveFormat;
            recorder.DataAvailable += (s, e) => Recorder_DataAvailable(s, e, Vol);
            recorder.StartRecording();
        }

        private static void BufferOptimiztion(string filename,float Vol = 0.5f)
        {
            float max = 0;
            using (var reader = new AudioFileReader(filename))
            {
                // find the max peak
                float[] buffer = new float[reader.WaveFormat.SampleRate];
                int read;
                do
                {
                    read = reader.Read(buffer, 0, buffer.Length);
                    for (int n = 0; n < read; n++)
                    {
                        var abs = Math.Abs(buffer[n]);
                        if (abs > max) max = abs;
                    }
                } while (read > 0);
                Console.WriteLine($"Max sample value: {max}");
                if (max == 0 || max > 1.0f)
                    throw new InvalidOperationException("File cannot be normalized");

                // rewind and amplify
                reader.Position = 0;
                reader.Volume = Vol / max;

                // write out to a new WAV file
                WaveFileWriter.CreateWaveFile16(filename.Replace("non_", ""), reader);

            }

        }

        private static Array BufferToEmit(string filename)
        {

            FileStream fs = new FileStream(filename.Replace("non_", ""), FileMode.Open, FileAccess.Read);
            MemoryStream ms = new MemoryStream();
            fs.CopyTo(ms);
            fs.Close();
            File.Delete(filename.Replace("non_", ""));
            File.Delete(filename);
            return  ms.ToArray();

        }

        private async static void Recorder_DataAvailable(object sender, WaveInEventArgs e,float Vol)
        {
            var file_name = $"./non_rec_{Guid.NewGuid().ToString()}.wav";
            Lib.WaveArrayToFile(file_name, e.Buffer);
            BufferOptimiztion(file_name, Vol);
            var readyBuffer = BufferToEmit(file_name);
            await Socket.socket.EmitAsync("RECORD_BUFFER", new { data = readyBuffer });

        }


    }
}
