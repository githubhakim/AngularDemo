using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace MyKitchen.Web.Models
{
    public partial class OrderItem
    {
        public OrderItem()
        {
            OrderItemAddon = new HashSet<OrderItemAddon>();
        }

        public int Id { get; set; }
        public int MenuItemId { get; set; }
        public int OrderId { get; set; }
        public short? Quantity { get; set; }
        public byte ItemSizeId { get; set; }

        public LookupItemSize ItemSize { get; set; }
        public MenuItem MenuItem { get; set; }

        [JsonIgnore]
        public Order Order { get; set; }
        public ICollection<OrderItemAddon> OrderItemAddon { get; set; }
    }
}
