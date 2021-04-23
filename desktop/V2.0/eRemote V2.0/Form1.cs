using System;
using System.Text.RegularExpressions;
using System.Windows.Forms;
using System.Diagnostics;
using System.IO;
using eRemote_V2._0.LocalDatabase;
using System.ComponentModel;

namespace eRemote_V2._0
{
    public partial class Form1 : Form
    {
        private BackgroundWorker validateThread;


        public Form1()
        {
            InitializeComponent();
            LockHandler.StartLockLogger();
            Socket.InternetListener();
            Directory.CreateDirectory("objs");


        }

        private  void  button1_Click(object sender, EventArgs e)
        {
            // Making API Call to Validate the Code
            // if Valid? Message Box Program Running 
            // if Not? Beep Beep
            button1.Enabled = false;
            validateThread = new BackgroundWorker();
            validateThread.DoWork += ValidateThread_DoWork;
            validateThread.RunWorkerCompleted += ValidateThread_RunWorkerCompleted;
            validateThread.RunWorkerAsync();

        }

        private void ValidateThread_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            if ((bool)e.Result == true)
            {
                MessageBox.Show("Looks Like The Key You entered is correct. please, Click I entered Code on my PC button on eRemote App then click ok here");
                Hide();
                Visible = false;
                ShowInTaskbar = false;
            }
            else
            {
                MessageBox.Show("Authentication Key Incorrect. Double Check it");
                button1.Enabled = true;

            }
        }

        private void ValidateThread_DoWork(object sender, DoWorkEventArgs e)
        {
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
                    e.Result = true;
                   
                }
                else
                {
                    e.Result = false;

                }
            }

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

    
        private async void Form1_Load(object sender, EventArgs e)
        {

            // Register Protect Process Hook
            // dont forget check for lock


            var key = Lib.getKey();
            FormCollection fc = Application.OpenForms;
            var is_em_open = false;
            if (key != "")
            {
                Visible = false;
                ShowInTaskbar = false;
                await Socket.Init_socket();
                if (emergency.Is_emergency_locked())
                {
                    foreach (Form frm in fc)
                    {
                        if (frm.Name == "Form2")
                        {
                            is_em_open = true;
                        }
                    }

                    if (!is_em_open)
                    {
                        var rl = new Form2();
                        rl.Show();
                    }
                 
                }
                backgroundWorker1.RunWorkerAsync(argument: key);

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

        private void backgroundWorker1_DoWork(object sender, System.ComponentModel.DoWorkEventArgs e)
        {
            Info.Register_Info(e.Argument.ToString());
            Orders.SyncLogger();
            _ = Orders.CheckDBForOffileOrdersAsync();

        }

    }
}
