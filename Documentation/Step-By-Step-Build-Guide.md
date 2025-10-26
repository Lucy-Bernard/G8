# Complete Step-by-Step Guide to Building the E-Commerce Application
## For Someone Who Has Never Coded Before

---

## Table of Contents
1. [Understanding What We're Building](#phase-0-understanding-what-were-building)
2. [Prerequisites & Setup](#phase-1-prerequisites--setup)
3. [Database First](#phase-2-database-first)
4. [Backend API - Starting Small](#phase-3-backend-api---starting-small)
5. [Frontend - Building the UI](#phase-4-frontend---building-the-ui)
6. [Connecting Everything](#phase-5-connecting-everything)
7. [Testing & Refinement](#phase-6-testing--refinement)

---

# PHASE 0: Understanding What We're Building

## What is an E-Commerce Application?
Think of it like Amazon or any online store where you can:
- Browse products
- Add items to a cart
- Log in as a user
- View your shopping cart

## The Three Main Parts (3-Tier Architecture)

### 1. **Database** (The Storage Room)
- Stores all the data (users, products, cart items)
- Like a filing cabinet that never forgets
- Technology: SQL Server

### 2. **Backend API** (The Manager)
- Receives requests from the frontend
- Talks to the database
- Sends data back to the frontend
- Technology: ASP.NET Core (C#)

### 3. **Frontend** (The Store Window)
- What users see and interact with
- Pretty buttons, images, forms
- Technology: Next.js (React with TypeScript)

**Think of it like a restaurant:**
- Frontend = The menu and waiter (what customers interact with)
- Backend = The kitchen manager (takes orders, coordinates)
- Database = The pantry (stores all ingredients/data)

---

# PHASE 1: Prerequisites & Setup

## Step 1.1: Install Required Software

### Install in This Order:

#### 1. **Visual Studio Code** (Code Editor)
- Go to: https://code.visualstudio.com/
- Download and install
- **Why?** This is where you'll write code

#### 2. **SQL Server** (Database)
- Go to: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
- Download SQL Server 2022 Developer Edition (FREE)
- **Why?** This stores all your data

#### 3. **SQL Server Management Studio (SSMS)** (Database Tool)
- Go to: https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms
- Download and install
- **Why?** Makes it easy to see and manage your database

#### 4. **.NET 7 SDK** (For Backend)
- Go to: https://dotnet.microsoft.com/download
- Download .NET 7 SDK
- **Why?** You need this to build C# applications

#### 5. **Node.js** (For Frontend)
- Go to: https://nodejs.org/
- Download LTS version
- **Why?** You need this to run React/Next.js

#### 6. **Git** (Version Control)
- Go to: https://git-scm.com/downloads
- Download and install
- **Why?** Helps you save versions of your code

## Step 1.2: Verify Everything is Installed

Open Terminal (Mac) or Command Prompt (Windows) and type each command:

```bash
# Check .NET
dotnet --version
# Should show: 7.0.x or higher

# Check Node.js
node --version
# Should show: v18.x.x or similar

# Check npm
npm --version
# Should show: 9.x.x or similar

# Check Git
git --version
# Should show: git version 2.x.x
```

If any command fails, go back and reinstall that software.

## Step 1.3: Create Project Folder

```bash
# Navigate to where you want to create your project
cd Desktop

# Create main folder
mkdir E-Commerce
cd E-Commerce

# Create subfolders
mkdir BackEnd
mkdir FrontEnd
mkdir Database
mkdir UnitTestsAPI
```

---

# PHASE 2: Database First
**WHY START HERE?** Because everything else depends on having data!

## Step 2.1: Understand Database Concepts

### What is a Table?
Think of it like an Excel spreadsheet:
- **Columns** = Properties (Name, Email, Price)
- **Rows** = Individual items (John Doe's account, iPhone product)

### What is a Primary Key?
- A unique ID for each row
- Like a student ID number - no two students have the same one

### What is a Foreign Key?
- A reference to another table's Primary Key
- Like saying "This cart belongs to User #5"

### What is a Stored Procedure?
- Pre-written SQL code saved in the database
- Like a recipe you can call by name instead of writing steps each time

## Step 2.2: Design Your Database Schema

### Tables You Need:

1. **Category** - Types of products (Top, Bottom, Shoes, Outerwear)
2. **Product** - Individual items for sale
3. **Address** - Shipping/billing addresses
4. **User** - Customer accounts
5. **Cart** - Shopping carts (one per user)
6. **CartItem** - Items in a cart
7. **Payment** - Payment methods
8. **Order** - Completed purchases
9. **OrderItem** - Items in an order
10. **Sale** - Promotional sales

### Relationships:
- One User → One Cart
- One Cart → Many CartItems
- One Product → Many CartItems

## Step 2.3: Create the Database

### Step-by-Step:

1. **Open SQL Server Management Studio (SSMS)**

2. **Connect to your local server:**
   - Server name: `localhost` or `(localdb)\MSSQLLocalDB`
   - Authentication: Windows Authentication
   - Click Connect

3. **Create a new database:**
   ```sql
   CREATE DATABASE OnlineStore;
   GO
   
   USE OnlineStore;
   GO
   ```

4. **Create the Category table first** (has no dependencies):
   ```sql
   CREATE TABLE Category
   (
       categoryId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
       name VARCHAR(100) NOT NULL
   );
   ```
   
   **What this means:**
   - `categoryId` = Column name
   - `INT` = Integer (whole number)
   - `PRIMARY KEY` = Unique identifier
   - `IDENTITY(1,1)` = Auto-increment (starts at 1, adds 1 each time)
   - `VARCHAR(100)` = Text up to 100 characters
   - `NOT NULL` = Must have a value

5. **Create the Product table** (depends on Category):
   ```sql
   CREATE TABLE Product
   (
       productId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
       categoryId INT FOREIGN KEY REFERENCES Category(categoryId),
       productName VARCHAR(100) NOT NULL,
       unitPrice MONEY NOT NULL,
       manufacturer VARCHAR(MAX) NOT NULL,
       description VARCHAR(MAX), 
       rating DECIMAL(2,1), 
       sku VARCHAR(15) NOT NULL,
       imageLink VARCHAR(MAX) NOT NULL
   );
   ```

6. **Continue with the rest of the tables** (follow createDB.sql file)

7. **Insert sample data:**
   ```sql
   INSERT INTO Category (name)
   VALUES ('Top'), ('Bottom'), ('Outerwear'), ('Shoes');
   
   INSERT INTO Product (categoryId, productName, unitPrice, manufacturer, description, rating, sku, imageLink)
   VALUES (2, 'Homme Graphic Jogger', 21.00, 'manufacturer 1', 'description 1', 4.6, '123456', 'Homme Graphic Jogger.jpeg');
   ```

## Step 2.4: Create Stored Procedures

### Why? 
Security and reusability. Instead of writing SQL in your code, you call procedures.

### Example - Get All Products:
```sql
CREATE PROCEDURE GetProduct
AS
BEGIN
    SELECT ProductId, CategoryId, ProductName, UnitPrice, 
           Manufacturer, Description, Rating, SKU, imageLink
    FROM Product;
END
GO
```

### Example - Authenticate User:
```sql
CREATE PROCEDURE AuthenticateUser 
    @Email VARCHAR(255), 
    @Password_ VARCHAR(255)
AS
BEGIN
    SELECT u.UserId, u.Email, u.Password_
    FROM [User] u
    WHERE u.Email = @Email AND u.Password_ = @Password_;
END
GO
```

### Test your procedure:
```sql
EXECUTE GetProduct;
EXECUTE AuthenticateUser @Email = 'johndoe217@email.com', @Password_ = 'P@ssw0rd143';
```

## Step 2.5: Save Your Database Script

Save all the SQL code in: `Database/createDB.sql`

**TIP:** You can run the entire script to recreate the database anytime!

---

# PHASE 3: Backend API - Starting Small

## Step 3.1: Understand What an API Is

### What is an API?
- **Application Programming Interface**
- A waiter between the frontend (customer) and database (kitchen)
- Receives HTTP requests, processes them, returns responses

### What is HTTP?
- How computers talk over the internet
- Methods: GET (retrieve), POST (create), PUT (update), DELETE (remove)

### What is REST?
- A style of building APIs
- Uses URLs to represent resources
- Example: `GET /api/product` = "Get all products"

## Step 3.2: Create the Backend Project

### Open Terminal and navigate to your BackEnd folder:

```bash
cd E-Commerce/BackEnd
```

### Create a new Web API project:

```bash
dotnet new webapi -n ExampleAPI
```

**What this does:** Creates a template API project with folders and files.

### Navigate into the project:

```bash
cd ExampleAPI
```

### Project Structure Created:
```
ExampleAPI/
├── Controllers/        (API endpoints go here)
├── Models/            (Data structures)
├── Properties/        (Configuration)
├── appsettings.json   (Settings like database connection)
├── Program.cs         (Entry point of the app)
└── ExampleAPI.csproj  (Project file)
```

## Step 3.3: Configure Database Connection

### Edit `appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "local_database": "Server=localhost;Database=OnlineStore;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

**What this means:**
- `ConnectionStrings` = How to connect to your database
- `Server=localhost` = Database is on your computer
- `Database=OnlineStore` = The database name we created
- `Trusted_Connection=True` = Use Windows authentication

## Step 3.4: Install Required NuGet Packages

```bash
dotnet add package System.Data.SqlClient
dotnet add package Newtonsoft.Json
```

**What are NuGet packages?** Pre-built code libraries (like using Lego blocks instead of making your own).

## Step 3.5: Create Your First Model (User)

### Create `Models/User.cs`:

```csharp
namespace ExampleAPI.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string? Email { get; set; }
        public string? Password_ { get; set; }

        // Constructor for login
        public User(string Email, string Password_)
        {
            this.Email = Email;
            this.Password_ = Password_;
        }

        // Constructor with ID (for responses)
        public User(int UserId, string Email, string Password_)
        {
            this.UserId = UserId;
            this.Email = Email;
            this.Password_ = Password_;
        }
    }
}
```

**What is a Model?**
- A C# class that represents data
- Like a blueprint for what a User looks like
- Properties: UserId, Email, Password_
- Constructors: Different ways to create a User object

**What does `{ get; set; }` mean?**
- `get` = You can read this property
- `set` = You can change this property

## Step 3.6: Create Your First Controller (UserController)

### Create `Controllers/UserController.cs`:

Start with the basic structure:

```csharp
using Microsoft.AspNetCore.Mvc;
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

        // We'll add methods here
    }
}
```

**What's happening here?**

1. **`[Route("api/[controller]")]`**
   - This controller handles requests to `/api/user`
   - `[controller]` automatically uses "User" from "UserController"

2. **`[ApiController]`**
   - Tells ASP.NET this is an API controller
   - Adds automatic features like model validation

3. **`ControllerBase`**
   - Base class with helpful methods (Ok, BadRequest, etc.)

4. **`IConfiguration configuration`**
   - Dependency Injection (DI)
   - ASP.NET automatically gives you access to appsettings.json
   - You can read the database connection string

### Add the Login Method:

```csharp
using System.Data;
using System.Data.SqlClient;

// ...inside the UserController class...

[HttpPost]
public ActionResult Login([FromBody] User loginUser)
{
    try
    {
        using (SqlConnection connection = new SqlConnection(
            configuration.GetConnectionString("local_database")))
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
                return Ok(new User(
                    reader.GetInt32(0),    // UserId
                    reader.GetString(1),   // Email
                    reader.GetString(2)    // Password_
                ));
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
```

**Breaking this down step-by-step:**

1. **`[HttpPost]`** = This method handles POST requests

2. **`[FromBody] User loginUser`** = Get User object from request body

3. **`SqlConnection`** = Opens connection to database
   - `using` ensures it closes automatically

4. **`SqlCommand`** = Prepares to run the stored procedure
   - `CommandType.StoredProcedure` = We're calling a procedure

5. **`command.Parameters.Add`** = Pass values to the procedure
   - Prevents SQL injection attacks

6. **`connection.Open()`** = Actually connect to database

7. **`SqlDataReader`** = Reads results from database

8. **`reader.HasRows`** = Check if we got any results
   - If yes → User exists → Return Ok with User object
   - If no → Invalid credentials → Return Unauthorized

9. **`try-catch`** = Handle errors gracefully

## Step 3.7: Configure CORS (Cross-Origin Resource Sharing)

### Edit `Program.cs`:

```csharp
namespace ExampleAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services
            builder.Services.AddControllers();
            
            // Add CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: "_MyAllowSubdomainPolicy",
                policy =>
                {
                    policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            // Use CORS
            app.UseCors("_MyAllowSubdomainPolicy");
            
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
```

**What is CORS?**
- Security feature in browsers
- By default, frontend (localhost:3000) can't call API (localhost:5165)
- CORS policy allows it

## Step 3.8: Test Your API

### Run the API:

```bash
dotnet run
```

You should see:
```
Now listening on: http://localhost:5165
```

### Test with a tool (Postman or curl):

**Using curl:**
```bash
curl -X POST http://localhost:5165/api/user \
  -H "Content-Type: application/json" \
  -d '{"Email":"johndoe217@email.com","Password_":"P@ssw0rd143"}'
```

**Expected Response:**
```json
{
  "userId": 1,
  "email": "johndoe217@email.com",
  "password_": "P@ssw0rd143"
}
```

## Step 3.9: Add Product Model and Controller

### Create `Models/Product.cs`:

```csharp
namespace ExampleAPI.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public int CategoryId { get; set; }
        public string ProductName { get; set; }
        public decimal UnitPrice { get; set; }
        public string Manufacturer { get; set; }
        public string Description { get; set; }
        public decimal Rating { get; set; }
        public string SKU { get; set; }
        public string ImageLink { get; set; }

        public Product(int productId, int categoryId, string productName, 
                      decimal unitPrice, string manufacturer, string description, 
                      decimal rating, string sku, string imageLink)
        {   
            this.ProductId = productId;
            this.CategoryId = categoryId;
            this.ProductName = productName;
            this.UnitPrice = unitPrice;
            this.Manufacturer = manufacturer;
            this.Description = description;
            this.Rating = rating;
            this.SKU = sku;
            this.ImageLink = imageLink;
        }
    }
}
```

### Create `Controllers/ProductController.cs`:

```csharp
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

        // GET all products
        [HttpGet]
        public ObjectResult Get()
        {
            List<Product> products = new();

            try
            {
                using (SqlConnection connection = new(
                    configuration.GetConnectionString("local_database")))
                {
                    SqlCommand command = new("GetProduct", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    connection.Open();
                    using SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Product product = new Product(
                            reader.GetInt32(0),     // ProductId
                            reader.GetInt32(1),     // CategoryId
                            reader.GetString(2),    // ProductName
                            reader.GetDecimal(3),   // UnitPrice
                            reader.GetString(4),    // Manufacturer
                            reader.GetString(5),    // Description
                            reader.GetDecimal(6),   // Rating
                            reader.GetString(7),    // SKU
                            reader.GetString(8)     // ImageLink
                        );
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

        // GET single product by ID
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                using (SqlConnection connection = new(
                    configuration.GetConnectionString("local_database")))
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
                            reader.GetString(8)
                        );

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
```

### Test:
```bash
curl http://localhost:5165/api/product
curl http://localhost:5165/api/product/1
```

## Step 3.10: Add CartItem Model and CartController

### Create `Models/CartItem.cs`:

```csharp
namespace ExampleAPI.Models
{
    public class CartItem
    {
        public int CartItemId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string? ProductName { get; set; }
        public decimal UnitPrice { get; set; }
        public string? Manufacturer { get; set; }
        public string? Description { get; set; }
        public decimal Rating { get; set; }
        public string? Sku { get; set; }
        public string? ImageLink { get; set; }
        public int UserId { get; set; }

        // For adding to cart
        public CartItem(int UserId, int ProductId) 
        {
            this.UserId = UserId;
            this.ProductId = ProductId;
        }

        // For retrieving cart items
        public CartItem(int CartItemId, int ProductId, int Quantity, 
                       string ProductName, decimal UnitPrice, string Manufacturer, 
                       string Description, decimal Rating, string Sku, string ImageLink)
        {
            this.CartItemId = CartItemId;
            this.ProductId = ProductId;
            this.Quantity = Quantity;
            this.ProductName = ProductName;
            this.UnitPrice = UnitPrice;
            this.Manufacturer = Manufacturer;
            this.Description = Description;
            this.Rating = Rating;
            this.Sku = Sku;
            this.ImageLink = ImageLink;
        }

        public CartItem() {}
    }
}
```

### Create `Controllers/CartController.cs`:

```csharp
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using ExampleAPI.Models;

namespace ExampleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public CartController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        // GET cart items for a user
        [HttpGet("{userId}")]
        public ActionResult<List<CartItem>> GetCartItemsForUser(int userId)
        {
            List<CartItem> cartItems = new List<CartItem>();

            try
            {
                using (SqlConnection connection = new SqlConnection(
                    configuration.GetConnectionString("local_database")))
                {
                    SqlCommand command = new SqlCommand("GetCartItemsForUser", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };
                    command.Parameters.AddWithValue("@UserId", userId);

                    connection.Open();
                    using SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        CartItem cartItem = new CartItem(
                            reader.GetInt32(0),     // CartItemId
                            reader.GetInt32(1),     // ProductId
                            reader.GetInt32(2),     // Quantity
                            reader.GetString(3),    // ProductName
                            reader.GetDecimal(4),   // UnitPrice
                            reader.GetString(5),    // Manufacturer
                            reader.GetString(6),    // Description
                            reader.GetDecimal(7),   // Rating
                            reader.GetString(8),    // Sku
                            reader.GetString(9)     // ImageLink
                        );
                        cartItems.Add(cartItem);
                    }
                }

                return Ok(cartItems);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        // POST - Add product to cart
        [HttpPost]
        public ActionResult Post([FromBody] CartItem cartItem)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(
                    configuration.GetConnectionString("local_database")))
                {
                    SqlCommand command = new SqlCommand("AddProductToCart", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    command.Parameters.AddWithValue("@UserId", cartItem.UserId);
                    command.Parameters.AddWithValue("@ProductId", cartItem.ProductId);

                    connection.Open();
                    command.ExecuteNonQuery();

                    return Ok("Product added to cart successfully");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex.Message);
            }
        }

        // PUT - Update quantity
        [HttpPut("{cartItemId}/{quantity}")]
        public ActionResult Put(int cartItemId, int quantity)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(
                    configuration.GetConnectionString("local_database")))
                {
                    SqlCommand command = new SqlCommand("UpdateCartItemQuantity", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    command.Parameters.AddWithValue("@CartItemId", cartItemId);
                    command.Parameters.AddWithValue("@NewQuantity", quantity);

                    connection.Open();
                    command.ExecuteNonQuery();

                    return Ok("Quantity changed.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex.Message);
            }
        }

        // DELETE - Remove from cart
        [HttpDelete("{cartItemId}")]
        public ActionResult Delete(int cartItemId)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(
                    configuration.GetConnectionString("local_database")))
                {
                    SqlCommand command = new SqlCommand("RemoveProductFromCart", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    command.Parameters.AddWithValue("@cartItemId", cartItemId);

                    connection.Open();
                    command.ExecuteNonQuery();

                    return Ok("Product deleted from cart successfully");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex.Message);
            }
        }
    }
}
```

---

# PHASE 4: Frontend - Building the UI

## Step 4.1: Understand Frontend Technologies

### What is React?
- JavaScript library for building user interfaces
- Creates reusable components (like Lego blocks)
- Updates only what changed (fast!)

### What is Next.js?
- Framework built on top of React
- Adds routing, server-side rendering, etc.
- Makes React easier to use

### What is TypeScript?
- JavaScript with types
- Catches errors before you run code
- Like spell-check for programming

## Step 4.2: Create the Frontend Project

### Navigate to FrontEnd folder:

```bash
cd E-Commerce/FrontEnd
```

### Create Next.js app:

```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir
```

Answer the prompts:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- src/ directory: Yes
- App Router: Yes
- Import alias: No

### Project Structure:
```
FrontEnd/
├── src/
│   ├── app/              (Pages and routing)
│   │   ├── page.tsx      (Home/Login page)
│   │   ├── layout.tsx    (Wrapper for all pages)
│   │   └── home/         (Other pages)
│   ├── components/       (Reusable UI pieces)
│   └── assets/           (Images)
├── public/               (Static files)
├── package.json          (Dependencies)
└── tsconfig.json         (TypeScript config)
```

### Install dependencies:

```bash
npm install
```

## Step 4.3: Understand React Components

### What is a Component?
A reusable piece of UI. Like a Lego block.

**Example - A Button Component:**
```typescript
export function MyButton({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

// Use it anywhere:
<MyButton text="Click me!" onClick={handleClick} />
```

### What is JSX/TSX?
- Looks like HTML inside JavaScript/TypeScript
- `<div>Hello</div>` in your code becomes real HTML

### What are Props?
- Data passed to components
- Like function parameters
- `<MyButton text="Hello" />` → text is a prop

### What is State?
- Data that can change
- When state changes, component re-renders
- `const [count, setCount] = useState(0);`

## Step 4.4: Create User Context (Global State)

### Why?
To store logged-in user info accessible anywhere.

### Create `src/app/user.tsx`:

```typescript
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define what a User looks like
interface User {
  userId: number;
  email: string;
  password_: string;
}

// Define context type
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook to use the context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
```

**What's happening:**
1. `UserContext` = Container for user data
2. `UserProvider` = Wraps your app, provides user data
3. `useUser()` = Hook to access user data from any component

### Wrap your app with UserProvider in `src/app/layout.tsx`:

```typescript
import { UserProvider } from "./user";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
```

## Step 4.5: Create Login Page

### Edit `src/app/page.tsx`:

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./user";
import styles from "./page.module.css";

export default function Login() {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { setUser } = useUser();

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload
    setIsLoading(true);
    setError("");

    try {
      // Make API call
      const response = await fetch("http://localhost:5165/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Password_: password,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData); // Save user to context
        router.push("/home"); // Navigate to home page
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

**Breaking this down:**

1. **`useState`** = Creates state variables
   - `email` = current value
   - `setEmail` = function to update email

2. **`onChange={(e) => setEmail(e.target.value)}`**
   - When user types, update state
   - `e.target.value` = what user typed

3. **`handleSubmit`** = Function called when form submitted
   - `event.preventDefault()` = Don't reload page
   - `fetch()` = Make HTTP request to API
   - If successful → save user → redirect to home

4. **`{isLoading ? "Logging in..." : "Login"}`**
   - Conditional rendering
   - Shows different text based on state

### Add some CSS in `src/app/page.module.css`:

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #667eea 0%, #764ba2 100%);
}

.loginBox {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

.loginBox h1 {
  margin-bottom: 30px;
  text-align: center;
  color: #333;
}

.inputGroup {
  margin-bottom: 20px;
}

.inputGroup label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
}

.inputGroup input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.error {
  color: red;
  margin: 10px 0;
  text-align: center;
}

button {
  width: 100%;
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #5568d3;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
```

## Step 4.6: Create Home Page with Products

### Create folder and file:

```bash
mkdir -p src/app/home
touch src/app/home/page.tsx
```

### Create `src/app/home/page.tsx`:

```typescript
"use client";

import { useEffect, useState } from "react";
import { useUser } from "../user";
import { useRouter } from "next/navigation";

interface Product {
  productId: number;
  categoryId: number;
  productName: string;
  unitPrice: number;
  manufacturer: string;
  description: string;
  rating: number;
  sku: string;
  imageLink: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      router.push("/"); // Redirect to login
    }
  }, [user, router]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5165/api/product");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user?.email}!</h1>
      <h2>Products</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.productId} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
            <img src={`/products/${product.imageLink}`} alt={product.productName} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <h3>{product.productName}</h3>
            <p>${product.unitPrice}</p>
            <p>Rating: {product.rating} ⭐</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**What's new:**

1. **`useEffect(() => {...}, [])`**
   - Runs when component first loads
   - Empty array `[]` = run once
   - Fetches products from API

2. **`.map()`**
   - Loops through products array
   - Creates a component for each product
   - `key={product.productId}` helps React track items

## Step 4.7: Create Reusable Components

### Create ProductCard Component

```bash
mkdir -p src/components/ProductCard
touch src/components/ProductCard/ProductCard.tsx
```

### `src/components/ProductCard/ProductCard.tsx`:

```typescript
"use client";

import styles from "./ProductCard.module.css";

interface Product {
  productId: number;
  productName: string;
  unitPrice: number;
  rating: number;
  imageLink: string;
  manufacturer: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <img 
        src={`/products/${product.imageLink}`} 
        alt={product.productName} 
        className={styles.image}
      />
      <h3 className={styles.title}>{product.productName}</h3>
      <p className={styles.manufacturer}>{product.manufacturer}</p>
      <div className={styles.footer}>
        <span className={styles.price}>${product.unitPrice}</span>
        <span className={styles.rating}>{product.rating} ⭐</span>
      </div>
      <button 
        className={styles.button} 
        onClick={() => onAddToCart(product.productId)}
      >
        Add to Cart
      </button>
    </div>
  );
}
```

**What's happening:**
- `ProductCardProps` = Defines what props this component accepts
- `product` = Product data to display
- `onAddToCart` = Function to call when button clicked

### Create `src/components/ProductCard/ProductCard.module.css`:

```css
.card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 15px;
  background: white;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  margin: 10px 0 5px;
  color: #333;
}

.manufacturer {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #667eea;
}

.rating {
  font-size: 14px;
  color: #f59e0b;
}

.button {
  width: 100%;
  padding: 10px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.3s;
}

.button:hover {
  background: #5568d3;
}
```

### Update Home page to use ProductCard:

```typescript
import ProductCard from "@/components/ProductCard/ProductCard";

// ...inside the return statement...
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
  {products.map((product) => (
    <ProductCard 
      key={product.productId} 
      product={product} 
      onAddToCart={handleAddToCart}
    />
  ))}
</div>
```

### Add handleAddToCart function:

```typescript
const handleAddToCart = async (productId: number) => {
  if (!user) return;

  try {
    const response = await fetch("http://localhost:5165/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: user.userId,
        ProductId: productId,
      }),
    });

    if (response.ok) {
      alert("Product added to cart!");
    } else {
      alert("Failed to add product to cart");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
```

## Step 4.8: Create Header Component

### Create `src/components/Header/Header.tsx`:

```typescript
"use client";

import Link from "next/link";
import { useUser } from "@/app/user";
import styles from "./Header.module.css";

export default function Header() {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/home" className={styles.logo}>
          E-Commerce Store
        </Link>
        <nav className={styles.nav}>
          <Link href="/home">Products</Link>
          <Link href="/cart">Cart</Link>
          {user && (
            <>
              <span>Hello, {user.email}</span>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
```

### Create `src/components/Header/Header.module.css`:

```css
.header {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #667eea;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.nav a:hover {
  color: #667eea;
}

.logoutBtn {
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
}

.logoutBtn:hover {
  background: #5568d3;
}
```

### Add Header to layout:

Update `src/app/layout.tsx`:

```typescript
import Header from "@/components/Header/Header";
import { UserProvider } from "./user";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Header />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
```

---

# PHASE 5: Connecting Everything

## Step 5.1: Run Both Backend and Frontend

### Terminal 1 - Backend:
```bash
cd E-Commerce/BackEnd/ExampleAPI
dotnet run
```

Should see: `Now listening on: http://localhost:5165`

### Terminal 2 - Frontend:
```bash
cd E-Commerce/FrontEnd
npm run dev
```

Should see: `Ready on http://localhost:3000`

### Open browser:
Go to `http://localhost:3000`

## Step 5.2: Test the Flow

1. **Login**
   - Email: `johndoe217@email.com`
   - Password: `P@ssw0rd143`
   - Should redirect to home page

2. **View Products**
   - Should see all products from database

3. **Add to Cart**
   - Click "Add to Cart" button
   - Should see success message

4. **View Cart** (if implemented)

## Step 5.3: Common Issues and Solutions

### Issue: CORS Error
**Error:** "Access to fetch blocked by CORS policy"

**Solution:** Make sure Program.cs has CORS configured:
```csharp
app.UseCors("_MyAllowSubdomainPolicy");
```

### Issue: Cannot connect to database
**Error:** "A network-related error occurred"

**Solution:**
1. Make sure SQL Server is running
2. Check connection string in appsettings.json
3. Verify database name is correct

### Issue: 404 Not Found
**Error:** "Cannot GET /api/product"

**Solution:**
1. Check controller routing: `[Route("api/[controller]")]`
2. Make sure API is running
3. Verify URL matches controller name

### Issue: Images not showing
**Solution:**
1. Create `public/products/` folder in FrontEnd
2. Put product images there
3. Image names must match database `imageLink` column

---

# PHASE 6: Testing & Refinement

## Step 6.1: Manual Testing Checklist

### Login Flow:
- [ ] Can login with valid credentials
- [ ] Shows error with invalid credentials
- [ ] Redirects to home after login
- [ ] Shows user email in header

### Products:
- [ ] All products load
- [ ] Images display correctly
- [ ] Prices show correctly
- [ ] Add to Cart works

### Cart:
- [ ] Can view cart items
- [ ] Can update quantity
- [ ] Can remove items
- [ ] Total price calculates correctly

### Navigation:
- [ ] Can navigate between pages
- [ ] Logout works
- [ ] Redirects to login if not authenticated

## Step 6.2: Write Unit Tests for API

### Create test project:

```bash
cd E-Commerce
dotnet new xunit -n UnitTestsAPI
cd UnitTestsAPI
dotnet add reference ../BackEnd/ExampleAPI/ExampleAPI.csproj
```

### Install testing packages:

```bash
dotnet add package Moq
dotnet add package Microsoft.AspNetCore.Mvc.Testing
```

### Example test for UserController:

```csharp
using Xunit;
using Moq;
using Microsoft.Extensions.Configuration;
using ExampleAPI.Controllers;
using Microsoft.AspNetCore.Mvc;

public class UserControllerTests
{
    [Fact]
    public void Login_WithValidCredentials_ReturnsOkResult()
    {
        // Arrange
        var mockConfig = new Mock<IConfiguration>();
        mockConfig.Setup(x => x.GetConnectionString("local_database"))
                  .Returns("your-connection-string");
        
        var controller = new UserController(mockConfig.Object);
        
        // Act
        // Test logic here
        
        // Assert
        // Verify results
    }
}
```

### Run tests:

```bash
dotnet test
```

## Step 6.3: Add Better Error Handling

### Create error response model:

```csharp
namespace ExampleAPI.Models
{
    public class ErrorResponse
    {
        public string Message { get; set; }
        public int StatusCode { get; set; }
        
        public ErrorResponse(string message, int statusCode)
        {
            Message = message;
            StatusCode = statusCode;
        }
    }
}
```

### Update controllers to use it:

```csharp
catch (Exception exception)
{
    return StatusCode(500, new ErrorResponse(
        "An error occurred processing your request.", 
        500
    ));
}
```

## Step 6.4: Add Loading States

### Create Loading component:

```typescript
// src/components/Loading/Loading.tsx
export default function Loading() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}
```

### Use it in pages:

```typescript
if (loading) {
  return <Loading />;
}
```

## Step 6.5: Add Input Validation

### Frontend validation:

```typescript
const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateEmail(email)) {
    setError("Please enter a valid email");
    return;
  }
  
  if (password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }
  
  // Continue with API call...
};
```

### Backend validation (using Data Annotations):

```csharp
using System.ComponentModel.DataAnnotations;

public class User
{
    [Required]
    [EmailAddress]
    public string? Email { get; set; }
    
    [Required]
    [MinLength(6)]
    public string? Password_ { get; set; }
}
```

---

# PHASE 7: Deployment (Optional)

## Step 7.1: Prepare for Production

### Backend:
1. Use environment variables for sensitive data
2. Enable HTTPS
3. Add logging
4. Set up proper authentication (JWT)

### Frontend:
1. Build for production: `npm run build`
2. Optimize images
3. Add environment variables for API URL

### Database:
1. Use a production database
2. Backup regularly
3. Set up proper security

## Step 7.2: Deployment Options

### Backend:
- Azure App Service
- AWS Elastic Beanstalk
- Heroku

### Frontend:
- Vercel (easiest for Next.js)
- Netlify
- AWS Amplify

### Database:
- Azure SQL Database
- AWS RDS
- SQL Server on VM

---

# Summary: The Building Order

## Here's the exact order you would build this project:

### Week 1: Database
1. Install SQL Server and SSMS
2. Design database schema on paper
3. Create tables in order of dependencies
4. Insert sample data
5. Create stored procedures
6. Test with queries

### Week 2: Backend Setup
1. Install .NET SDK
2. Create Web API project
3. Set up folder structure
4. Configure appsettings.json
5. Install NuGet packages

### Week 3: Backend - User Authentication
1. Create User model
2. Create UserController
3. Implement Login endpoint
4. Test with Postman/curl
5. Fix any bugs

### Week 4: Backend - Products
1. Create Product model
2. Create ProductController
3. Implement GET endpoints
4. Test endpoints
5. Fix any bugs

### Week 5: Backend - Cart
1. Create CartItem model
2. Create CartController
3. Implement GET, POST, PUT, DELETE
4. Test all endpoints

### Week 6: Frontend Setup
1. Install Node.js
2. Create Next.js project
3. Set up folder structure
4. Install dependencies
5. Create basic layout

### Week 7: Frontend - Authentication
1. Create user context
2. Build login page
3. Connect to API
4. Test login flow
5. Add error handling

### Week 8: Frontend - Products
1. Build home page
2. Fetch products from API
3. Create ProductCard component
4. Display products in grid
5. Add styling

### Week 9: Frontend - Cart
1. Build cart page
2. Fetch cart items
3. Implement add/remove/update
4. Calculate totals
5. Add styling

### Week 10: Testing & Polish
1. Write unit tests
2. Manual testing
3. Fix bugs
4. Improve UI/UX
5. Add loading states

### Week 11: Advanced Features
1. Search functionality
2. Filter by category
3. Sort products
4. Order history
5. User profile

### Week 12: Deployment
1. Prepare for production
2. Deploy backend
3. Deploy frontend
4. Deploy database
5. Final testing

---

# Key Concepts to Master

## Programming Fundamentals:
1. **Variables** - Store data
2. **Functions** - Reusable code blocks
3. **Loops** - Repeat actions
4. **Conditionals** - If/else decisions
5. **Objects/Classes** - Organize related data

## Web Development:
1. **HTTP** - How web communicates
2. **REST** - API design pattern
3. **JSON** - Data format
4. **CRUD** - Create, Read, Update, Delete

## C# Specific:
1. **Classes & Objects**
2. **Properties & Methods**
3. **Dependency Injection**
4. **Async/Await**
5. **LINQ** (advanced)

## React/TypeScript:
1. **Components**
2. **Props & State**
3. **Hooks** (useState, useEffect)
4. **Event Handling**
5. **Conditional Rendering**

## Database:
1. **Tables & Relationships**
2. **Primary & Foreign Keys**
3. **SQL Queries**
4. **Stored Procedures**
5. **Joins** (advanced)

---

# Resources for Learning

## Free Courses:
1. **C# Basics** - Microsoft Learn
2. **React** - React.dev documentation
3. **SQL** - SQLBolt.com
4. **TypeScript** - TypeScript Handbook

## YouTube Channels:
1. **Traversy Media** - Web development
2. **Programming with Mosh** - C# and React
3. **Net Ninja** - React and Next.js
4. **freeCodeCamp** - Everything

## Practice:
1. Build small projects first
2. Follow tutorials but modify them
3. Read error messages carefully
4. Google everything you don't understand
5. Ask questions on Stack Overflow

---

# Final Tips

1. **Start Small** - Don't try to build everything at once
2. **Test Frequently** - Test after every small change
3. **Comment Your Code** - Explain what things do
4. **Use Git** - Save your progress often
5. **Don't Give Up** - Everyone struggles at first
6. **Google is Your Friend** - You won't remember everything
7. **Break Down Problems** - Divide big tasks into tiny steps
8. **Celebrate Wins** - Every working feature is an achievement

**Remember:** This project represents weeks or months of learning. Take it one step at a time, and you'll get there!

Good luck! 🚀

