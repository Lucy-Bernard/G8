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
            // adds parameters to the SQL command , parameters (loginUser objects) are set to the username 
            //and pw that the user provides via input
            command.Parameters.Add(new SqlParameter("@Email", loginUser.Email));
            command.Parameters.Add(new SqlParameter("@Password_", loginUser.Password_)); 

            connection.Open();
            //executes the stored procedure command
            using SqlDataReader reader = command.ExecuteReader();   
            // if the execute command returns a row, then the username and pw exist, so user is
            // authenticated
            if (reader.HasRows)
            {  
                
                return Ok(new { message = "Login successful." });
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