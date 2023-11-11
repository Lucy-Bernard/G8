namespace ExampleAPI.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal UnitPrice { get; set; }

        public Product(int ProductId, string ProductName, decimal UnitPrice)
        {
            this.ProductId = ProductId;
            this.ProductName = ProductName;
            this.UnitPrice = UnitPrice;
        }
    }
}