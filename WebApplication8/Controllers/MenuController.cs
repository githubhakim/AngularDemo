using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyKitchen.Web.Models;

using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc.Localization;
using MyKitcket.BLL.Entities;
namespace MyKitchen.Web.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {

        MenuMgr _menuMgr = new MenuMgr();
        
        //ddfdfd
        public MenuController()
        {
            
        }

           
        

        [HttpGet("[action]/{withDetails}")]
        public List<MenuItem> GetAll(bool withDetails)
        {
            List<MenuItem> results = new List<MenuItem>();

            results= _menuMgr.GetAll(withDetails);

            
            return results;
        }


        [HttpGet("[action]/{id}/{withDetails:bool}")]
        [HttpGet("{id}/{withDetails:bool}")]
        public MenuItem Get( int id, bool? withDetails)
        {
            return _menuMgr.Get(id, withDetails) ;
        }

     
    }
}