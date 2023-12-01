using System;
using NUnit.Framework;
//using ExampleAPI.Models;



namespace ExampleAPI
{
    [TestFixture]
    public class CreditCardTests
    {
        [Test]
        public void CreditCardNumber_ValidLength_ShouldPass()
        {
            // Arrange
        /*    var payment = new Payment(
                paymentId: 1,
                billingAddressId: 1,
                cardNumber: "1234567891234567",
                expirationMonth: "04",
                expirationYear: "32",
                cvv: "123"
            );

            // Assert
            Assert.True(payment.ValidatePayment()); */
        }

        [Test]
        public void CreditCardNumber_InvalidLength_ShouldFail()
        {
            // Arrange
        /*    var payment = new Payment(
                paymentId: 2,
                billingAddressId: 2,
                cardNumber: "12345678",
                expirationMonth: "04",
                expirationYear: "32",
                cvv: "123"
            );

            // Assert
            Assert.False(payment.ValidatePayment()); */
        }

        [Test]
        public void CreditCardNumber_InvalidLength_ShouldFail_2()
        {
            // Arrange
       /*     var payment = new Payment(
                paymentId: 3,
                billingAddressId: 3,
                cardNumber: "12345678999990077655",
                expirationMonth: "08",
                expirationYear: "27",
                cvv: "128"
            );

            // Assert
            Assert.False(payment.ValidatePayment());  */
        }

        [Test]
        public void CreditCardNumber_ValidCharacter_ShouldPass()
        {
            // Arrange
         /*   var payment = new Payment(
                paymentId: 4,
                billingAddressId: 4,
                cardNumber: "1234567891234567",
                expirationMonth: "08",
                expirationYear: "25",
                cvv: "453"
            );

            // Assert
            Assert.True(payment.ValidatePayment()); */
        }

        [Test]
        public void CreditCardNumber_InvalidCharacter_ShouldFail()
        {
            // Arrange
        /*    var payment = new Payment(
                paymentId: 5,
                billingAddressId: 5,
                cardNumber: "12345678912345AA",
                expirationMonth: "08",
                expirationYear: "25",
                cvv: "453"
            );

            // Assert
            Assert.False(payment.ValidatePayment());*/
        }
    }
}
