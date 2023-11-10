using System;
namespace ExampleAPI.Models
/*
 not sure what field we want expiration date to be
*/
{
    public class Payment
	{
		public int paymentId { get; set; }
		public int cardNumber { get; set; }
		public string expirationDate { get; set;}
		public int cvvNumber { get; set; }
		public Address billingAddress { get; set; }

        public Payment(int paymentId, int cardNumber, string expirationDate, int cvvNumber, Address billingAddress)
        {
            this.paymentId = paymentId;
            this.cardNumber = cardNumber;
            this.expirationDate = expirationDate;
            this.cvvNumber = cvvNumber;
            this.billingAddress = billingAddress;
        }
    }
}

