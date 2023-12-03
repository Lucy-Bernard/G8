using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using ExampleAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ExampleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public CartController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet]
        public ObjectResult Get()
        {
            return Ok("test");
        }

        [HttpGet("{userId}")]
        public ActionResult<List<CartItem>> GetCartItemsForUser(int userId)
        {
            List<CartItem> cartItems = new List<CartItem>();

            try
            {
                using (SqlConnection connection = new SqlConnection(configuration.GetConnectionString("local_database")))
                {
                    SqlCommand command = new SqlCommand("GetCartItemsForUser", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };
                    command.Parameters.AddWithValue("@UserId", userId);

                    connection.Open();

                    using SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        CartItem cartItem = new CartItem(
                            reader.GetInt32(0),   // CartItemId
                            reader.GetInt32(1),   // ProductId
                            reader.GetInt32(2),   // Quantity
                            reader.GetString(3),  // ProductName
                            reader.GetDecimal(4), // UnitPrice
                            reader.GetString(5),  // Manufacturer
                            reader.GetString(6),  // Description
                            reader.GetDecimal(7), // Rating
                            reader.GetString(8),  // Sku
                            reader.GetString(9)   // ImageLink
                                                  // Assuming these are the correct order and types of columns returned by your stored procedure
                        );
                        cartItems.Add(cartItem);
                    }
                }

                return Ok(cartItems);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }


        [HttpPost]
        public ActionResult Post([FromBody] CartItem cartItem)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(configuration.GetConnectionString("local_database")))
                {
                    SqlCommand command = new SqlCommand("AddProductToCart", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    command.Parameters.AddWithValue("@UserId", cartItem.UserId);
                    command.Parameters.AddWithValue("@ProductId", cartItem.ProductId);

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



        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{cartItemId}")]
        public ActionResult Delete(int cartItemId)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(configuration.GetConnectionString("local_database")))
                {
                    SqlCommand command = new SqlCommand("RemoveProductFromCart", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    command.Parameters.AddWithValue("@cartItemId", cartItemId);

                    connection.Open();
                    command.ExecuteNonQuery();

                    return Ok("Product deleted from cart successfully");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex.Message);
            }
        }
    }
}