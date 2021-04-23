using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Data.SQLite;
using System.Linq;

namespace eRemote_V2._0.LocalDatabase
{
    class emergencySQL
    {
        public static  void RegisterLockAsync(emergencyModel emergency)
        {
            using (IDbConnection cnn = new SQLiteConnection(SQLConnetion.LoadConnectionString()))
            {
                emergencyUnlocker();
                cnn.Open();
                 cnn.Execute("INSERT OR REPLACE into RansomLocker " +
                    "(g_id,m_id,key,status,lock_time,lock_ip,lock_location,is_camera) " +
                    "values (@g_id,@m_id,@key,@status,@lock_time,@ip,@location,@camera) ", emergency);
                cnn.Dispose();
            }

        }
        public static List<emergencyModel> GetCurrentLocksAsync()
        {
            using (IDbConnection cnn = new SQLiteConnection(SQLConnetion.LoadConnectionString()))
            {
                cnn.Open();
                var output =  cnn.Query<emergencyModel>("SELECT * from RansomLocker WHERE status=1", new DynamicParameters());
                cnn.Dispose();
                return output.ToList();
            }
        }

        public static bool checkIfMiDExisted(string m_id)
        {
            using (IDbConnection cnn = new SQLiteConnection(SQLConnetion.LoadConnectionString()))
            {
                cnn.Open();
                var output = cnn.Query<emergencyModel>($"SELECT * from RansomLocker WHERE m_id='{m_id}'", new DynamicParameters()).ToList();
                cnn.Dispose();

                if (output.Count > 0) return true;
                return false;
            }
        }


        public static void UnlockLock(string m_id)
        {
            using (IDbConnection cnn = new SQLiteConnection(SQLConnetion.LoadConnectionString()))
            {
                cnn.Open();
                var output = cnn.Execute($"UPDATE RansomLocker SET status=0 WHERE m_id='{m_id}'", new DynamicParameters());
                cnn.Dispose();
            }
        }

        public static void emergencyUnlocker()
        {
            using (IDbConnection cnn = new SQLiteConnection(SQLConnetion.LoadConnectionString()))
            {
                cnn.Open();
                var output = cnn.Execute($"UPDATE RansomLocker SET status=0", new DynamicParameters());
                cnn.Dispose();
            }
        }


        public static void RegisterNewRetry(emergencyTriesModel retries)
        {
            using (IDbConnection cnn = new SQLiteConnection(SQLConnetion.LoadConnectionString()))
            {
                cnn.Open();
                cnn.Execute("INSERT into RansomLogger " +
                   "(g_id,m_id,key,try_time,try_ip,try_location,try_password,image,is_synced) " +
                   "values (@g_id,@m_id,@key,@try_time,@try_ip,@try_location,@try_password,@image,@is_synced) ", retries);
                cnn.Dispose();
            }

        }


        public static List<emergencyTriesModel> GetAllRetries()
        {
            using (IDbConnection cnn = new SQLiteConnection(SQLConnetion.LoadConnectionString()))
            {
                cnn.Open();
                var data = cnn.Query<emergencyTriesModel>("SELECT * from RansomLogger where is_synced=0");
                cnn.Dispose();
                return data.ToList();
            }

        }


        public static void SyncRetiresLocally(string try_time)
        {
            using (IDbConnection cnn = new SQLiteConnection(SQLConnetion.LoadConnectionString()))
            {
                cnn.Open();
                var output = cnn.Execute($"UPDATE RansomLogger SET is_synced=1 WHERE try_time='{try_time}'", new DynamicParameters());
                cnn.Dispose();
            }
        }

    }
}