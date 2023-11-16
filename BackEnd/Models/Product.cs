namespace ExampleAPI.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public int CategoryId { get; set; }
        public string ProductName { get; set; }
        public decimal UnitPrice { get; set; }
        public string Manufacturer { get; set; }
        public string Description { get; set; }
        public decimal Rating { get; set; }
        public string SKU { get; set; }


        public Product(int ProductId, int CategoryId, string ProductName, decimal UnitPrice, string Manufacturer, string Description, decimal Rating, string SKU)
        {   
            this.ProductId = ProductId;
            this.CategoryId = CategoryId;
            this.ProductName = ProductName;
            this.UnitPrice = UnitPrice;
            this.Manufacturer = Manufacturer;
            this.Description = Description;
            this.Rating = Rating;
            this.SKU = SKU;
        }
    }
}