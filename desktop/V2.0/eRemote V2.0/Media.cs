using NAudio.CoreAudioApi;
using NAudio.Wave;
using System;
using System.Runtime.InteropServices;

namespace eRemote_V2._0
{
    class Media
    {
        [DllImport("user32.dll", SetLastError = true)]
        static extern void keybd_event(byte bVk, byte bScan, int dwFlags, int dwExtraInfo);
        public const int KEY_DOWN_EVENT = 0x0001; //Key down flag
        private static void ToggleVolume(int level)
        {
            try
            {
                //Instantiate an Enumerator to find audio devices
                NAudio.CoreAudioApi.MMDeviceEnumerator MMDE = new MMDeviceEnumerator();
                //Get all the devices, no matter what condition or status
                NAudio.CoreAudioApi.MMDeviceCollection DevCol = MMDE.EnumerateAudioEndPoints(NAudio.CoreAudioApi.DataFlow.All, NAudio.CoreAudioApi.DeviceState.All);
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

    }
}
