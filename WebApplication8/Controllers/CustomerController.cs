using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyKitchen.Web.Models;
using MyKitcket.BLL.Entities;
using System.Threading;
using Microsoft.AspNetCore.Cors;

namespace MyKitchen.Web.Controllers
{



    [Route("api/[controller]")]
    [ApiController]
//    [EnableCors("*")]
    public class CustomerController : ControllerBase
    {

        CustomerMgr _customerMgr = new CustomerMgr();
        
        public CustomerController()
        {
           
        }

        [HttpGet("[action]")]
        public List<MostActiveUser> GetMostActiveCustomer()
        {

            return _customerMgr.GetMostActiveUsers();
        }

        [HttpGet("[action]")]
        public List<MostActiveUser> GetMostActiveByDate()
        {
            return _customerMgr.GetMostActiveUsersByDate();
        }

        [HttpGet("GetUserOrders/{customerId}")]
        public List<Order> GetUserOrders([FromRoute] int customerId )
        {
            return _customerMgr.GetUserOrders(customerId);
        }


        [HttpGet("[action]")]
        public List<Customer> GetAll()
        {
            return _customerMgr.GetAll();
        }

        [HttpGet("[action]/{pageNumber}")]
        public List<Customer> GetPage(int pageNumber)
        {
            
            return _customerMgr.GetAll();
        }

        [HttpGet("[action]/{id}")]
        public Customer Get( int id)
        {

            
            
            return _customerMgr.Get(id) ;
        }

        [HttpGet("[action]/{searchPhrase}")]
        public Customer[] Find(string searchPhrase)
        {
            return _customerMgr.Find(searchPhrase);
        }

        [HttpPost("[action]")]
        public void Add([FromBody] Customer customer)
        {
            _customerMgr.Add(customer);
        }

        [HttpGet("[action]/{email}")]
        public bool EmailExists( string email)
        {
            System.Threading.Thread.Sleep(3000);

            return _customerMgr.CheckEmail(email);
        }

        [HttpPost("[action]")]
        public void Edit([FromBody] Customer customer)
        {
            
            
            
            _customerMgr.Edit(customer);
        }

        [HttpPost("[action]")]
        public void Delete([FromBody] Customer customer)
        {
            _customerMgr.Delete(customer);
        }
    }
}