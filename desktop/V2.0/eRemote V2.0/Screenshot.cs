using eRemote_V2._0.LocalDatabase;
using System;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Imaging;
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
            Rectangle bounds = Screen.GetBounds(Point.Empty);
            using (Bitmap bitmap = new Bitmap(bounds.Width, bounds.Height))
            {
                using (Graphics g = Graphics.FromImage(bitmap))
                {
                    g.CopyFromScreen(Point.Empty, Point.Empty, bounds.Size);
                }
                string timeStamp = Lib.GetTimestamp(DateTime.Now);
                string ScreenshotName = $"ss_{timeStamp}_{key}.png";
                bitmap.Save($"./objs/{ScreenshotName}", ImageFormat.Png);
                var ActiveWindo = GetActiveWindowTitle();
                Debug.WriteLine($"Active Windo is {ActiveWindo}");
                return $"./objs/{ScreenshotName}";

            }

        }
        public static async Task ScreenShotUploader(string ScreenShotPath, string key, string orderId)
        {
            var link = await Uploader.UploadImagesAsync(ScreenShotPath, ScreenShotPath.Replace("./objs/", ""), key);
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
