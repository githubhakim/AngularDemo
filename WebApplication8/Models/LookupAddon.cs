using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace MyKitchen.Web.Models
{
    public partial class LookupAddon
    {
        public LookupAddon()
        {
            MenuItemAddon = new HashSet<MenuItemAddon>();
            OrderItemAddon = new HashSet<OrderItemAddon>();
        }

        public byte Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public ICollection<MenuItemAddon> MenuItemAddon { get; set; }

        [JsonIgnore]
        public ICollection<OrderItemAddon> OrderItemAddon { get; set; }
    }
}
