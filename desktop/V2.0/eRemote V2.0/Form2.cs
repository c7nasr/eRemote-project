using System;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;

namespace eRemote_V2._0
{
    public partial class Form2 : Form
    {
        ProtectClosingHook runTaskManager = new ProtectClosingHook();
        public IntPtr hHook;
        ProtectClosingHook.LowLevelKeyboardProcDelegate hookProc; // prevent gc

        public Form2()

        {
            InitializeComponent();
           
            IntPtr hModule = ProtectClosingHook.GetModuleHandle(IntPtr.Zero);
            hookProc = new ProtectClosingHook.LowLevelKeyboardProcDelegate(ProtectClosingHook.LowLevelKeyboardProc);
            hHook = ProtectClosingHook.SetWindowsHookEx(13, hookProc, hModule, 0);
            if (hHook == IntPtr.Zero)
            {
                MessageBox.Show("Failed to set hook, error = " + Marshal.GetLastWin32Error());
            }
            TopMost = true;
            ProtectProcess.Protect();
            runTaskManager.PreventTaskManger(false);
        }

     

        private void button1_Click(object sender, EventArgs e)
        {
            runTaskManager.PreventTaskManger(true);
            ProtectClosingHook.UnhookWindowsHookEx(hHook);
            ProtectProcess.Unprotect();
            this.Close();
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {
           
                string sVal = textBox1.Text;

                if (!string.IsNullOrEmpty(sVal))
                {
                    sVal = sVal.Replace("-", "");
                    string newst = Regex.Replace(sVal, ".{4}", "$0-");
                    textBox1.Text = newst;
                    textBox1.SelectionStart = textBox1.Text.Length;
                }

        }
    }
}
