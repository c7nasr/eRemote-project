using System;
using System.Collections.Generic;
using System.Text;
using System.Runtime.InteropServices;
using NAudio.Wave;
using System.Diagnostics;

namespace eRemote_V2._0
{
    class Microphone
    {
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
      
    }
}
