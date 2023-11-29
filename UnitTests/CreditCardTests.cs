namespace unit_tests_final361;

public class CreditCardTests

{
    //imported this will update when we actually have the functions to test
 [Fact]
        public void CreditCardNumber_ValidLength_ShouldPass()
        {
            // Arrange
            var creditCard = new CreditCard(); // Replace with the actual class representing a credit card

            // Act //SetCreditCardNumber this function may be called something different
            creditCard.SetCreditCardNumber("1234567890123456"); // Replace with a valid credit card number

            // Assert //IsValidCreditCardNumber this function might be called something different
            Assert.True(creditCard.validatePayment());
        }

        [Fact]
        public void CreditCardNumber_InvalidLength_ShouldFail()
        {
            // Arrange
            var creditCard = new CreditCard();

            // Act
            creditCard.SetCreditCardNumber("12345"); // Replace with an invalid credit card number

            // Assert
            Assert.False(creditCard.validatePayment());
        }

        // Add more test cases as needed for other credit card fields
    }
}
