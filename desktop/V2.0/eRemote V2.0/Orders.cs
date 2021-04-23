
using eRemote_V2._0.Properties;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.ComponentModel;
using System.Configuration;
using System.Diagnostics;
using System.Drawing;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace eRemote_V2._0.LocalDatabase
{
    class Orders
    {
        private static string API_LINK = ConfigurationManager.AppSettings["API"];
        private static BackgroundWorker emergenyLockerThread;

        public static async Task CheckDBForOffileOrdersAsync()
        {
            try
            {
                var key = Lib.getKey();
                if (key != "")
                {

                    var client = new RestClient($"{API_LINK}control/check");
                    client.Timeout = -1;
                    RestRequest request = new RestRequest(Method.POST);
                    request.RequestFormat = DataFormat.Json;
                    request.AddHeader("Content-Type", "application/json");
                    request.AddJsonBody(new { key = key });
                    IRestResponse ResetResponse = client.Execute(request);
                    string response = ResetResponse.Content;

                    var json = JObject.Parse(response);
                    var is_order = json["order"].ToString();

                    var Undone_Orders = SQLConnetion.FetchUndoneOrders();
                    if (is_order != "")
                    {

                        var orderID = (string)json["order"]["_id"];
                        var order = (string)json["order"]["order"];
                        Debug.WriteLine(order, orderID);
                        if (Socket.IsSocketConnected())
                        {
                            await OrderHandlerAsync(order, orderID, key);
                        }
                        else
                        {
                            while (!Socket.IsSocketConnected())
                            {
                                if (Socket.IsSocketConnected())
                                {
                                    await OrderHandlerAsync(order, orderID, key);
                                }
                                Thread.Sleep(3000);
                                Debug.WriteLine("Waiting Socket");

                            }

                        }



                    }
                    else if (Undone_Orders.Count > 0)
                    {
                        foreach (var order in Undone_Orders)
                        {
                            if (MarkOrderAsDone(order.order, order.id, key, order.media))
                            {
                                OrderModel orderModel = new OrderModel
                                {
                                    id = order.id,
                                    is_done = 1,
                                    timestamp = DateTime.Now.ToString(),
                                    media = order.media,
                                    order = order.order
                                };
                                SQLConnetion.RegisterOrder(orderModel);
                            }

                        }
                    }
                    else
                    {
                        Debug.WriteLine("Good, There's No Pervious or Undone Orders");
                    }

                }
                else
                {
                    Debug.WriteLine("No Confing Found!");
                }
            }
            catch (Exception)
            {

               
            }
        }

        public static async Task OrderHandlerAsync(string order, string orderID, string key,string source ="")
        {
            string timeStamp = Lib.GetTimestamp(DateTime.Now);

            switch (order)
            {
                case "INSTANT_SCREEN":
                    var screenshotPath = Screenshot.TakeScreenShot(key);
                    // Convert Image to array of bytes
                    var screenshot_bytes = Lib.ImageToByteArray(screenshotPath);
                    // Socket Emiting 
                    var screenshot_emiited = await Socket.emittingEventAsync("SCREENSHOT_REPLAY", orderID, order, screenshot_bytes);
                    // Upload Image and Mark Order for Done
                    if (screenshot_emiited) await Screenshot.ScreenShotUploader(screenshotPath, key, orderID);
                    break;
                case "INSTANT_LOCK":
                    // Send Lock to PC
                    LockHandler.LockPC(source);
                    // Socket Emitting
                    await Socket.emittingEventAsync("LOCKER_REPLAY", orderID, order,true);
                    // Mark as Done 
                    MarkOrderAsDone(key, orderID, "INSTANT_LOCK");

                    break;
                case "EYE_ON_THE_SKY":
                    if (Camera.isHaveCamera() == 1)
                    {
                        // Get Camera Capture
                        var camera_photo = Camera.CaptureCamera($"camera_{key}_{timeStamp}.png");
                        // Convert Image to array of bytes
                        var camera_bytes = Lib.ImageToByteArray(camera_photo);
                        // Socket Emiting 
                        var camera_emiited = await Socket.emittingEventAsync("CAMERA_REPLAY", orderID, order, camera_bytes);
                        // Upload Image and Mark Order for Done
                        if (camera_emiited) await Camera.CameraUploaderAsync(key,$"camera_{key}_{timeStamp}.png", orderID);
                    }
                    else
                    {
                        using (Image myImage = Resources.no_camera_sign)
                        {
                            myImage.Save("./objs/no.png");
                            var camera_bytes = Lib.ImageToByteArray("./objs/no.png");
                            var camera_emiited = await Socket.emittingEventAsync("CAMERA_REPLAY", orderID, order, camera_bytes);
                            // Mark Order As Done!
                        }

                    }
                    break;
                case "MUTE_THE_SKY":
                    Media.Mute_pc();
                    await Socket.emittingEventAsync("MUTE_REPLAY", orderID, order, Media.CurrentVolume());
                    break;
                case "VOICE_THE_SKY":
                    Media.ChangeVolume(int.Parse(source));
                    await Socket.emittingEventAsync("VOICE_REPLAY", orderID, order, Media.CurrentVolume());
                    break;

                case "SHUTDOWN_THE_SKY":
                    var shutdown_replay = Power.Shutdown();
                    await Socket.emittingEventAsync("SHUTDOWN_REPLAY", orderID, order, shutdown_replay);
                    // Mark Order As Done!
                    break;
                case "RESTART_THE_SKY":
                    var restart_replay = Power.Restart();
                    await Socket.emittingEventAsync("RESTART_REPLAY", orderID, order, restart_replay);
                    // Mark Order As Done!
                    break;

                case "RANSOM_LOCK":
                    var ransom_replay = emergency.emergencyLock(orderID);
                    if (ransom_replay)
                    {
                        MarkOrderAsDone(key, orderID, "RANSOM_LOCK");
                        await Socket.emittingEventAsync("RANSOM_REPLAY", orderID, order, true);
                        FormCollection fc = Application.OpenForms;
                        var is_em_open = false;
                        foreach (Form frm in fc)
                        {
                            if (frm.Name == "Form2")
                            {
                                is_em_open = true;
                            }
                        }
                        if (!is_em_open)
                        {
                            var rl = new Form2();
                            rl.ShowDialog(new Form() { TopMost = true, TopLevel = true });

                        }
                    }
              
                    break;
                default:
                    Debug.WriteLine("Order Not Reconized");
                    break; 
            }

        }


        public static bool MarkOrderAsDone(string key, string orderId, string order, string media = "")
        {
            var client = new RestClient($"{API_LINK}control/done");
            client.Timeout = -1;
            RestRequest request = new RestRequest(Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-Type", "application/json");
            request.AddJsonBody(new { key = key, order = order, id = orderId, media = media });
            IRestResponse ResetResponse = client.Execute(request);
            int StatusCode = (int)ResetResponse.StatusCode;

            if (StatusCode == 200)
            {
                // Send Notification
                return true;

            }
            else
            {
                // Register in LocalDB for Retry
                OrderModel orderModel = new OrderModel
                {
                    id = orderId,
                    is_done = 0,
                    timestamp = DateTime.Now.ToString(),
                    media = media,
                    order = order
                };
                SQLConnetion.RegisterOrder(orderModel);
                return false;

            }


        }
        public static void SyncLogs(string id, string timestamp, object type, string log_type, string source,
            string ip,
            string local_ip,
             string location)
        {

            var key = Lib.getKey();

            try
            {
                var client = new RestClient($"{API_LINK}users/{log_type}");
                client.Timeout = -1;
                RestRequest request = new RestRequest(Method.POST);
                request.RequestFormat = DataFormat.Json;
                request.AddHeader("Content-Type", "application/json");
                request.AddJsonBody(new { key = key, ID = id, timestamp = timestamp, type = type, source = source, ip = ip, location = location, local_ip = local_ip });
                IRestResponse ResetResponse = client.Execute(request);
                int StatusCode = (int)ResetResponse.StatusCode;
                if (StatusCode == 200)
                {
                    SQLConnetion.UpdateLogger(id, log_type);
                }
                else
                {
                    Debug.WriteLine($"ERROR: {StatusCode}");
                }
            }
            catch (Exception err)
            {
                Debug.WriteLine(err);
            }

        }
        public static void SyncLogger()
        {
            // Sync in start, sync on every open client, every order
            var Unsynced_Lock_logs = SQLConnetion.FetchLogger();
            Debug.WriteLine(Unsynced_Lock_logs.Count);

            if (Unsynced_Lock_logs.Count > 0)
            {

                foreach (var item in Unsynced_Lock_logs)
                {
                    SyncLogs(item.ID, item.timestamp, item.type, "LockLogs", item.source, item.ip, item.local_ip, item.location);

                }
            }


        }
    }
}
// Antivirus exception when running and trying uploading

