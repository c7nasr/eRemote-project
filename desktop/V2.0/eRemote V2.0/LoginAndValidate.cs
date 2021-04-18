
using Newtonsoft.Json.Linq;
using RestSharp;

namespace eRemote_V2._0
{
    class LoginAndValidate
    {
        public string apiReq()
        {
            var client = new RestClient("https://api.igdb.com/v4/search");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("Client-ID", "ikvrxtp1ksuns35wgy9snbbqrzny8s");
            request.AddHeader("Authorization", "Bearer h9fz8mr7fo403duugbgwaqf1yoz2jx");
            request.AddHeader("Content-Type", "text/plain");
            request.AddHeader("Cookie", "__cfduid=d4a3c32bf17ae2113d8d5fe754d2011f41617208886");
            request.AddParameter("text/plain", "fields game.cover.url,name; search \"gta v\";", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);

            return response.Content;
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
