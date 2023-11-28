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


        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
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

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}