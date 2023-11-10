namespace ExampleAPI.Models

/*- productId:String
- productName:String 
- productImage:List<String>
- productPrice:float same as unitPrice
- productManufacturerInfo:String
- productDescription:String
- productDimension:String
- productWeight:float
- productRating:float
- productCategory:Category
- productSKU:String?

getProductPrice(): ReturnType
getProductDetail()
 */

{
    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal UnitPrice { get; set; }
        public string productManufacturerInfo { get; set; }
        public string productDescription { get; set; }
        public string productDimension { get; set; }
        public decimal productWeight { get; set; }
        public decimal productRating { get; set; }
        public Category productCategory { get; set; }

        public Product(int ProductId, string ProductName, decimal UnitPrice
            , string productManufacturerInfo, string productDescription,
            string productDimension, decimal productWeight, decimal productRating
           , Category productCategory)
        {
            this.ProductId = ProductId;
            this.ProductName = ProductName;
            this.UnitPrice = UnitPrice;
            this.productManufacturerInfo = productManufacturerInfo;
            this.productDescription = productDescription;
            this.productDimension = productDimension;
            this.productWeight = productWeight;
            this.productRating = productRating;
            this.productCategory = productCategory;

        }
    }
}