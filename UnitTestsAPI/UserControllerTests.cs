using NUnit.Framework;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ExampleAPI.Controllers;
using ExampleAPI.Models;

namespace ExampleAPI.UnitTests.Controllers
{
    [TestFixture]
    public class UserControllerTests 
    {
        private UserController _userController;
        private Mock<IUserService> _userServiceMock;
        private Mock<IConfigurationWrapper> _configurationWrapperMock;

        [SetUp]
        public void SetUp()
        {
            // Mock IConfigurationWrapper
            _configurationWrapperMock = new Mock<IConfigurationWrapper>();
            _configurationWrapperMock.Setup(config => config.GetConnectionString("local_database"))
                                     .Returns("Server=localhost,1433;Database=OnlineStore;User Id=sa;Password=P@ssw0rd;");

            // Mock IUserService
            _userServiceMock = new Mock<IUserService>();

            // Initialize UserController with the mocked configuration and user service
            _userController = new UserController(_configurationWrapperMock.Object);
        }

        [Test]
        public void Login_WithValidCredentials_ReturnsOk()
        {
            // Arrange
            var loginUser = new User { Email = "johndoe217@email.com'", Password_ = "P@ssw0rd143" };
            _userServiceMock.Setup(service => service.AuthenticateUser(loginUser.Email, loginUser.Password_)).Returns(true);

            // Act
            var result = _userController.Login(loginUser);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public void Login_WithInvalidCredentials_ReturnsUnauthorized()
        {
            // Arrange
            var loginUser = new User { Email = "test@example.com", Password_ = "wrong_password" };
            _userServiceMock.Setup(service => service.AuthenticateUser(loginUser.Email, loginUser.Password_)).Returns(false);

            // Act
            var result = _userController.Login(loginUser);

            // Assert
            Assert.IsInstanceOf<UnauthorizedObjectResult>(result);
        }
    }
}
