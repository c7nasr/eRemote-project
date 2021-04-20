
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Configuration;
using System.Diagnostics;
using System.Threading.Tasks;

namespace eRemote_V2._0.LocalDatabase
{
    class Orders
    {
        private static string API_LINK = ConfigurationManager.AppSettings["API"];
        public static async Task CheckDBForOffileOrdersAsync()
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
                    await OrderHandlerAsync(order, orderID, key);

                }
                else if (Undone_Orders.Count > 0)
                {
                    foreach (var order in Undone_Orders)
                    {
                        if(MarkOrderAsDone(order.order, order.id, key,order.media))
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

        public static async Task OrderHandlerAsync(string order, string orderID, string key,string source ="")
        {

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
                    LockHandler.LockPC(key, orderID, source);
                    break;
                case "EYE_ON_THE_SKY":
                    //string timeStamp = Info.GetTimestamp(DateTime.Now);
                    //Camera.CaptureAsync($"cam_{timeStamp}_{key}.jpg",key,orderID).GetAwaiter();
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


