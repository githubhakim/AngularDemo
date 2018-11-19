using System;
using System.Collections.Generic;

namespace MyKitchen.Web.Models
{
    public partial class MenuItem
    {
        public MenuItem()
        {
            MenuItemAddon = new HashSet<MenuItemAddon>();
            OrderItem = new HashSet<OrderItem>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public byte CategoryId { get; set; }
        public string IconPath { get; set; }

        public LookupItemCategory Category { get; set; }
        public ICollection<MenuItemAddon> MenuItemAddon { get; set; }
        public ICollection<OrderItem> OrderItem { get; set; }
    }
}
