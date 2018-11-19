using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace MyKitchen.Web.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderItem = new HashSet<OrderItem>();
        }

        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Comments { get; set; }
        public DateTime TimeStamp { get; set; }

        [JsonIgnore]
        public Customer Customer { get; set; }
        public ICollection<OrderItem> OrderItem { get; set; }
    }
}
