/*
 * CartController Class
 * 
 * This controller class handles HTTP requests related to shopping cart operations in the ExampleAPI.
 * It interacts with a local SQL Server database using stored procedures to perform CRUD operations.
 * The class is annotated with attributes to define its routing and behavior as an API controller.
 */

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

        /*
         * GET method to retrieve cart items for a specific user
         * 
         * Responds to HTTP GET requests at the route "api/cart/{userId}".
         * Fetches cart items for a specific user from the local database using the "GetCartItemsForUser" stored procedure.
         * Returns a list of cart items in the response.
         */
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

        /*
         * POST method to add a product to the cart
         * 
         * Responds to HTTP POST requests at the route "api/cart".
         * Adds a product to the cart for a specific user using the "AddProductToCart" stored procedure.
         * Returns a success message in the response if the operation is successful.
         */
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

        /*
         * PUT method to update the quantity of a cart item
         * 
         * Responds to HTTP PUT requests at the route "api/cart/{cartItemId}/{quantity}".
         * Updates the quantity of a cart item using the "UpdateCartItemQuantity" stored procedure.
         * Returns a success message in the response if the operation is successful.
         */
        [HttpPut("{cartItemId}/{quantity}")]
        public ActionResult Put(int cartItemId, int quantity)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(configuration.GetConnectionString("local_database")))
                {
                    SqlCommand command = new SqlCommand("UpdateCartItemQuantity", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    command.Parameters.AddWithValue("@CartItemId", cartItemId);
                    command.Parameters.AddWithValue("@NewQuantity", quantity);

                    connection.Open();
                    command.ExecuteNonQuery();

                    return Ok("Quantity changed.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex.Message);
            }
        }

        /*
         * DELETE method to remove a product from the cart
         * 
         * Responds to HTTP DELETE requests at the route "api/cart/{cartItemId}".
         * Removes a product from the cart using the "RemoveProductFromCart" stored procedure.
         * Returns a success message in the response if the operation is successful.
         */
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
