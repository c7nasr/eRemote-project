using Firebase.Storage;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Threading.Tasks;
using System.Windows.Forms;


namespace eRemote_V2._0
{
    class Uploader
    {
        public static async Task<string> UploadImagesAsync(string Path, string fileName, string key)
        {
            try
            {
                using (var stream = File.Open(Path, FileMode.Open))
                {
                    var task = new FirebaseStorage("ncontrol-8288b.appspot.com")
          .Child("V2.0")
          .Child(fileName)
          .PutAsync(stream);

                    task.Progress.ProgressChanged += (s, e) => Debug.WriteLine($"Progress: {e.Percentage} %");

                    // Await the task to wait until upload is completed and get the download url
                    return await task;
                }

         
            }
            catch (Exception err)
            {
                Debug.WriteLine(err);
                return "";
            }
           

        }
    }
}
