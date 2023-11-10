using System;
namespace ExampleAPI.Models
/*- items: List <Product>
- user: Customer
- orderDate: LocalDate
- orderId: int
*/
{
    public class Order
	{
		public int orderId { get; set; }
        public List<Product> Items { get; set; }
		public User customer { get; set; }
		public DateTime orderDate { get; set; }

        public Order(int orderId, List<Product> items, User customer, DateTime orderDate)
        {
            this.orderId = orderId;
            Items = items;
            this.customer = customer;
            this.orderDate = orderDate;
        }
    }
	}

