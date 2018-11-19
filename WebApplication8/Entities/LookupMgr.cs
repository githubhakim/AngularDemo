using MyKitchen.Web.DataAccess;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MyKitchen.Web.Models;
using System.Data;
using MyKitcket.BLL.Entities;

namespace MyKitcket.BLL.Entities
{
    

    public class LookupMgr
    {
        MyKitchenContext _db = new MyKitchenContext();


        public List<DtoLookup> GetAll( string lookupName)
        {

            List<DtoLookup> result = new List<DtoLookup>();

            using (var command = _db.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = string.Format( "select * from {0}", lookupName);
                command.CommandType = CommandType.Text;
                
                _db.Database.OpenConnection();
                using (var reader = command.ExecuteReader())
                {
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            result.Add(new DtoLookup() { Id= reader.GetByte(0), Name= reader.GetString(1) });
                        }
                    }

                }

                _db.Database.CloseConnection();
            }

            return result;
        }

       
    }
}
