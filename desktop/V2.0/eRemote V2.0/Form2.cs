using System;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using System.ComponentModel;

namespace eRemote_V2._0
{
    public partial class Form2 : Form
    {
        private BackgroundWorker passcode;

        ProtectClosingHook runTaskManager = new ProtectClosingHook();
        IntPtr hHook;
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
            TopLevel = true;
            //ProtectProcess.Protect();
            runTaskManager.PreventTaskManger(false);

            string key = Lib.getKey();
            label5.Text = key;
        }



        private void button1_Click(object sender, EventArgs e)
        {
            button1.Enabled = false;
            textBox1.Enabled = false;
            textBox2.Enabled = false;
            textBox3.Enabled = false;

            passcode = new BackgroundWorker(); 
            passcode.DoWork += Passcode_DoWork;
            passcode.RunWorkerCompleted += Passcode_RunWorkerCompleted;

            passcode.RunWorkerAsync();


        }

        private void Passcode_DoWork(object sender, DoWorkEventArgs e)
        {
            var code = $"{textBox1.Text}-{textBox2.Text}-{textBox3.Text}";
            if (emergency.unlock_emergency(code))
            {
                e.Result = true;
            }
            else
            {
                e.Result = false;


            }
        }

        private void Passcode_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            if ((bool)e.Result == true)
            {
                runTaskManager.PreventTaskManger(true);
                ProtectClosingHook.UnhookWindowsHookEx(hHook);
                ProtectProcess.Unprotect();
                Close();
            }
            else
            {
                textBox1.Enabled = true;
                textBox2.Enabled = true;
                textBox3.Enabled = true;
                button1.Enabled = true;
                MessageBox.Show("Enterned Password isn't Correct! \n WARRING: Password is CASE senetive", "!!!",
                                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }


        }



        private void button2_Click(object sender, EventArgs e)
        {

        }

        private void Form2_Load(object sender, EventArgs e)
        {

        }
    }
}