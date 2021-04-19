using eRemote_V2._0.LocalDatabase;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

using System.Windows.Forms;

namespace eRemote_V2._0
{
    class Screenshot
    {

        public static async System.Threading.Tasks.Task<string> TakeScreenShotAsync(string key,string orderId)
        {
            Rectangle bounds = Screen.GetBounds(Point.Empty);
            using (Bitmap bitmap = new Bitmap(bounds.Width, bounds.Height))
            {
                using (Graphics g = Graphics.FromImage(bitmap))
                {
                    g.CopyFromScreen(Point.Empty, Point.Empty, bounds.Size);
                }
                string timeStamp = Lib.GetTimestamp(DateTime.Now);
                string ScreenShotName = $"./objs/ss_{timeStamp}_{key}.png";
                bitmap.Save(ScreenShotName, ImageFormat.Png);

                //Upload it

                var link = await Uploader.UploadImagesAsync(ScreenShotName, $"ss_{timeStamp}_{key}.png", key);
                Orders.MarkOrderAsDone(key, orderId,"INSTANT_SCREEN",link);
                return link;

            }

        }
    }
}
