using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using ExampleAPI.Models;

namespace ExampleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public UserController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpPost]
        public ActionResult Login([FromBody] User loginUser)
        {
            // logic to authenticate the user using the provided username  nd password.
            // check provided credentials against the stored credentials

            try
            {
                using (SqlConnection connection = new SqlConnection(configuration.GetConnectionString("local_database")))
                {
                    // stored procedure
                    SqlCommand command = new SqlCommand("AuthenticateUser", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };
                    // parses out the json formatted email and pw that the user provided and seperates them into
                    // two seperate parameters for the stored procedure that takes in @Email and @Password
                    command.Parameters.Add(new SqlParameter("@Email", loginUser.Email));
                    command.Parameters.Add(new SqlParameter("@Password_", loginUser.Password_));

                    connection.Open();
                    //executes the stored procedure command
                    using SqlDataReader reader = command.ExecuteReader();
                    // if the execute command returns a row, then the username and pw exist, so user is
                    // authenticated
                    if (reader.HasRows)
                    {   
                        reader.Read();
                        return Ok(new User(reader.GetInt32(0), reader.GetString(1), reader.GetString(2)));
                    }
                    else
                    {
                        // auth failed
                        return Unauthorized(new { message = "Login failed." });
                    }
                }

            }
            catch (Exception exception)
            {
                // handle any exceptions that occur during the login process
                return BadRequest(exception);
            }
        }
    }
}