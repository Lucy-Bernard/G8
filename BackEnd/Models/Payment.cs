namespace ExampleAPI.Models
{


    public class Payment
    {
        public int paymentId { get; set; }
        public int billingAddressId { get; set; }
        public string cardNumber { get; set; }
        public string expirationMonth { get; set; }
        public string expirationYear { get; set; }
        public string cvv { get; set; }

    
    public Payment(string cardNumber,string expirationMonth,string expirationYear, string cvv){
        this.paymentId = paymentId;
        this.billingAddressId = billingAddressId;
        this.cardNumber = cardNumber;
        this.expirationMonth = expirationMonth;
        this.expirationYear = expirationYear;
        this.cvv = cvv;
    }


    
    }

}