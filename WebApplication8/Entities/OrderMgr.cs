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
    #region helper types 
 


    #endregion helper types 

    public class OrderMgr
    {
        Repo<MyKitchenContext, Order> repo = new Repo<MyKitchenContext, Order>();

        public List<MostOrderedItems> GetMostOrderedItems(DateTime from, DateTime to)
        {
            var result = new List<MostOrderedItems>();
            var fromParam = new SqlParameter();
            fromParam.ParameterName = "@From";
            fromParam.SqlDbType = SqlDbType.Date;
            fromParam.Direction = ParameterDirection.Input;
            fromParam.Value = from.Date;

            var toParam = new SqlParameter();
            toParam.ParameterName = "@To";
            toParam.SqlDbType = SqlDbType.Date;
            toParam.Direction = ParameterDirection.Input;
            toParam.Value = to.Date;
            using (var command = repo.DbContext.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = "[dbo].[GetMostOrderedItems]";
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(fromParam);
                command.Parameters.Add(toParam);

                repo.DbContext.Database.OpenConnection();
                using (var reader = command.ExecuteReader())
                {
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            result.Add(new MostOrderedItems() { Id = reader.GetInt32(0), Name = reader.GetString(1), OrderedNumber = reader.GetInt32(2) });
                        }
                    }
                }
            }
            return result;
        }
    

        public void AddOrderItem(OrderItem[] orderItems)
        {
            foreach (var item in orderItems)
            {
                repo.DbContext.OrderItem.Add(item);
            }
            repo.Save();

        }

        public List<Order> GetAll(bool withOrderItems)
        {
            List<Order> result = null;
            
            if (withOrderItems)
                result = repo.DbContext.Order.Include("OrderItem").Include("OrderItem.OrderItemAddon").ToList();
                
            else
                result = repo.GetAll().ToList();

            return result;
        }

        public Order Get(int id, bool withOrderItems)
        {
            Order result = null;
            if (withOrderItems)
            {
                result = repo.Find(o => o.Id == id).Include("OrderItem").Include("OrderItem.OrderItemAddon").FirstOrDefault();

            }
            else
                result = repo.Find(o => o.Id == id).FirstOrDefault();



            return result;
        }


        public void Add(Order order)
        {
            repo.Add(order);
            repo.Save();
            var orderItems = order.OrderItem.ToList();

            for (int i =0;i< orderItems.Count;i++)
            {
                OrderItem orderItem = new OrderItem() { ItemSizeId = orderItems[i].ItemSizeId, MenuItemId = orderItems[i].MenuItemId, OrderId = order.Id, Quantity = orderItems[i].Quantity };
                repo.DbContext.OrderItem.Add(orderItem);

                repo.DbContext.SaveChanges();
                foreach (var orderItemAddon in orderItems[i].OrderItemAddon)
                {
                    repo.DbContext.OrderItemAddon.Add(new OrderItemAddon() {AddonId = orderItemAddon.AddonId, OrderItemId= orderItem.Id , ItemSizeId = orderItemAddon.ItemSizeId}); 
                }
                repo.DbContext.SaveChanges();

            }



        }

        public void Delete(Order order)
        {
            IQueryable<OrderItem> orderItems =  repo.DbContext.OrderItem.Include("OrderItemAddon").Where(oi => oi.OrderId == order.Id);

            foreach (var orderItem in orderItems)
            {

                foreach (var orderItemAddon in orderItem.OrderItemAddon)
                {
                    repo.DbContext.OrderItemAddon.Remove(orderItemAddon);

                }
                
                repo.DbContext.OrderItem.Remove(orderItem);

            }
            repo.Delete(order);
            repo.Save();

        }

        public void Edit(Order order)
        {
            repo.Edit(order);

            foreach (var orderItem in order.OrderItem)
            {
                 repo.DbContext.Entry(orderItem).State =(orderItem.Id ==0)? EntityState.Added: EntityState.Modified;
                foreach (var orderItemAddon in orderItem.OrderItemAddon)
                {
                    repo.DbContext.Entry(orderItemAddon).State = (orderItemAddon.Id == 0) ? EntityState.Added : EntityState.Modified;
                }

            }

            repo.Save();
        }
    }
}
