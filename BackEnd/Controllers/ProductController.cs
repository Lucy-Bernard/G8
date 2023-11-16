using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using ExampleAPI.Models;

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
                    SqlCommand command = new ("GetProducts", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    connection.Open();

                    using SqlDataReader reader = command.ExecuteReader();
                    
                    while (reader.Read())
                    {
                        Product product = new(reader.GetInt32(0), reader.GetInt32(0), reader.GetString(1), reader.GetDecimal(2), reader.GetString(1), reader.GetString(1), reader.GetDecimal(2), reader.GetString(1));
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