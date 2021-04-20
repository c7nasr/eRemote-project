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


        public Form1()
        {
            InitializeComponent();
            LockHandler.StartLockLogger();
            Socket.InternetListener();
            Directory.CreateDirectory("objs");


        }

        private void button1_Click(object sender, EventArgs e)
        {
            // Making API Call to Validate the Code
            // if Valid? Message Box Program Running 
            // if Not? Beep Beep
            button1.Enabled = false;



            var internet = Lib.CheckForInternetConnection();
            if (!internet)
            {
                MessageBox.Show("No Internet Connection");
                return;

            }
            else
            {
                bool API_RESPONSE = LoginAndValidate.check_key_if_valid(textBox1.Text);

                bool is_valid = API_RESPONSE;

                if (is_valid)
                {
                    Info.Register_Info(textBox1.Text);
                    MessageBox.Show("Looks Like The Key You entered is correct. please, Click I entered Code on my PC button on eRemote App then click ok here");
                }
                else
                {
                    MessageBox.Show("Authentication Key Incorrect. Double Check it");
                    button1.Enabled = true;
                }
            }
           

            //Hide();
            //var f = new Form2();
            //f.ShowDialog();


            //Orders.SyncAndCheck();

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

    
        private void Form1_Load(object sender, EventArgs e)
        {

            // Register Protect Process Hook
            // dont forget check for lock


            var key = Lib.getKey();
            if (key != "")
            {
                Visible = false;
                ShowInTaskbar = false;
                Orders.CheckDBForOffileOrdersAsync().GetAwaiter().GetResult();
                Info.Register_Info(key);
                Orders.SyncLogger();
                Socket.Init_socket();
            }






        }
        private void Form1_Closing(object sender, FormClosingEventArgs e)
        {
            e.Cancel = true;

        }
     
        private void linkLabel1_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            Process.Start(new ProcessStartInfo("https://play.google.com/store/apps/details?id=n.eRemote") { UseShellExecute = true });
        }
    }
}
