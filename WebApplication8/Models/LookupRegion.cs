using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace MyKitchen.Web.Models
{
    public partial class LookupRegion
    {
        public LookupRegion()
        {
            Customer = new HashSet<Customer>();
        }

        public byte Id { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public ICollection<Customer> Customer { get; set; }
    }
}
