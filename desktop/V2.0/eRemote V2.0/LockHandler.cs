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
        public static bool LockPC(string LockSource = "")

        {
            if (LockSource != "")
            {
                source = LockSource;
            }
            if (LockWorkStation())
            {
                return true;

            }
            else
            {
                return false;
            }

        }
        [DllImport("user32.dll")]
        public static extern bool LockWorkStation();

        public static void StartLockLogger()
        {
            SystemEvents.SessionSwitch +=  new SessionSwitchEventHandler(LogLockAndUnlockEvents);
        }


        [DllImport("user32", EntryPoint = "OpenDesktopA",
               CharSet = CharSet.Ansi,
               SetLastError = true,
               ExactSpelling = true)]
        private static extern Int32 OpenDesktop(string lpszDesktop,
                                  Int32 dwFlags,
                                  bool fInherit,
                                  Int32 dwDesiredAccess);

        [DllImport("user32", CharSet = CharSet.Ansi,
                             SetLastError = true,
                             ExactSpelling = true)]
        private static extern Int32 CloseDesktop(Int32 hDesktop);

        [DllImport("user32", CharSet = CharSet.Ansi,
                             SetLastError = true,
                             ExactSpelling = true)]
        private static extern Int32 SwitchDesktop(Int32 hDesktop);

        public static int is_desktop_locked()
        {
            const int DESKTOP_SWITCHDESKTOP = 256;
            int hwnd = -1;
            int rtn = -1;

            hwnd = OpenDesktop("Default", 0, false, DESKTOP_SWITCHDESKTOP);

            if (hwnd != 0)
            {
                rtn = SwitchDesktop(hwnd);
                if (rtn == 0)
                {
                    // Locked
                    CloseDesktop(hwnd);
                    return 1;
                }
                else
                {
                    // Not locked
                    CloseDesktop(hwnd);
                }
            }
            else
            {
                // Error: "Could not access the desktop..."
            }
            return 0;
        }
    }
}
