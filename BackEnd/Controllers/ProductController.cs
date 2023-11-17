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
    public class ProductController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public ProductController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet]
        public ObjectResult Get()
        {
            List<Product> products = new();

            try
            {
                using (SqlConnection connection = new(configuration.GetConnectionString("local_database")))
                {
                    SqlCommand command = new ("GetProduct", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    connection.Open();

                    using SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Product product = new Product(
                            reader.GetInt32(0), 
                            reader.GetInt32(1), 
                            reader.GetString(2), 
                            reader.GetDecimal(3), 
                            reader.GetString(4), 
                            reader.GetString(5), 
                            reader.GetDecimal(6), 
                            reader.GetString(7),
                            reader.GetString(8));
                        products.Add(product);
                    }
                }

                return Ok(products);
            }
            catch (Exception exception)
            {
                return BadRequest(exception);
            }
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public void Post([FromBody] string value)
        {
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