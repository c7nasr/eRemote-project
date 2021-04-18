using System;
using System.Text.RegularExpressions;
using System.Windows.Forms;
using System.Diagnostics;
using System.IO;
using eRemote_V2._0.LocalDatabase;
using System.Collections.Generic;

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

            //backgroundWorker1.RunWorkerAsync();
            //backgroundWorker1.RunWorkerCompleted += (s, e) => {
            //    MessageBox.Show(e.Result.ToString());
            //};



            //MessageBox.Show(Info.GetOperatingSystemInfo()[7].ToString());
            //logger = SQLConnetion.FetchLogger();
            //foreach (var item in logger)
            //{
            //    Debug.WriteLine(item.ID);
            //    Debug.WriteLine(item.type);
            //    Debug.WriteLine(item.timestamp);
            //}

            //PCModel p = new PCModel();
            //p.Username = "c7nasr";
            //p.Ram = "90GB";
            //p.MacAddress = "Mac Address is here";
            //p.Key = "Key is here";
            //p.Ip = "IP is here";
            //p.Gpu = "GPU";
            //p.Cpu = "CPU";
            //p.Camera = 2;
            //p.OS = "OS";
            //p.Mic = 1;
            //p.Batttrey = 1;
            //p.BatteryPercentage = 19;

            //SQLConnetion.RegisterPC(p);


            //Hide();
            //var f = new Form2();
            //f.ShowDialog();
            Orders.SyncAndCheck();

            button1.Enabled = true;
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

        private void backgroundWorker1_DoWork(object sender, System.ComponentModel.DoWorkEventArgs e)
        {
            LoginAndValidate LoginModule = new LoginAndValidate();
            string API_RESPONSE = LoginModule.apiReq();
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
