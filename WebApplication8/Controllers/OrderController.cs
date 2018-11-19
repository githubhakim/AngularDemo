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



    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        OrderMgr _orderMgr = new OrderMgr();
        
        public OrderController()
        {
           
        }

        [HttpGet("[action]/{fromDate}/{toDate}")]
        public List<MostOrderedItems> GetMostOrderedItems( [FromRoute] DateTime fromDate , [FromRoute] DateTime toDate)
        {

            return _orderMgr.GetMostOrderedItems(fromDate, toDate);
        }
        


        [HttpGet("[action]/{withOrderItems}")]
        public List<Order> GetAll(bool withOrderItems)
        {
            List<Order> results = new List<Order>();

            results= _orderMgr.GetAll(withOrderItems);

            return results;
        }


        [HttpGet("[action]/{id}/{withOrderItems}")]
        public Order Get( int id, bool withOrderItems)
        {
            return _orderMgr.Get(id, withOrderItems) ;
        }

        [HttpPost("[action]")]
        public void Add([FromBody] Order order)
        {
            _orderMgr.Add(order);
        }

        [HttpPost("[action]")]
        public void Edit([FromBody] Order order)
        {
            _orderMgr.Edit(order);
        }

        [HttpPost("[action]")]
        public void Delete([FromBody] Order order)
        {
            _orderMgr.Delete(order);
        }
    }
}