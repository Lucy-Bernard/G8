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
        public string ImageLink { get; set; }

        public Product(int productId, int categoryId, string productName, decimal unitPrice, string manufacturer, string description, decimal rating, string sku, string imageLink)
        {   
            ProductId = productId;
            CategoryId = categoryId;
            ProductName = productName;
            UnitPrice = unitPrice;
            Manufacturer = manufacturer;
            Description = description;
            Rating = rating;
            SKU = sku;
            ImageLink = imageLink;
        }
    }
}