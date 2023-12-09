using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using ExampleAPI.Models;

namespace ExampleAPI.Controllers
{   /*
    Controller responsible for user-related actions.
    */
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public UserController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        /* Authenticates a user based on provided credentials. Returns a user object if authentication successful, 
        returns unauthorized result error if auth fails.
        */
        [HttpPost]
        public ActionResult Login([FromBody] User loginUser)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(configuration.GetConnectionString("local_database")))
                {    
                    SqlCommand command = new SqlCommand("AuthenticateUser", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };
                    command.Parameters.Add(new SqlParameter("@Email", loginUser.Email));
                    command.Parameters.Add(new SqlParameter("@Password_", loginUser.Password_));

                    connection.Open();
                    using SqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {   
                        reader.Read();
                        return Ok(new User(reader.GetInt32(0), reader.GetString(1), reader.GetString(2)));
                    }
                    else
                    {
                        return Unauthorized(new { message = "Login failed." });
                    }
                }

            }
            catch (Exception exception)
            {
                return BadRequest(exception);
            }
        }
    }
}