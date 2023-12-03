namespace ExampleAPI.Models
{
    public class CartItem
    {
        public int CartItemId { get; set; }
        public int ProductId { get; set; }
        public int CategoryId { get; set; }
        public string? ProductName { get; set; }
        public decimal UnitPrice { get; set; }
        public string? Manufacturer { get; set; }
        public string? Description { get; set; }
        public decimal Rating { get; set; }
        public string? Sku { get; set; }
        public string? ImageLink { get; set; }
        public int Quantity { get; set; }
        public int UserId { get; set; }
        
        public CartItem(int UserId, int ProductId) {
            this.UserId = UserId;
            this.ProductId = ProductId;
        }

        public CartItem(int CartItemId, int ProductId, int Quantity, string ProductName, decimal UnitPrice, string Manufacturer, string Description, decimal Rating, string Sku, string ImageLink)
        {
            this.CartItemId = CartItemId;
            this.ProductId = ProductId;
            this.Quantity = Quantity;
            this.ProductName = ProductName;
            this.UnitPrice = UnitPrice;
            this.Manufacturer = Manufacturer;
            this.Description = Description;
            this.Rating = Rating;
            this.Sku = Sku;
            this.ImageLink = ImageLink;
        }

        public CartItem() {}

    }
}