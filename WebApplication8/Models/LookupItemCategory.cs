using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace MyKitchen.Web.Models
{
    public partial class LookupItemCategory
    {
        public LookupItemCategory()
        {
            MenuItem = new HashSet<MenuItem>();
        }

        public byte Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public ICollection<MenuItem> MenuItem { get; set; }
    }
}
