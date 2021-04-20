using eRemote_V2._0.LocalDatabase;
using Microsoft.Win32;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Management;

namespace eRemote_V2._0
{
    class Info
    {
        private static string API_LINK = ConfigurationManager.AppSettings["API"];

        public static List<string> GetOperatingSystemInfo()
        {

            string osname = "";
            string architecture = "";
            string processname = "";
            string memory = "";
            int isHaveCamera = Camera.isHaveCamera();

            ManagementObjectSearcher mos = new ManagementObjectSearcher("select * from Win32_OperatingSystem");
            foreach (ManagementObject managementObject in mos.Get())
            {
                if (managementObject["Caption"] != null)
                {

                    osname = (managementObject["Caption"].ToString());   //Display operating system caption
                }
                if (managementObject["OSArchitecture"] != null)
                {
                    architecture = managementObject["OSArchitecture"].ToString();   //Display operating system architecture.
                }

            }


            RegistryKey processor_name = Registry.LocalMachine.OpenSubKey(@"Hardware\Description\System\CentralProcessor\0", RegistryKeyPermissionCheck.ReadSubTree);   //This registry entry contains entry for processor info.

            if (processor_name != null)
            {
                if (processor_name.GetValue("ProcessorNameString") != null)
                {
                    processname = (string)processor_name.GetValue("ProcessorNameString");   //Display processor ingo.
                }
            }

            ObjectQuery wql = new ObjectQuery("SELECT * FROM Win32_OperatingSystem");
            ManagementObjectSearcher searcher = new ManagementObjectSearcher(wql);
            ManagementObjectCollection results = searcher.Get();

            double meomryInKB;

            foreach (ManagementObject result in results)
            {
                meomryInKB = Convert.ToDouble(result["TotalVisibleMemorySize"]);
                double fres = Math.Round(meomryInKB / (1024 * 1024), 2);
                memory = fres.ToString();
            }


            var isHaveMicrophone = Microphone.IsHaveMicrophone();
       
            var username = Environment.UserName;
            var gpuName = GetGpuInfo().ToString();
            var macAddress = GetSystemMACID();
            var ip = Lib.getIp();
            var isHaveBattery = GetBattrey();
            var location = Lib.GetLocation();

            int batteryPercentage = 0;

            batteryPercentage = (int)BatteryPercentage();

 
            var InfoForSubmit = new List<string>();
            InfoForSubmit.Add(username);
            InfoForSubmit.Add(ip);
            InfoForSubmit.Add(macAddress);

            InfoForSubmit.Add(osname);
            InfoForSubmit.Add(architecture);
            InfoForSubmit.Add(processname);
            InfoForSubmit.Add(memory);
            InfoForSubmit.Add(gpuName);


            InfoForSubmit.Add(isHaveCamera.ToString());
            InfoForSubmit.Add(isHaveMicrophone.ToString());
            InfoForSubmit.Add(isHaveBattery.ToString());
            InfoForSubmit.Add(batteryPercentage.ToString());
            InfoForSubmit.Add(location);



            return InfoForSubmit;

        }

        private static object GetGpuInfo()
        {
            using (var searcher = new ManagementObjectSearcher("select * from Win32_VideoController"))
            {
                foreach (ManagementObject obj in searcher.Get())
                {
                    return obj["Name"];
                }
            }
            return "Not Avalible";

        }

        private static string GetSystemMACID()
        {
            try
            {
                ManagementScope theScope = new ManagementScope("\\\\" + Environment.MachineName + "\\root\\cimv2");
                ObjectQuery theQuery = new ObjectQuery("SELECT * FROM Win32_NetworkAdapter");
                ManagementObjectSearcher theSearcher = new ManagementObjectSearcher(theScope, theQuery);
                ManagementObjectCollection theCollectionOfResults = theSearcher.Get();

                foreach (ManagementObject theCurrentObject in theCollectionOfResults)
                {
                    if (theCurrentObject["MACAddress"] != null)
                    {
                        string macAdd = theCurrentObject["MACAddress"].ToString();
                        return macAdd.Replace(':', '-');
                    }
                }
            }
            catch
            {
                return string.Empty;
            }
            return string.Empty;


        }

        private static int GetBattrey()
        {
            ObjectQuery query = new ObjectQuery("Select * FROM Win32_Battery");
            ManagementObjectSearcher searcher = new ManagementObjectSearcher(query);

            var battery_count = searcher.Get().Count;

           if (battery_count > 0)
            {
                return 1;
            }
            return 0;
        }


        private static object BatteryPercentage()
        {
            ObjectQuery query = new ObjectQuery("Select * FROM Win32_Battery");
            ManagementObjectSearcher searcher = new ManagementObjectSearcher(query);

            ManagementObjectCollection collection = searcher.Get();

            foreach (ManagementObject mo in collection)
            {
                foreach (PropertyData property in mo.Properties)
                {
                    // Issue in Returning Value
                    return property.Value;
                }
            }
            return 0;
        }
        private static void SyncInfo(List<string> infos)
        {
            var key = Lib.getKey();
            if (key != "")
            {

            try
            {
                var client = new RestClient($"{API_LINK}users/sky-info");
                    Debug.WriteLine($"{API_LINK}users/sky-info");
                client.Timeout = -1;
                RestRequest request = new RestRequest(Method.POST);
                request.RequestFormat = DataFormat.Json;
                request.AddHeader("Content-Type", "application/json");
                request.AddJsonBody(
                    
                    new { key = key, platform = "Windows",
                        username = infos[0],
                        last_location = infos[12],
                        cpu = infos[5],
                        gpu = infos[7],
                        ip = infos[1],
                        mac_address = infos[2],
                        system = infos[3],
                        ram = infos[6],
                        battery = infos[10],
                        battery_percentage = infos[11],
                        mic = infos[9],
                        cam = infos[8],
                    }
                    
                    
                    );
                IRestResponse ResetResponse = client.Execute(request);
                int StatusCode = (int)ResetResponse.StatusCode;
                if (StatusCode == 200)
                {
                    Debug.WriteLine($"Updated @{DateTime.Now}");
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

        }

        public static bool Register_Info(string key)
        {

            try
            {
                var infos = GetOperatingSystemInfo();

                PCModel p = new PCModel
                {
                    Username = infos[0],
                    Ip = infos[1],
                    MacAddress = infos[2],
                    OS = infos[3],
                    Cpu = infos[5],
                    Ram = infos[6],
                    Gpu = infos[7],
                    Camera = int.Parse(infos[8]),
                    Mic = int.Parse(infos[9]),
                    Batttrey = int.Parse(infos[10]),
                    BatteryPercentage = int.Parse(infos[11]),
                    Key = key,
                    Location = infos[12],
                    
                };
                SQLConnetion.RegisterPC(p);
                SyncInfo(infos);
                return true;

            }
            catch (Exception)
            {
                return false;

            }
          
        }
    }
}
