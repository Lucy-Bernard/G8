using System;
namespace ExampleAPI.Models
/*- firstName:String
- lastName:String 
- email:String
- password:String
- phoneNumber:int
- shippingAddress Address
- paymentInfo:Payment
*/


{
    public class User
	{
        public int userId { get; set; }
        public string firstname { get; set; }
		public string lastname { get; set; }
		public string email { get; set; }
		public string password { get; set; }
		public int phoneNumber { get; set; }
		public Address shippingAddress { get; set; }
		public Payment paymentinfo { get; set; }

        public User(int userId, string firstname, string lastname, string email, string password,
            int phoneNumber, Address shippingAddress, Payment paymentinfo)
        {
            this.userId = userId;
            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
            this.password = password;
            this.phoneNumber = phoneNumber;
            this.shippingAddress = shippingAddress;
            this.paymentinfo = paymentinfo;
        }
    }
	}


