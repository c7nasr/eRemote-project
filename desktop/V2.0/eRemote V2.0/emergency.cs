using eRemote_V2._0.LocalDatabase;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Web.Script.Serialization;
using System.Windows.Forms;


namespace eRemote_V2._0
{
    class emergency
    {
        private static string API_LINK = ConfigurationManager.AppSettings["API"];
        private static string key = Lib.getKey();


        public static bool emergencyLock(string m_id)
        {
            Guid n_g_id = Guid.NewGuid();
            string g_id = n_g_id.ToString();

            var is_mid_existed = emergencySQL.checkIfMiDExisted(m_id);
            Debug.WriteLine(is_mid_existed);
            if (!is_mid_existed)
            {
                emergencyModel new_lock = new emergencyModel
                {
                    camera = Camera.isHaveCamera(),
                    g_id = g_id,
                    ip = Lib.getIp(),
                    location = Lib.GetLocation(),
                    lock_time = DateTime.Now.ToString(),
                    key = key,
                    m_id = m_id,
                    status = 1
                };
                emergencySQL.RegisterLockAsync(new_lock);

            }

   
            return true;
        }
        public static bool unlock_emergency(string enteredPassword)
        {
            bool should_i_unlock = true;


            // Some Warming up Validations
            if (enteredPassword.Length != 14)
            {
               
                Register_Retry(key, enteredPassword);
                should_i_unlock = false;
                return should_i_unlock;

            }

            // Send Request to API

            if (Lib.CheckForInternetConnection())
            {
                var location = Lib.GetLocation();
                bool check_result = SendPasswordCheck(enteredPassword,location);

                if (!check_result)
                {
                    Register_Retry(key, enteredPassword);
                    should_i_unlock = false;
                    return should_i_unlock;

                }

            }
            else
            {
                Register_Retry(key, enteredPassword);
                should_i_unlock = false;
                return should_i_unlock;

            }

            // Update Local DB

            var current_lock_info = emergencySQL.GetCurrentLocksAsync();
            var m_id = "";
            foreach (var item in current_lock_info)
            {
                m_id = item.m_id;
            }

            emergencySQL.UnlockLock(m_id);
            emergencySQL.emergencyUnlocker();
            return should_i_unlock;



        }

        private static bool SendPasswordCheck(string pass,string location)
        {


            var client = new RestClient($"{API_LINK}emergency/unlock");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-Type", "application/json");
            request.AddJsonBody(new { key = key,code = pass, location = location });
            IRestResponse ResetResponse = client.Execute(request);
            int response = (int)ResetResponse.StatusCode;

            if (response == 200)
            {
                SyncRetries();
                return true;
            }
            else
            {
                SyncRetries();
                return false;
            }
        }

        private async static void Register_Retry(string key,string pass)
        {
            try
            {
                var retryModel = new emergencyTriesModel();
                var current_lock_info = emergencySQL.GetCurrentLocksAsync();
                var camera_image_name = $"camera_ransome_incorrect_{key}_{Lib.GetTimestamp(DateTime.Now)}.png";
                if (Camera.isHaveCamera() == 1)
                {
                    Camera.CaptureCamera(camera_image_name);
                    string bird_image_link = await Camera.CameraUploaderAsync(key, camera_image_name);
                    retryModel.image = bird_image_link;
                }
                retryModel.image = "";


                foreach (var item in current_lock_info)
                {
                    retryModel.g_id = item.g_id;
                    retryModel.m_id = item.m_id;

                }
              
                retryModel.key = key;

                retryModel.is_synced = 0;
                retryModel.try_ip = Lib.getIp();
                retryModel.try_location = Lib.GetLocation();
                retryModel.try_password = pass;
                retryModel.try_time = DateTime.Now.ToString();


                emergencySQL.RegisterNewRetry(retryModel);
                SyncRetries();
            }
            catch (Exception)
            {

                throw;
            }
          


        }

        public static void SyncRetries()
        {
            var tries_table = emergencySQL.GetAllRetries();


            if (tries_table.Count > 0 && Lib.CheckForInternetConnection())
            {
                foreach (var item in tries_table)
                {
                    var client = new RestClient($"{API_LINK}emergency/logs");
                    var request = new RestRequest(Method.POST);
                    request.RequestFormat = DataFormat.Json;
                    request.AddHeader("Content-Type", "application/json");

                    request.AddJsonBody(new
                    {
                        key = item.key,
                        lock_id = item.g_id,
                        order_id = item.m_id,
                        try_time = item.try_time,
                        try_ip = item.try_ip,
                        try_location = item.try_location,
                        try_password = item.try_password,
                        image = item.image,
                    }
                    );
                    IRestResponse ResetResponse = client.Execute(request);
                    int responseCode = (int)ResetResponse.StatusCode;

                    if (responseCode == 200)
                    {
                        emergencySQL.SyncRetiresLocally(item.try_time);
                    }
                    else
                    {
                        Debug.WriteLine($"Not Good ....... {item.m_id}");
                    }

                }




            }
        }

        public static bool Is_emergency_locked()
        {

            bool online_locked = false;
            bool offline_locked = false;
            var m_id = "";
            Guid n_g_id = Guid.NewGuid();
            string g_id = n_g_id.ToString();

            // Check Online DB 
            if (Lib.CheckForInternetConnection() && Socket.IsSocketConnected())
            {


                var client = new RestClient($"{API_LINK}emergency/status");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.RequestFormat = DataFormat.Json;
                request.AddHeader("Content-Type", "application/json");
                request.AddJsonBody(new { key = key });
                Debug.WriteLine(key);

                IRestResponse ResetResponse = client.Execute(request);
                string response = ResetResponse.Content;


                var json = JObject.Parse(response);
                var is_locked_online = (bool)json["locked"];
                if (is_locked_online)
                {
                        m_id = json["id"].ToString();
                        Debug.WriteLine(m_id);
                        online_locked = true;
                }

            }

            //Check offline DB
            var is_locked = emergencySQL.GetCurrentLocksAsync().Count;
            Debug.WriteLine($"is Locked? :{is_locked}");
            if (is_locked > 0)
            {
                offline_locked = true;
            }


            if (!offline_locked && online_locked)
            {
                emergencyModel new_lock = new emergencyModel
                {
                    camera = Camera.isHaveCamera(),
                    g_id = g_id,
                    ip = Lib.getIp(),
                    location = Lib.GetLocation(),
                    lock_time = DateTime.Now.ToString(),
                    key = key,
                    m_id = m_id,
                    status = 1
                };
                emergencySQL.RegisterLockAsync(new_lock);
                return true;
            }else if (offline_locked && online_locked)
            {
                return true;
            }else if (offline_locked && !Socket.IsSocketConnected())
            {
                Debug.WriteLine("Oh, How it Even Possible O.o. Maybe Unreachable");
                return true;
            }else if (!online_locked && offline_locked && Lib.CheckForInternetConnection())
            {
                emergencySQL.emergencyUnlocker();
                return false;
            }else if (offline_locked && !Lib.CheckForInternetConnection())
            {
                return true;

            }
            else
            {
                return false;

            }
          

        }
    }
}
