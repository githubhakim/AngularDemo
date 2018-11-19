using System;
using System.Collections.Generic;

namespace MyKitchen.Web.Models
{
 

    public struct MostActiveUser
    {
        public string UserName { get; set; }
        public int Rank { get; set; }
    }

    public struct MostOrderedItems
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int OrderedNumber { get; set; }
    }
}
