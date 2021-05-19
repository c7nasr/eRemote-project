
using Newtonsoft.Json.Linq;
using RestSharp;
using System.Configuration;
using System.Diagnostics;
using System.Windows.Forms;

namespace eRemote_V2._0
{
    class LoginAndValidate
    {
        private static string API_LINK = ConfigurationManager.AppSettings["API"];

        public static bool check_key_if_valid(string key)
        {
            try
            {
                Debug.WriteLine($"{API_LINK}keys");
                var client = new RestClient($"{API_LINK}keys/connect/pc");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Content-Type", "application/json");
                request.AddJsonBody(new { key = key });
                IRestResponse response = client.Execute(request);
                string content = response.Content;
                var json = JObject.Parse(content);

                var is_valid = json["matched"];

                if (is_valid != null)
                {
                    return (bool)is_valid;

                }
                else
                {
                    return false;
                }
            }
            catch (System.Exception)
            {
                MessageBox.Show("our server seems down! try again in a mintue. we sorry for that");
                return false;
            }
          

        }
     
    }
 
}
