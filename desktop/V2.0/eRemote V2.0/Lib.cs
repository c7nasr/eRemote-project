using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Drawing;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;
using System.Device.Location;
using System.Threading;
using eRemote_V2._0.LocalDatabase;

namespace eRemote_V2._0
{
    class Lib
    {
        public static byte[] ImageToByteArray(string imagePath)
        {
            using (var ms = new MemoryStream())
            {
                Image img = Image.FromFile(imagePath);

                img.Save(ms, img.RawFormat);
                return ms.ToArray();
            }



        }
        public static string GetTimestamp(DateTime value)
        {
            return value.ToString("yyyyMMddHHmmssffff");
        }

        public static string getIp()
        {
            try
            {
                var client = new RestClient("https://api.ipify.org/?format=json");
                client.Timeout = -1;
                var request = new RestRequest(Method.GET);
                IRestResponse response = client.Execute(request);
                JObject json = JObject.Parse(response.Content);
                string ip = json.GetValue("ip").ToString();
                return ip;
            }
            catch
            {
                return "No Internet Connection";
            }
        }
        public static string getLocalIP()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    return ip.ToString();
                }
            }
            throw new Exception("No network adapters with an IPv4 address in the system!");
        }

        public static bool CheckForInternetConnection(int timeOut = 3000)
        {
            var task = CheckForInternetConnectionTask(timeOut);

            return task.Wait(timeOut) && task.Result;
        }

        private static Task<bool> CheckForInternetConnectionTask(int timeOut = 3000)
        {
            return Task.Factory.StartNew
                (() =>
                {
                    try
                    {
                        var client = (HttpWebRequest)WebRequest.Create("http://google.com/");
                        client.Method = "HEAD";
                        client.Timeout = timeOut;

                        using (var response = client.GetResponse())
                        using (response.GetResponseStream())
                        {
                            return true;
                        }
                    }
                    catch
                    {
                        return false;
                    }
                });
        }


        public static string GetLocation()
        {
            bool abort = false;
            GeoCoordinateWatcher watcher = new GeoCoordinateWatcher(GeoPositionAccuracy.High);
            if (watcher.TryStart(false, TimeSpan.FromMilliseconds(3000)))
            {
                DateTime start = DateTime.Now;
                while (watcher.Status != GeoPositionStatus.Ready && !abort)
                {
                    Thread.Sleep(200);
                    if (DateTime.Now.Subtract(start).TotalSeconds > 5)
                        abort = true;
                }

                GeoCoordinate coord = watcher.Position.Location;
                if (!coord.IsUnknown)
                {
                    return $"{coord.Latitude},{coord.Longitude}";
                }
                else // Path taken most often
                {
                    return "0,0";

                }
            }
            else
            {
                return "0,0";
            }

        }
        public static string getKey()
        {

            var pc = SQLConnetion.LoadPC();
            var key = "";
            if (pc.Count > 0)
            {
                foreach (var props in pc)
                {
                    if (props.Key != null)
                    {
                        key = props.Key;
                    }
                }
            }

            return key;
        }

    }
}