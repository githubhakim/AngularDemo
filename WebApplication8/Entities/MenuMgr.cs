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
    public class MenuMgr
    {
        Repo<MyKitchenContext, MenuItem> repo = new Repo<MyKitchenContext, MenuItem>();


        public List<MenuItem> GetAll(bool withDetails)
        {
            List<MenuItem> result = null;

            if (withDetails)
                result = repo.DbContext.MenuItem.Include("MenuItemAddon").Include("Category").Include("MenuItemAddon.Addon").ToList();

            else
                result = repo.GetAll().ToList();

            return result;
        }


        public MenuItem Get(int id, bool? withDetails)
        {
            MenuItem result = null;
            if (withDetails  != null && withDetails == true)
            {
                result = repo.Find(o => o.Id == id).Include("MenuItemAddon").Include("Category").Include("MenuItemAddon.Addon").FirstOrDefault();

            }
            else
                result = repo.Find(o => o.Id == id).FirstOrDefault();

            return result;
        }
    }
}
