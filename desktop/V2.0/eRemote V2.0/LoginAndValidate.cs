
using Newtonsoft.Json.Linq;
using RestSharp;
using System.Configuration;
using System.Diagnostics;

namespace eRemote_V2._0
{
    class LoginAndValidate
    {
        private static string API_LINK = ConfigurationManager.AppSettings["API"];

        public static bool check_key_if_valid(string key)
        {

            var client = new RestClient($"{API_LINK}users/connect");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("Content-Type", "application/json");
            request.AddJsonBody(new { key = key });
            IRestResponse response = client.Execute(request);
            string content = response.Content;
            var json = JObject.Parse(content);

            var is_valid = json["valid"];


            return (bool)is_valid;
        }
        public static string  IsInternetActive()
        {
            try
            {
                var client = new RestClient("https://api.ipify.org/?format=json");
                client.Timeout = -1;
                var request = new RestRequest(Method.GET);
                IRestResponse response = client.Execute(request);
                JObject json = JObject.Parse(response.Content);
                string ip = json.GetValue("ip").ToString();


                return ip;
            }
            catch
            {
                return "No Internet Connection";
            }
        }
    }
}
