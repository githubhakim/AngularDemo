using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace MyKitchen.Web.Models
{
    public partial class OrderItemAddon
    {
        public int Id { get; set; }
        public int OrderItemId { get; set; }
        public byte ItemSizeId { get; set; }
        public byte AddonId { get; set; }

        public LookupAddon Addon { get; set; }
        public LookupItemSize ItemSize { get; set; }

        [JsonIgnore]
        public OrderItem OrderItem { get; set; }
    }
}
