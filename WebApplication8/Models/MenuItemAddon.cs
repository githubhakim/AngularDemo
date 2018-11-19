using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace MyKitchen.Web.Models
{
    public partial class MenuItemAddon
    {
        public int Id { get; set; }
        public byte AddonId { get; set; }
        public int MenuItemId { get; set; }

        public LookupAddon Addon { get; set; }

        [JsonIgnore]
        public MenuItem MenuItem { get; set; }
    }
}
