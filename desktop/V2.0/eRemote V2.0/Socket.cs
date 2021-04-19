using eRemote_V2._0.LocalDatabase;
using SocketIOClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Net.NetworkInformation;
using System.Threading.Tasks;

namespace eRemote_V2._0
{
    class Socket
    {
        private static string API_LINK = ConfigurationManager.AppSettings["LOCALHOST"];
        private static Uri uri = new Uri(API_LINK);

        private static string key = fetch_key();
        public static SocketIO socket = new SocketIO(uri, new SocketIOOptions
        {
            Query = new Dictionary<string, string>
                {
                    {"token", "v3" },
                    {"key",key },
                    {"source","desktop" },
                },
            EIO = 4
        });
        private static string fetch_key()
        {

            var pc = SQLConnetion.LoadPC();
            foreach (var props in pc)
            {
                if (props.Key != null)
                {
                    return props.Key;
                }
            }

            return "";


        }
        public static async void Init_socket()
        {
            socket.OnConnected += Connect;
            socket.OnDisconnected += Disconnected;
            socket.OnError += Socket_OnError;

            while (!socket.Connected)
            {
                try
                {
                    await socket.ConnectAsync();
                    if (!socket.Connected) await Task.Delay(3000);

                }
                catch (Exception)
                {


                }

            }


        }


        private static void Disconnected(object sender, string e)
        {
            Debug.WriteLine("disconnect: " + e);
        }
        private static void Socket_OnError(object sender, string e)
        {
            Debug.WriteLine("Socket_OnError: " + e);
        }


        private static async void Connect(object sender, EventArgs e)
        {
            try
            {
                Debug.WriteLine("Socket_OnConnected");
                var socket = sender as SocketIO;
                // Get Stored Key in DB
                await socket.EmitAsync("turn_on", key);
                var b = Lib.ImageToByteArray(@"./objs/2.png");
                //    await socket.EmitAsync("screenshot", new {
                //        image = true,
                //        buffer = b,
                //        room = "nasr-pc-phone-website",
                //});
                Register_Listener();


            }
            catch (Exception ee)
            {
                Debug.WriteLine(ee);

            }

        }

        private static void Register_Listener()
        {
            socket.On("order", response =>
            {
                try
                {
                    // Recive Order and Send it to handlers
                    Debug.WriteLine(response.GetValue());
                }
                catch (Exception err)
                {
                    Debug.WriteLine(err);
                }
            });
        }

        public static void InternetListener()
        {
            NetworkChange.NetworkAvailabilityChanged += NetworkAvailabilityChangeHandler;

        }

        private static void NetworkAvailabilityChangeHandler(object sender, NetworkAvailabilityEventArgs e)
        {
            if (e.IsAvailable)
            {
                try
                {
                    var key = Lib.getKey();
                    if (key != "")
                    {
                        Info.Register_Info(key);
                        Orders.SyncLogger();
                    }

                }
                catch (Exception)
                {
                    Debug.WriteLine("Maybe Unreachable");
                }
            }
        }
    }


}
