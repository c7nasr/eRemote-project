using System;
using System.Text.RegularExpressions;
using System.Windows.Forms;
using System.Diagnostics;
using System.IO;
using eRemote_V2._0.LocalDatabase;
using System.Collections.Generic;
using SocketIOClient;

namespace eRemote_V2._0
{
    public partial class Form1 : Form
    {

        List<PCModel> pc = new List<PCModel>();
        List<LockModel> logger = new List<LockModel>();

        public Form1()
        {
            InitializeComponent();
            LockHandler.StartLockLogger();
            Directory.CreateDirectory("objs");

        }

        private void button1_Click(object sender, EventArgs e)
        {
            // Making API Call to Validate the Code
            // if Valid? Message Box Program Running 
            // if Not? Beep Beep
            button1.Enabled = false;


            var infos = Info.GetOperatingSystemInfo();

            backgroundWorker1.RunWorkerAsync(argument: textBox1.Text);
            backgroundWorker1.RunWorkerCompleted += (s, check_result) =>
            {
                bool is_valid = (bool)check_result.Result;

                if (is_valid)
                {
                    PCModel p = new PCModel();
                    p.Username = infos[0];
                    p.Ip = infos[1];
                    p.MacAddress = infos[2];
                    p.OS = infos[3];
                    p.Cpu = infos[5];
                    p.Ram = infos[6];
                    p.Gpu = infos[7];
                    p.Camera = int.Parse(infos[8]);
                    p.Mic = int.Parse(infos[9]);
                    p.Batttrey = int.Parse(infos[10]);
                    p.BatteryPercentage = int.Parse(infos[11]);
                    p.Key = textBox1.Text;
                    SQLConnetion.RegisterPC(p);
                }
                else
                {
                    MessageBox.Show("Authentication Key Incorrect. Double Check it");
                }
            button1.Enabled = true;


            };



            //logger = SQLConnetion.FetchLogger();
            //foreach (var item in logger)
            //{
            //    Debug.WriteLine(item.ID);
            //    Debug.WriteLine(item.type);
            //    Debug.WriteLine(item.timestamp);
            //}



            //Hide();
            //var f = new Form2();
            //f.ShowDialog();


            //Orders.SyncAndCheck();


            //Socket.Init_socket();

        }


        private void textBox1_TextChanged(object sender, EventArgs e)
        {
            string sVal = textBox1.Text;

            if (!string.IsNullOrEmpty(sVal) && textBox1.Text.Length < 13)
            {
                sVal = sVal.Replace("-", "");
                string newst = Regex.Replace(sVal, ".{4}", "$0-");
                textBox1.Text = newst;
                textBox1.SelectionStart = textBox1.Text.Length;
            }
        }

        private void backgroundWorker1_DoWork(object sender, System.ComponentModel.DoWorkEventArgs e)
        {
            string key = (string)e.Argument;
            bool API_RESPONSE = LoginAndValidate.check_key_if_valid(key);
            e.Result = API_RESPONSE;

            
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            
            var internet = LoginAndValidate.IsInternetActive();
            if (internet == "No Internet Connection")
            {
                MessageBox.Show("No Internet Connection");
                
            }
            else
            {
                Debug.WriteLine("Internet is Active... Starting Workers");
                // Log
            }
            
        }
        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            e.Cancel = true;
        }
        private void linkLabel1_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            Process.Start(new ProcessStartInfo("https://play.google.com/store/apps/details?id=n.eRemote") { UseShellExecute = true });
        }
    }
}
