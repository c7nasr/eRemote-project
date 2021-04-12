using Microsoft.Win32;
using System;
using System.Runtime.InteropServices;

public partial class ProtectClosingHook
{
    public struct KBDLLHOOKSTRUCT
    {
        public int vkCode;
        int scanCode;
        public int flags;
        int time;
        int dwExtraInfo;
    }

    public delegate int LowLevelKeyboardProcDelegate(int nCode, int wParam, ref KBDLLHOOKSTRUCT lParam);

    [DllImport("user32.dll")]
    public static extern IntPtr SetWindowsHookEx(int idHook, LowLevelKeyboardProcDelegate lpfn, IntPtr hMod, int dwThreadId);

    [DllImport("user32.dll")]
    public static extern bool UnhookWindowsHookEx(IntPtr hHook);

    [DllImport("user32.dll")]
    public static extern int CallNextHookEx(int hHook, int nCode, int wParam, ref KBDLLHOOKSTRUCT lParam);

    [DllImport("kernel32.dll")]
    public static extern IntPtr GetModuleHandle(IntPtr path);

    
    const int WH_KEYBOARD_LL = 13;



    public static int LowLevelKeyboardProc(int nCode, int wParam, ref KBDLLHOOKSTRUCT lParam)
    {
        if (nCode >= 0)
            switch (wParam)
            {
                case 256: // WM_KEYDOWN
                case 257: // WM_KEYUP
                case 260: // WM_SYSKEYDOWN
                case 261: // M_SYSKEYUP
                    if (
                        (lParam.vkCode == 0x09 && lParam.flags == 32) || // Alt+Tab
                        (lParam.vkCode == 0x1b && lParam.flags == 32) || // Alt+Esc
                        (lParam.vkCode == 0x73 && lParam.flags == 32) || // Alt+F4
                        (lParam.vkCode == 0x1b && lParam.flags == 0) || // Ctrl+Esc
                        (lParam.vkCode == 0x5b && lParam.flags == 1) || // Left Windows Key 
                        (lParam.vkCode == 0x5c && lParam.flags == 1))    // Right Windows Key 
                    {
                        return 1; //Do not handle key events
                    }
                    break;
            }
        return CallNextHookEx(0, nCode, wParam, ref lParam);
    }


 
    public void PreventTaskManger(bool enable)
    {
        
        RegistryKey objRegistryKey = Registry.CurrentUser.CreateSubKey(
          @"Software\Microsoft\Windows\CurrentVersion\Policies\System");
        if (enable && objRegistryKey.GetValue("DisableTaskMgr") != null)
            objRegistryKey.DeleteValue("DisableTaskMgr");
        else
            objRegistryKey.SetValue("DisableTaskMgr", "1");
        objRegistryKey.Close();
    }
}