using System;
namespace ExampleAPI.Models
/*- categoryName:String
- categoryItems:List<Product>
 */
{
    public class Category
	{
        public int categoryId { get; set; }
        public string categoryName { get; set; }
		public List<Product> categoryItems { get; set; }

        public Category(int categoryId, string categoryName, List<Product> categoryItems)
        {
            this.categoryId = categoryId;
            this.categoryName = categoryName;
            this.categoryItems = categoryItems;
        }
    }



}

