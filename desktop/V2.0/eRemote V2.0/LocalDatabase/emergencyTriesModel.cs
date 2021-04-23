using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRemote_V2._0.LocalDatabase
{
    class emergencyTriesModel
    {
        public string m_id { get; set; }
        public string key { get; set; }
        public string g_id { get; set; }
        public string try_time { get; set; }
        public string image { get; set; }
        public string try_password { get; set; }
        public string try_location { get; set; }
        public string try_ip { get; set; }
        public int is_synced { get; set; }
    }
}
