
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Configuration;
using System.Diagnostics;

namespace eRemote_V2._0.LocalDatabase
{
    class Orders
    {
        private static string API_LINK = ConfigurationManager.AppSettings["API"];
        public static void SyncAndCheck()
        {
            // Check if New Orders Recived?
            // Sync Local DB

            // Inquriy for the Saved kay in Local DB
            var pc = SQLConnetion.LoadPC().Count;
            if (pc > 0)
            {
                var key = "n79f-7e21-72b8";
                var client = new RestClient($"{API_LINK}control/check");
                client.Timeout = -1;
                RestRequest request = new RestRequest(Method.POST);
                request.RequestFormat = DataFormat.Json;
                request.AddHeader("Content-Type", "application/json");
                // Key Will be from saved in DB
                request.AddJsonBody(new { key = key });
                IRestResponse ResetResponse = client.Execute(request);
                string response = ResetResponse.Content;

                var json = JObject.Parse(response);
                var is_order = json["order"].ToString();


                if (is_order != "")
                {
                    var orderID = (string)json["order"]["_id"];
                    var order = (string)json["order"]["order"];
                    Debug.WriteLine(order, orderID);
                    switch (order)
                    {
                        case "INSTANT_SCREEN":
                            Screenshot.TakeScreenShotAsync(key, orderID).GetAwaiter();
                            break;
                        case "INSTANT_LOCK":
                            LockHandler.LockPC(key, orderID);
                            break;
                        case "EYE_ON_THE_SKY":
                            string timeStamp = Info.GetTimestamp(DateTime.Now);
                            Camera.CaptureAsync($"cam_{timeStamp}_{key}.jpg",key,orderID).GetAwaiter();
                            break;
                        default:
                            Debug.WriteLine("Order Not Reconized");
                            break;
                    }


                }
                else
                {
                    Debug.WriteLine("No Orders.");
                }

            }
            else
            {
                Debug.WriteLine("No Confing Found!");
            }
        }
          

        public static bool MarkOrderAsDone(string key, string orderId, string order, string media= "")
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
                return false;

            }


        }
    }
}
