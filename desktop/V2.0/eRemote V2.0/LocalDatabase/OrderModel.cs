using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eRemote_V2._0.LocalDatabase
{
    class OrderModel
    {
        public string id { get; set; }
        public string order { get; set; }
        public int is_done { get; set; }
        public string media { get; set; }
        public string timestamp { get; set; }

    }
}
