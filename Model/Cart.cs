using System;
namespace ExampleAPI.Models
/*- items: List<Product>
- quantity: int
- price: double
*/
{
    public class Cart
	{
		public int cartId { get; set; }
        public List<Product> Items { get; set; }
		public int quantity { get; set; }
		public double price { get; set; }

        public Cart(int cartId, List<Product> items, int quantity, double price)
        {
            this.cartId = cartId;
            Items = items;
            this.quantity = quantity;
            this.price = price;
        }
    }
}
