using System;
using System.Collections.Generic;

namespace MyKitchen.Web.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Order = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDate { get; set; }
        public int? AddressNumber { get; set; }
        public byte? RegionId { get; set; }
        public string PostalCode { get; set; }

        public LookupRegion Region { get; set; }
        public ICollection<Order> Order { get; set; }
    }
}
