using MyKitchen.Web.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using System.Data;
using MyKitchen.Web.DataAccess;
using MyKitchen.Web.Models;

namespace MyKitcket.BLL.Entities
{
   
    public class CustomerMgr 
    {
        Repo<MyKitchenContext, Customer> repo = new Repo<MyKitchenContext, Customer>();


        
        /// <summary>
        /// gets most active users 
        /// </summary>
        /// <returns></returns>
        public List<MostActiveUser> GetMostActiveUsersByDate()
        {

            // define a new output parameter
            var dateParam = new SqlParameter();
            dateParam.ParameterName = "@Date";
            dateParam.SqlDbType = SqlDbType.Date;
            dateParam.Direction = ParameterDirection.Input;
            dateParam.Value = DateTime.Now.Date;
            List<MostActiveUser > result= new List<MostActiveUser>();

            using (var command = repo.DbContext.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = "[dbo].[GetMostActiveUsers]";
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(dateParam);

                repo.DbContext.Database.OpenConnection();
                using (var reader = command.ExecuteReader())
                {
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            result.Add(new MostActiveUser() { UserName = reader.GetString(0), Rank =  reader.GetInt32(1) });
                        }
                    }
                    
                }
                repo.DbContext.Database.CloseConnection();
            }

            return  result;
        }

        public List<MostActiveUser> GetMostActiveUsers()
        {
            List<MostActiveUser> result = new List<MostActiveUser>();
            using (var command = repo.DbContext.Database.GetDbConnection().CreateCommand())
            {
                var dateParam = new SqlParameter();
                dateParam.ParameterName = "@Date";
                dateParam.SqlDbType = SqlDbType.Date;
                dateParam.Direction = ParameterDirection.Input;
                dateParam.Value = DBNull.Value;

                command.CommandText = "[dbo].[GetMostActiveUsers]";
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(dateParam);

                repo.DbContext.Database.OpenConnection();
                using (var reader = command.ExecuteReader())
                {

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            result.Add(new MostActiveUser() { UserName = reader.GetString(0), Rank = reader.GetInt32(1) });
                        }
                    }

                }
                repo.DbContext.Database.CloseConnection();
            }


            return result;
        }


        public List<Order> GetUserOrders(int customerId)
        {
            if (customerId <= 0)
                throw new Exception(string.Format( "{0} is empty", customerId)) ;

            return repo.DbContext.Order.Where(c => c.CustomerId == customerId).ToList();
            
        }


        public List<Customer> GetAll()
        {
            return repo.GetAll().ToList();

        }

        public PagingInfo GetPage(int pageNumber, int ItemsPerPage)
        {
            PagingInfo pagingInfo = new PagingInfo();
            
            pagingInfo.TotalRecords = this.repo.DbContext.Customer.Count();
            pagingInfo.ItemsPerPage = (pagingInfo.TotalRecords < ItemsPerPage) ? pagingInfo.TotalRecords : ItemsPerPage;
            pagingInfo.PageData =  this.repo.DbContext.Customer.OrderBy(c => c.FirstName).Skip(pageNumber * ItemsPerPage).Take(ItemsPerPage).ToArray() ;

            return pagingInfo;
        }



        public void Add( Customer customer)
        {
            repo.Add(customer);
            repo.Save();
        }

        public void Edit(Customer customer)
        {
            repo.Edit(customer);
            repo.Save();
        }

        public bool CheckEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return false;
            }

            return (repo.Find(c => c.Email.Trim() == email.Trim()).Count() > 0);
        }

        public Customer Get(int id)
        {
            return repo.Find(c => c.Id == id).FirstOrDefault();
        }

        public Customer[] Find(string phrase)
        {
            if (! string.IsNullOrEmpty( phrase ) )
                return repo.Find(c => c.FirstName.Contains( phrase.ToLower()) || c.LastName.Contains(phrase.ToLower() ) ).ToArray<Customer>();

            return null;
        }

        public void Delete(Customer customer)
        {
            repo.Delete(customer);
            repo.Save();
        }
    }
}
