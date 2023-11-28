namespace ExampleAPI.Models
{
    public class CartItem
    {
        public int CartItemId { get; set; }
        public int ProductId { get; set; }
        public int CategoryId { get; set; }
        public string? ProductName { get; set; }
        public double UnitPrice { get; set; }
        public string? Manufacturer { get; set; }
        public string? Description { get; set; }
        public double Rating { get; set; }
        public int Sku { get; set; }
        public string? ImageLink { get; set; }
        public int Quantity { get; set; }
        public int UserId { get; set; }
        
        public CartItem(int UserId, int ProductId) {
            this.UserId = UserId;
            this.ProductId = ProductId;
        }
    }
}
