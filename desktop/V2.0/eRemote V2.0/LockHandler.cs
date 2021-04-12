using System;
using System.Diagnostics;
using eRemote_V2._0.LocalDatabase;
using Microsoft.Win32;
namespace eRemote_V2._0
{
    class LockHandler
    {

        public static void LogLockAndUnlockEvents(object sender, SessionSwitchEventArgs e)
        {
            LockModel LockLogger = new LockModel();
            Guid myuuid = Guid.NewGuid();
            string LoggerID = myuuid.ToString();


            DateTime now = DateTime.Now;
            if (e.Reason == SessionSwitchReason.SessionLock)
            {
                LockLogger.type = 1;
                LockLogger.timestamp = now.ToString();
                LockLogger.ID = LoggerID;
                SQLConnetion.RegisterLockUnlockEvents(LockLogger);

            }
            else if (e.Reason == SessionSwitchReason.SessionUnlock)
            {
                LockLogger.type = 0;
                LockLogger.timestamp = now.ToString();
                LockLogger.ID = LoggerID;
                SQLConnetion.RegisterLockUnlockEvents(LockLogger);

            }
        }
        public static void LockPC(string key, string orderId)
        {
            Process.Start(@"C:\WINDOWS\system32\rundll32.exe", "user32.dll,LockWorkStation");
            Orders.MarkOrderAsDone(key, orderId, "INSTANT_LOCK");

        }

        public static void StartLockLogger()
        {
            SystemEvents.SessionSwitch += new SessionSwitchEventHandler(LogLockAndUnlockEvents);
        }
    }
}
