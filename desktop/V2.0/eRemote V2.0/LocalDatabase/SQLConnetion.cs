using Dapper;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SQLite;
using System.Diagnostics;
using System.Linq;



namespace eRemote_V2._0.LocalDatabase
{
    class SQLConnetion
    {
        public static List<PCModel> LoadPC()
        {
            using (IDbConnection cnn = new SQLiteConnection(LoadConnectionString()))
            {
                var output = cnn.Query<PCModel>($"select * from PC", new DynamicParameters());
                return output.ToList();
            }
        }

        public static void RegisterPC(PCModel PC)
        {
            using (IDbConnection cnn = new SQLiteConnection(LoadConnectionString()))
            {

                cnn.Execute("INSERT OR REPLACE into PC (username, cpu,gpu,ip,mac_address,key,os,ram,mic,cam,battery,battery_percentage,location) " +
                    "values (@Username, @Cpu,@Gpu,@Ip,@MacAddress,@Key,@OS,@Ram,@Mic,@Camera,@Batttrey,@BatteryPercentage,@Location) ", PC);
            }
        }

        private static string LoadConnectionString(string id = "Default")
        {
            return ConfigurationManager.ConnectionStrings[id].ConnectionString;
        }

        public static void RegisterLockUnlockEvents(LockModel lockModel)
        {
            using (IDbConnection cnn = new SQLiteConnection(LoadConnectionString()))
            {
                cnn.Execute("insert into LockLogs (timestamp, type,ID,ip,local_ip,source,location) values (@timestamp, @type,@ID,@ip,@local_ip,@source,@location)", lockModel);
            }
        }

        public static List<LockModel> FetchLogger()
        {
            using (IDbConnection cnn = new SQLiteConnection(LoadConnectionString()))
            {
                var output = cnn.Query<LockModel>("select * from LockLogs where is_synced=0", new DynamicParameters());
                return output.ToList();
            }
        }

        public static bool UpdateLogger(string id, string table_name)
        {
            try
            {
                using (IDbConnection cnn = new SQLiteConnection(LoadConnectionString()))
                {
                    var output = cnn.Execute($"UPDATE {table_name} SET is_synced = 1 WHERE ID='{id}'");
                    Debug.WriteLine(output);
                    return true;
                }
            }
            catch (System.Exception err)
            {
                Debug.WriteLine(err);
                return false;
                throw;
            }
           
        }

    }
}
