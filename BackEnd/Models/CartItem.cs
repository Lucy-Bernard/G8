namespace ExampleAPI.Models
{
    public class CartItem
    {
        public int CartItemId { get; set; }
        public int ProductId { get; set; }
        public int CategoryId { get; set; }
        public string ProductName { get; set; }
        public double UnitPrice { get; set; }
        public string Manufacturer { get; set; }
        public string Description { get; set; }
        public double Rating { get; set; }
        public int Sku { get; set; }
        public string ImageLink { get; set; }
        public int Quantity { get; set; }

        // Constructor initializing all properties
        public CartItem(int productId, int categoryId, string productName, double unitPrice, string manufacturer, string description, double rating, int sku, string imageLink)
        {
            ProductId = productId;
            CategoryId = categoryId;
            ProductName = productName;
            UnitPrice = unitPrice;
            Manufacturer = manufacturer;
            Description = description;
            Rating = rating;
            Sku = sku;
            ImageLink = imageLink;
        }

        // Constructor for properties related to the GetCartItemsForUser stored procedure
        public CartItem(int cartItemId, int productId, int quantity, string productName, double unitPrice, string manufacturer, string description, double rating, int sku, string imageLink)
        {
            CartItemId = cartItemId;
            ProductId = productId;
            Quantity = quantity;
            ProductName = productName;
            UnitPrice = unitPrice;
            Manufacturer = manufacturer;
            Description = description;
            Rating = rating;
            Sku = sku;
            ImageLink = imageLink;
        }
    }
}
