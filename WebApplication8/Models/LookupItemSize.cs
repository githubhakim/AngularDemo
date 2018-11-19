using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace MyKitchen.Web.Models
{
    public partial class LookupItemSize
    {
        public LookupItemSize()
        {
            OrderItem = new HashSet<OrderItem>();
            OrderItemAddon = new HashSet<OrderItemAddon>();
        }

        public byte Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public ICollection<OrderItem> OrderItem { get; set; }
        [JsonIgnore]
        public ICollection<OrderItemAddon> OrderItemAddon { get; set; }
    }
}
