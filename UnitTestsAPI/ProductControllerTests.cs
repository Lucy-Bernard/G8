using ExampleAPI.Controllers;
using ExampleAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;

namespace ExampleAPI.Tests
{
  [TestFixture]
  public class ProductControllerTests
  {
    private List<Product> GenerateTestProducts()
    {
      return new List<Product>
      {
        new Product (1, 2, "Homme Graphic Jogger", 21.00m, "manufacturer 1", "description 1", 4.6m, "123456","Homme Graphic Jogger.jpeg"),
        new Product (2, 1, "Corduroy Patchwork Long Sleeve Shirts", 26.00m, "manufacturer 3", "description 3", 4.5m, "234234", "Corduroy Patchwork Long Sleeve Shirts.webp"),
        new Product (3, 4, "Men's Nike Air Max 90 Casual Shoes", 130.00m, "manufacturer 8", "description 8", 4.8m, "234245", "Mens Nike Air Max 90 Casual Shoes.jpeg"),
        new Product (4, 3, "Women's Grey Full Zip Jacket", 60.00m, "manufacturer 9", "description 9", 4.5m, "234225", "Womens Grey Full Zip Jacket.jpg"),
        new Product (5, 1, "Half Button Drop Shoulder Tee", 13.99m, "manufacturer DI", "description 124", 4.9m, "129389", "shoulder-tee.png"),
        new Product (6, 1, "Long Sleeve Knit Top", 46.00m, "manufacturer 39", "description 23", 4.8m, "123987", "longsleeve-knittop.png"),
        new Product (7, 1, "Ribbed Front Cutout Knitwear", 26.00m, "manufacturer 32", "description 13", 3.8m, "283729", "cutout-knitwear.png"),
        new Product (8, 4, "Platform HighHeeled Ankle Boots", 46.29m, "manu 3", "description 98", 4.7m, "109389", "boots.png"),
        new Product (9, 4, "Comat Boots", 29.23m, "manufacturer 4", "description 293", 4.9m, "198222", "combat-boots.png"),
        new Product (10, 4, "Brown Preppy Style Color Block Sneakers", 22.80m, "manufacturer 32", "description 17", 4.9m, "120274", "block-sneakers.png"),
        new Product (11, 4, "Jumpman MPV Shoes", 165.00m, "manufacturer Jordan", "description 23", 5.0m, "", "jordans.png"),
        new Product (12, 3, "Car Coat", 418.00m, "manufacturer 2", "description28", 4.9m, "129811", "car-cote.jpeg"),
        new Product (13, 3, "Harris Jacket", 168.00m, "manufacturer 23", "description 37", 4.1m, "293819", "harris-jacket.png"),
        new Product (14, 3, "Raincoat Hoodie Jacket", 35.99m, "manufacturer 12", "description 29", 3.9m, "120654", "raincoat-hoodie.png"),
        new Product (15, 3, "Hooded Puffer Jacket", 147.00m, "manufacturer 12", "description 14", 4.9m, "127654", "hooded-puffer-jacket.png"),
        new Product (16, 3, "Tailored Long Coat", 120m, "manufacturer 25", "description 16", 4.9m, "2765782", "tailored-long.png"),
        new Product (17, 3, "Puffer Jacket", 185.00m, "manufacturer 25", "description 17", 4.5m, "", "puffer-jacket.png"),
        new Product (18, 3, "Brown Fleece Hoodie", 39.00m, "manufacturer 24", "description 18", 4.1m, "589263", "fleece-hoodie.png"),
        new Product (19, 2, "Multi Cargo Slim Fit Joggers", 42.45m, "manufacturer 2", "description 32", 4.2m, "328933", "cargo-pants.png"),
        new Product (20, 2, "HighWaste Straight Leg Denim Jeans", 40.23m, "manu 4", "description 13", 4.8m, "238941", "denim.jpg"),
        new Product (21, 2, "Womans Pinstripe Trousers", 19.99m, "manu 2", "description 232", 4.2m, "190472", "pin-stripe-trousers.png"),
        new Product (22, 2, "High Waisted Plicated Side Pocket Wide Leg Waffle Casual Pants", 29.95m, "manu 4", "description 21", 4.1m, "098901", "widelegwafflepants.png"),
        new Product (23, 1, "Crew Neck T-Shirt", 14.00m, "manufacturer 3", "description 42", 4.9m, "929999", "crew-neck.png"),
        new Product (24, 4, "Gladiator Point Toe Heels", 28.00m, "manufacturer 100", "description 32", 3.9m, "938729", "gold-heels.png"),
        new Product (25, 2, "Pleated Midi Skirt", 60.00m, "manufacturer 392", "description sendit", 4.8m, "120411", "pleated-midi-skirt.png")
      };
    }

    [Test]
    public void Get_ReturnsListOfProducts()
    {
      var configurationMock = new Mock<IConfiguration>();
      configurationMock.Setup(c => c.GetConnectionString("local_database")).Returns("Server=localhost,1433;Database=OnlineStore;User Id=sa;Password=P@ssw0rd;");
      var controller = new ProductController(configurationMock.Object);
      List<Product> expectedProducts = GenerateTestProducts();

      var result = controller.Get() as ObjectResult;

      // ensures that the controller returned a valid result
      Assert.NotNull(result, "The HTTP object should not be null.");
      // confirms the controller returned a successful response
      Assert.That(result.StatusCode, Is.EqualTo(200), "HTTP status code should be 200 (OK).");
      // asserts that the controller retrieved all products in the database
      CollectionAssert.AreEqual(expectedProducts, result.Value as List<Product>, "Products do not match the expected list.");
    }

    [Test]
    public void GetWithValidId_ReturnsProduct()
    {
      var configurationMock = new Mock<IConfiguration>();
      configurationMock.Setup(c => c.GetConnectionString("local_database")).Returns("Server=localhost,1433;Database=OnlineStore;User Id=sa;Password=P@ssw0rd;");
      var controller = new ProductController(configurationMock.Object);
      var validId = 1;
      Product expectedProduct = (GenerateTestProducts())[0];

      var result = controller.Get(validId) as ObjectResult;

      Assert.NotNull(result, "The HTTP object should not be null.");
      Assert.That(result.StatusCode, Is.EqualTo(200), "HTTP status code should be 200 (OK).");
      Assert.That(result.Value as Product, Is.EqualTo(expectedProduct), $"Product with ID {validId} does not match the expected product.");

    }

    [Test]
    public void GetWithInvalidId_ReturnsNotFound()
    {
      var configurationMock = new Mock<IConfiguration>();
      configurationMock.Setup(c => c.GetConnectionString("local_database")).Returns("Server=localhost,1433;Database=OnlineStore;User Id=sa;Password=P@ssw0rd;");
      var controller = new ProductController(configurationMock.Object);
      var invalidId = -1;

      var result = controller.Get(invalidId) as NotFoundObjectResult;

      Assert.NotNull(result);
      Assert.That(result.StatusCode,Is.EqualTo(404));
      Assert.That(result.Value, Is.EqualTo($"Product with id {invalidId} not found"));
    }

    [Test]
    public void Get_ThrowsException_ReturnsBadRequest()
    {
      var configurationMock = new Mock<IConfiguration>();
      configurationMock.Setup(c => c.GetConnectionString(It.IsAny<string>())).Throws<Exception>();
      var controller = new ProductController(configurationMock.Object);

      var result = controller.Get() as BadRequestObjectResult;

      Assert.NotNull(result);
      Assert.That(result.StatusCode,Is.EqualTo(400));
      Assert.IsInstanceOf<Exception>(result.Value);
    }

    [Test]
    public void GetWithValidId_ThrowsException_ReturnsBadRequest()
    {
      var configurationMock = new Mock<IConfiguration>();
      configurationMock.Setup(c => c.GetConnectionString(It.IsAny<string>())).Throws<Exception>();
      var controller = new ProductController(configurationMock.Object);

      var result = controller.Get(1) as BadRequestObjectResult;

      Assert.NotNull(result);
       Assert.That(result.StatusCode,Is.EqualTo(400));
      Assert.IsInstanceOf<Exception>(result.Value);
    }

    [Test]
    public void Get_DatabaseConnectionFailure_ReturnsError()
    {

      var configuration = Mock.Of<IConfiguration>();
      var controller = new ProductController(configuration);

            // Setup to return a value when a specific argument is passed
        Mock.Get(configuration)
            .Setup(c => c.GetConnectionString("local_database"))
            .Returns("Server=localhost,1433;Database=OnlineStore;User Id=sa;Password=P@ssw0rd;");

        // Setup to throw an exception for a different argument
        Mock.Get(configuration)
            .Setup(c => c.GetConnectionString("invalid_database"))
            .Throws(new Exception("Invalid database"));


      var result = controller.Get() as ObjectResult;

      Assert.NotNull(result);
      Assert.That(result.StatusCode,Is.EqualTo(500));
      Assert.NotNull(result.Value);
    }
  }
}