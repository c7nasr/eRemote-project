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
        public static async Task Init_socket()
        {
            try
            {

           
            socket.OnConnected += Connect;
            socket.OnDisconnected += Disconnected;
            socket.OnError += Socket_OnError;

            while (!socket.Connected)
            {
                try
                {
                    await socket.ConnectAsync();
                    if (!socket.Connected) System.Threading.Thread.Sleep(3000);

                }
                catch (Exception)
                {
                    await socket.ConnectAsync();
                }

            }

            }
            catch (Exception)
            {

               
            }
        }


        private static void Disconnected(object sender, string e)
        {
            Debug.WriteLine("disconnect: " + e);
        }
        private static async void Socket_OnError(object sender, string e)
        {
            await socket.ConnectAsync();
            Debug.WriteLine("Socket_OnError: " + e);
        }


        private static async void Connect(object sender, EventArgs e)
        {
            try
            {
                Debug.WriteLine("Socket Connected");
                var socket = sender as SocketIO;
                await socket.EmitAsync("turn_on", key);

                Register_Listener();


            }
            catch (Exception ee)
            {
                Debug.WriteLine(ee);

            }

        }

        private static void Register_Listener()
        {
            socket.On("order", async response =>
            {
                // Recive Order and Send it to handlers
                try
                {

                    var orderId = response.GetValue();
                    var order = response.GetValue()["order"].ToString();
                    var source = response.GetValue();

                    if (orderId["orderid"] != null)
                    {
                        orderId = orderId["orderid"].ToString();
                    }
                    else
                    {
                        orderId = "";
                    }
                    if (source["source"] != null)
                    {

                        await Orders.OrderHandlerAsync(order, orderId.ToString(), key, source["source"].ToString());

                    }
                    else
                    {
                        source = "";
                        await Orders.OrderHandlerAsync(order, orderId.ToString(), key);

                    }
                }
                catch (Exception err)
                {
                    Debug.WriteLine(err);
                }
            });
        }



        public static async Task<bool> emittingEventAsync(string eventname, string orderId, string order, object data)
        {
            try
            {
                var key = Lib.getKey();

                await socket.EmitAsync(eventname, new
                {
                    data = data,
                    room = key,
                    order_id = orderId,
                    order = order,
                });


                Info.Register_Info(key);
                Orders.SyncLogger();
                return true;


                //Sync Clipoard and Active Window
            }
            catch (Exception error)
            {
                Debug.WriteLine(error);
                throw;
            }



        }
        public static bool IsSocketConnected()
        {
            return socket.Connected;
        }
        public static void InternetListener()
        {
            NetworkChange.NetworkAvailabilityChanged += NetworkAvailabilityChangeHandler;

        }


        private static void NetworkAvailabilityChangeHandler(object sender, NetworkAvailabilityEventArgs e)
        {
            if (e.IsAvailable && Lib.CheckForInternetConnection())
            {
                try
                {
                    var key = Lib.getKey();
                    if (key != "")
                    {
                        Info.Register_Info(key);
                        Orders.SyncLogger();
                        if (!socket.Connected) socket.ConnectAsync();
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
