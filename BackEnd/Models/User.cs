/*
 * Represents a user entity with properties for identification and access
 */
namespace ExampleAPI.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password_ { get; set; }

        public int AddressId { get; set; }

        public User()
        {
        }

        public User(int UserId, int AddressId, string FirstName, string LastName, string Email, string Password_)
        {
            this.UserId = UserId;
            this.AddressId = AddressId;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Password_ = Password_;
            this.Email = Email;
        }

        public User(int UserId, string Email, string password_)
        {
            this.UserId = UserId;
            this.Email = Email;
            this.Password_ = password_;
        }

        /*Constructor for authentication purposes*/
        public User(string Email, string password_)
        {
            this.Email = Email;
            this.Password_ = password_;
        }
    }
}