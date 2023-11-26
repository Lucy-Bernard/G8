using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using ExampleAPI.Models;

namespace ExampleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CartController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("add")]
        public IActionResult AddToCart([FromBody] CartItemRequest cartItemRequest)
        {
            try
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("local_database")))
                {
                    var command = new SqlCommand("AddProductToCart", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };
                    command.Parameters.AddWithValue("@UserId", userId);
                    command.Parameters.AddWithValue("@ProductId", productId);

                    connection.Open();
                    command.ExecuteNonQuery();

                    return Ok("Product added to cart successfully");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex.Message);
            }
        }

        // Other methods...
    }
}
