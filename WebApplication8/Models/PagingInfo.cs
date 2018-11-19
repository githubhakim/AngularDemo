using System;
using System.Collections.Generic;

namespace MyKitchen.Web.Models
{
    public partial class PagingInfo
    {
        
        public int ItemsPerPage { get; set; }
        public int TotalRecords { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages
        {
            get
            {
                if (this.ItemsPerPage != 0)
                 return  Convert.ToInt32(Math.Ceiling(Convert.ToDecimal(this.TotalRecords / this.ItemsPerPage)));
                else
                return 0;
            }
        }

        public object[] PageData { get; set; }

        
    }
}
