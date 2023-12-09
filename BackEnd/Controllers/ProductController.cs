/**
 * ProductController Class
 * 
 * This controller class handles HTTP requests related to products in the ExampleAPI.
 * It interacts with a local SQL Server database using stored procedures to perform CRUD operations.
 * The class is annotated with attributes to define its routing and behavior as an API controller.
 **/

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

        /*
         * GET method to retrieve all products
         * 
         * Responds to HTTP GET requests at the route "api/product".
         * Fetches all products from the local database using the "GetProduct" stored procedure.
         * Returns a list of products in the response.
         */
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

        /*
         * GET method to retrieve a product by ID
         * 
         * Responds to HTTP GET requests at the route "api/product/{id}".
         * Fetches a specific product from the local database using the "GetProductById" stored procedure.
         * Returns the product in the response if found; otherwise, returns a 404 Not Found status.
         */
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                using (SqlConnection connection = new(configuration.GetConnectionString("local_database")))
                {
                    SqlCommand command = new("GetProductById", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    command.Parameters.AddWithValue("@ProductId", id);

                    connection.Open();

                    using SqlDataReader reader = command.ExecuteReader();

                    if (reader.Read())
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

                        return Ok(product);
                    }
                    else
                    {
                        return NotFound($"Product with id {id} not found");
                    }
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
    }
}