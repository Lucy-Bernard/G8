using ExampleAPI.Models;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

public interface IUserService
{
    bool AuthenticateUser(string email, string password);
}

public class UserService : IUserService
{
    private readonly IConfiguration _configuration;

    public UserService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public bool AuthenticateUser(string email, string password)
    {
        try
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("local_database")))
            {
                using (var command = new SqlCommand("AuthenticateUser", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@Email", email));
                    command.Parameters.Add(new SqlParameter("@Password_", password));

                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        return reader.HasRows;
                    }
                }
            }
        }
        catch
        {
            // Handle exceptions (e.g., logging), but do not re-throw.
            // Return false or handle as per your error policy.
            return false;
        }
    }
}
