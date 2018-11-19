using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyKitchen.Web.Models;

using MyKitcket.BLL.Entities;
namespace MyKitchen.Web.Controllers
{
    class DescendedDateComparer : IComparer<DateTime>
    {
        public int Compare(DateTime x, DateTime y)
        {
            // use the default comparer to do the original comparison for datetimes
            int ascendingResult = Comparer<DateTime>.Default.Compare(x, y);

            // turn the result around
            return 0 - ascendingResult;
        }
    }


    [Route("api/[controller]")]
    [ApiController]
    public class LookupController : ControllerBase 
    {

        LookupMgr _menuMgr = new LookupMgr();
        
        // adding some comments 

        [HttpGet("[action]/{lookupName}")]
        public List<DtoLookup> GetAll(string lookupName)
        {
            List<DtoLookup> results = new List<DtoLookup>();
            SortedSet<DateTime> sett = new SortedSet<DateTime>(new DescendedDateComparer());
            System.Threading.Thread.Sleep(3000);
            sett.OrderByDescending(item=> item);

            
            

            results= _menuMgr.GetAll(lookupName);

            return results;
        }

        
    }
}