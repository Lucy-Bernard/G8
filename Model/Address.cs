using System;
namespace ExampleAPI.Models
/*- street:String
- city:String 
- state:String
- zip:int
- country:String 
 */
{
    public class Address
	{
		public int AddressId { get; set; }
        public string street { get; set; }
		public string city { get; set; }
		public int zipCode { get; set; }
		public string country { get; set; }

        public Address(int addressId, string street, string city, int zipCode, string country)
        {
            AddressId = addressId;
            this.street = street;
            this.city = city;
            this.zipCode = zipCode;
            this.country = country;
        }
    }
	}
