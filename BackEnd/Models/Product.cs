/*
 * Product Model
 * 
 * This class represents a product with various properties such as ProductId, CategoryId, etc.
 * 
 */

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

        // Constructor to initialize the properties of the product
        public Product(int productId, int categoryId, string productName, decimal unitPrice, string manufacturer, string description, decimal rating, string sku, string imageLink)
        {   
            this.ProductId = productId;
            this.CategoryId = categoryId;
            this.ProductName = productName;
            this.UnitPrice = unitPrice;
            this.Manufacturer = manufacturer;
            this.Description = description;
            this.Rating = rating;
            this.SKU = sku;
            this.ImageLink = imageLink;
        }
    }
}