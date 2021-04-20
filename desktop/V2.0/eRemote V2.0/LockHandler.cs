using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using eRemote_V2._0.LocalDatabase;
using Microsoft.Win32;
namespace eRemote_V2._0
{
    class LockHandler
    {
        public static string source = "Manaul";
        public static void LogLockAndUnlockEvents(object sender, SessionSwitchEventArgs e)
        {
            LockModel LockLogger = new LockModel();
            Guid myuuid = Guid.NewGuid();
            string LoggerID = myuuid.ToString();


            DateTime now = DateTime.Now;
            LockLogger.timestamp = now.ToString();
            LockLogger.ID = LoggerID;
            LockLogger.local_ip = Lib.getLocalIP();
            LockLogger.ip = Lib.getIp();
            LockLogger.source = source;
            LockLogger.location = Lib.GetLocation();
            if (e.Reason == SessionSwitchReason.SessionLock)
            {
                LockLogger.type = 1;
                SQLConnetion.RegisterLockUnlockEvents(LockLogger);
              

            }
            else if (e.Reason == SessionSwitchReason.SessionUnlock)
            {
                LockLogger.type = 0;
                SQLConnetion.RegisterLockUnlockEvents(LockLogger);
            
            }
            source = "Manaul";
            Orders.SyncLogger();
        }
        public static void LockPC(string key, string orderId,string LockSource = "")

        {
            if (LockSource != "")
            {
                source = LockSource;
            }
            if (LockWorkStation())
            {
                Orders.MarkOrderAsDone(key, orderId, "INSTANT_LOCK");

            }

        }
        [DllImport("user32.dll")]
        public static extern bool LockWorkStation();

        public static void StartLockLogger()
        {
            SystemEvents.SessionSwitch +=  new SessionSwitchEventHandler(LogLockAndUnlockEvents);
        }
    }
}
