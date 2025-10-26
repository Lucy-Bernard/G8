# E-Commerce Project Architecture

```mermaid
graph TB
    subgraph Client["Client Layer - Browser"]
        User([End User]) --> Browser[Web Browser<br/>Port 3000]
    end
    
    subgraph Frontend["Frontend Layer - Next.js Application"]
        Browser --> NextApp[Next.js App Router<br/>React 18+]
        
        NextApp --> RootLayout[Root Layout<br/>UserProvider Context]
        RootLayout --> LoginPage[Login Page<br/>Authentication UI]
        RootLayout --> HomeArea[Home Area<br/>Protected Routes]
        
        HomeArea --> HomeLayout[Home Layout<br/>Header + Navigation + Footer]
        
        HomeLayout --> Pages[Application Pages]
        Pages --> HomePage[Home Page<br/>Product Catalog]
        Pages --> ProductDetailPage[Product Details<br/>Single Product View]
        Pages --> CartPage[Shopping Cart<br/>Cart Management]
        Pages --> CheckoutPage[Checkout<br/>Order Processing]
        Pages --> CategoryPages[Category Pages<br/>Filtered Products]
        Pages --> UserProfilePage[User Profile<br/>Account Management]
        
        HomeLayout --> SharedComponents[Shared Components]
        SharedComponents --> Header[Header Component<br/>Logo, Search, Profile, Cart Icons]
        SharedComponents --> Navigation[Navigation Bar<br/>Category Navigation]
        SharedComponents --> ProductCard[Product Card<br/>Product Display]
        SharedComponents --> ProductSection[Product Section<br/>Category Grouping]
        SharedComponents --> SearchComp[Search Component<br/>Product Search]
        SharedComponents --> AddToCartBtn[Add to Cart Button<br/>Cart Actions]
        SharedComponents --> Banner[Banner Component<br/>Promotional Display]
        
        NextApp --> StateManagement[State Management]
        StateManagement --> UserContext[User Context<br/>Global User State]
        StateManagement --> LocalState[Component State<br/>useState, useEffect]
        
        NextApp --> Assets[Static Assets]
        Assets --> Images[Images<br/>Products, Banners, Icons]
        Assets --> Styles[CSS Modules<br/>Component Styling]
    end
    
    subgraph API["API Layer - ASP.NET Core Web API"]
        direction TB
        
        APIEntry[API Entry Point<br/>Program.cs<br/>Port 5165] --> Middleware[Middleware Pipeline]
        Middleware --> CORS[CORS Policy<br/>Allow localhost:3000]
        Middleware --> Auth[Authorization]
        Middleware --> Routing[Route Mapping]
        
        Routing --> Controllers[API Controllers]
        
        Controllers --> UserController[User Controller<br/>POST /api/user]
        Controllers --> ProductController[Product Controller<br/>GET /api/product<br/>GET /api/product/:id]
        Controllers --> CartController[Cart Controller<br/>GET /api/cart/:userId<br/>POST /api/cart<br/>PUT /api/cart/:id/:qty<br/>DELETE /api/cart/:id]
        
        UserController --> UserModel[User Model<br/>UserId, Email, Password]
        ProductController --> ProductModel[Product Model<br/>ProductId, Name, Price, etc.]
        CartController --> CartModel[CartItem Model<br/>CartItemId, ProductId, Quantity]
        
        UserModel --> DataLayer[Data Access Layer]
        ProductModel --> DataLayer
        CartModel --> DataLayer
        
        DataLayer --> SQLClient[SQL Client<br/>System.Data.SqlClient]
        SQLClient --> ConnectionString[Connection String<br/>IConfiguration]
    end
    
    subgraph Database["Database Layer - SQL Server"]
        direction TB
        
        DBServer[SQL Server Database<br/>OnlineStore] --> CoreTables[Core Tables]
        
        CoreTables --> UserTable[(User Table<br/>UserId, Email, Password<br/>AddressId)]
        CoreTables --> ProductTable[(Product Table<br/>ProductId, CategoryId<br/>ProductName, UnitPrice<br/>Manufacturer, Rating, SKU)]
        CoreTables --> CategoryTable[(Category Table<br/>CategoryId, Name)]
        CoreTables --> CartTable[(Cart Table<br/>CartId, UserId)]
        CoreTables --> CartItemTable[(CartItem Table<br/>CartItemId, CartId<br/>ProductId, Quantity)]
        
        DBServer --> SupportTables[Supporting Tables]
        SupportTables --> OrderTable[(Order Table<br/>OrderId, UserId<br/>PaymentId, OrderNumber)]
        SupportTables --> OrderItemTable[(OrderItem Table<br/>OrderItemId, OrderId<br/>CartItemId)]
        SupportTables --> AddressTable[(Address Table<br/>AddressId, Street<br/>City, State, Zip)]
        SupportTables --> PaymentTable[(Payment Table<br/>PaymentId, CardNumber<br/>BillingAddressId)]
        SupportTables --> SaleTable[(Sale Table<br/>SaleId, PromoCode<br/>StartDate, EndDate)]
        
        DBServer --> StoredProcs[Stored Procedures]
        StoredProcs --> AuthProc[AuthenticateUser<br/>@Email, @Password]
        StoredProcs --> ProductProcs[GetProduct<br/>GetProductById]
        StoredProcs --> CartProcs[GetCartItemsForUser<br/>AddProductToCart<br/>UpdateCartItemQuantity<br/>RemoveProductFromCart]
        
        DBServer --> Relationships[Table Relationships]
        Relationships --> FK1[Foreign Keys<br/>Product → Category<br/>Cart → User<br/>CartItem → Cart, Product<br/>Order → User, Payment, Address]
    end
    
    subgraph Testing["Testing Layer"]
        FrontendTests[Frontend Tests<br/>Jest + React Testing Library] -.-> SharedComponents
        BackendTests[Backend Unit Tests<br/>xUnit/NUnit] -.-> Controllers
        
        FrontendTests --> ComponentTests[Component Tests<br/>ProductCard, Header, etc.]
        FrontendTests --> Snapshots[Snapshot Tests<br/>UI Regression]
        
        BackendTests --> ControllerTests[Controller Tests<br/>UserController, ProductController]
        BackendTests --> Mocks[Mock Interfaces<br/>IConfiguration, IUserService]
    end
    
    %% Data Flow - Frontend to Backend
    LoginPage -->|POST /api/user<br/>Email, Password| UserController
    UserController -->|Execute SP| AuthProc
    AuthProc -->|Query| UserTable
    UserTable -->|User Data| AuthProc
    AuthProc -->|Result| UserController
    UserController -->|200 OK<br/>User Object| LoginPage
    LoginPage -->|Set Context| UserContext
    
    HomePage -->|GET /api/product| ProductController
    ProductController -->|Execute SP| ProductProcs
    ProductProcs -->|SELECT *| ProductTable
    ProductTable -->|All Products| ProductProcs
    ProductProcs -->|Result| ProductController
    ProductController -->|200 OK<br/>Product List| HomePage
    
    ProductDetailPage -->|GET /api/product/:id| ProductController
    ProductController -->|Execute SP<br/>@ProductId| ProductProcs
    ProductProcs -->|SELECT WHERE| ProductTable
    ProductTable -->|Single Product| ProductProcs
    ProductProcs -->|Result| ProductController
    ProductController -->|200 OK<br/>Product Object| ProductDetailPage
    
    AddToCartBtn -->|POST /api/cart<br/>UserId, ProductId| CartController
    CartController -->|Execute SP| CartProcs
    CartProcs -->|INSERT/UPDATE| CartTable
    CartProcs -->|INSERT/UPDATE| CartItemTable
    CartItemTable -->|Success| CartProcs
    CartProcs -->|Result| CartController
    CartController -->|200 OK<br/>Success Message| AddToCartBtn
    
    CartPage -->|GET /api/cart/:userId| CartController
    CartController -->|Execute SP<br/>@UserId| CartProcs
    CartProcs -->|JOIN CartItem<br/>+ Cart + Product| CartItemTable
    CartProcs -->|JOIN| CartTable
    CartProcs -->|JOIN| ProductTable
    ProductTable -->|Product Details| CartProcs
    CartProcs -->|Result Set| CartController
    CartController -->|200 OK<br/>Cart Items| CartPage
    
    CartPage -->|PUT /api/cart/:id/:qty| CartController
    CartController -->|Execute SP<br/>@CartItemId, @Quantity| CartProcs
    CartProcs -->|UPDATE| CartItemTable
    CartItemTable -->|Success| CartProcs
    CartProcs -->|Result| CartController
    CartController -->|200 OK| CartPage
    
    CartPage -->|DELETE /api/cart/:id| CartController
    CartController -->|Execute SP<br/>@CartItemId| CartProcs
    CartProcs -->|DELETE| CartItemTable
    CartItemTable -->|Success| CartProcs
    CartProcs -->|Result| CartController
    CartController -->|200 OK| CartPage
    
    %% Styling
    style Client fill:#e3f2fd
    style Frontend fill:#e8f5e9
    style API fill:#fff4e1
    style Database fill:#fce4ec
    style Testing fill:#f3e5f5
    style User fill:#bbdefb
    style Browser fill:#c8e6c9
    style NextApp fill:#a5d6a7
    style APIEntry fill:#ffe082
    style DBServer fill:#f48fb1
```

## Architecture Overview

### **Three-Tier Architecture Pattern**

This E-Commerce application follows a **three-tier architecture** with clear separation of concerns:

---

## **1. Client Layer (Presentation Tier)**
- **Technology**: Web Browser
- **Port**: 3000 (Development)
- **Responsibility**: User interface rendering and user interactions
- **Communication**: HTTP/HTTPS requests to Frontend server

---

## **2. Frontend Layer (Application Tier - Client Side)**

### **Technology Stack**
- **Framework**: Next.js 13+ with App Router
- **Library**: React 18+
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State Management**: React Context API + useState/useEffect hooks
- **Testing**: Jest + React Testing Library

### **Architecture Patterns**
- **Component-Based Architecture**: Reusable UI components (ProductCard, Header, etc.)
- **Context API Pattern**: Global state management for user authentication
- **Layout System**: Nested layouts for consistent UI structure
- **File-Based Routing**: Next.js App Router with folder-based routes
- **Client-Side Rendering**: "use client" directive for interactive components
- **Server-Side Rendering**: Default for static pages and SEO

### **Key Responsibilities**
- User authentication and session management
- Product catalog display and filtering
- Shopping cart UI and interactions
- Search functionality (client-side filtering)
- Navigation and routing
- Form handling and validation
- API communication via Fetch API
- State management across components

### **Page Structure**
1. **Login Page**: User authentication entry point
2. **Home Page**: Product catalog with category sections
3. **Product Details**: Individual product information and add to cart
4. **Shopping Cart**: View, modify, and remove cart items
5. **Checkout**: Order processing and payment
6. **Category Pages**: Filtered product views
7. **User Profile**: Account management

---

## **3. API Layer (Application Tier - Server Side)**

### **Technology Stack**
- **Framework**: ASP.NET Core 7.0 Web API
- **Language**: C#
- **Architecture**: RESTful API with MVC pattern
- **Data Access**: ADO.NET with SqlClient
- **Configuration**: Dependency Injection for IConfiguration
- **Testing**: xUnit/NUnit for unit tests

### **Architecture Patterns**
- **MVC Pattern**: Model-View-Controller separation
- **Repository Pattern**: Data access through stored procedures
- **RESTful Design**: Standard HTTP methods (GET, POST, PUT, DELETE)
- **Dependency Injection**: IConfiguration for connection strings
- **Middleware Pipeline**: CORS, Authorization, Routing
- **Exception Handling**: Try-catch blocks with proper HTTP status codes

### **API Endpoints**

#### **User Management**
- `POST /api/user` - User login/authentication
  - Input: Email, Password
  - Output: User object (UserId, Email, Password)
  - Status: 200 OK, 401 Unauthorized, 400 Bad Request

#### **Product Management**
- `GET /api/product` - Get all products
  - Output: Array of Product objects
  - Status: 200 OK, 400 Bad Request
  
- `GET /api/product/:id` - Get product by ID
  - Input: ProductId (route parameter)
  - Output: Single Product object
  - Status: 200 OK, 404 Not Found, 400 Bad Request

#### **Cart Management**
- `GET /api/cart/:userId` - Get user's cart items
  - Input: UserId (route parameter)
  - Output: Array of CartItem objects with product details
  - Status: 200 OK, 400 Bad Request

- `POST /api/cart` - Add product to cart
  - Input: UserId, ProductId (JSON body)
  - Output: Success message
  - Status: 200 OK, 400 Bad Request

- `PUT /api/cart/:cartItemId/:quantity` - Update cart item quantity
  - Input: CartItemId, Quantity (route parameters)
  - Output: Success message
  - Status: 200 OK, 400 Bad Request

- `DELETE /api/cart/:cartItemId` - Remove item from cart
  - Input: CartItemId (route parameter)
  - Output: Success message
  - Status: 200 OK, 400 Bad Request

### **CORS Configuration**
- Allows requests from `http://localhost:3000`
- Permits all headers and methods
- Enables frontend-backend communication

---

## **4. Database Layer (Data Tier)**

### **Technology Stack**
- **DBMS**: Microsoft SQL Server
- **Database**: OnlineStore
- **Access Method**: Stored Procedures
- **Connection**: ADO.NET SqlClient

### **Database Schema**

#### **Core Tables**
1. **User** - User accounts and credentials
   - PK: UserId
   - FK: AddressId → Address
   
2. **Product** - Product catalog
   - PK: ProductId
   - FK: CategoryId → Category
   
3. **Category** - Product categories (Tops, Bottoms, Outerwear, Shoes)
   - PK: CategoryId
   
4. **Cart** - User shopping carts
   - PK: CartId
   - FK: UserId → User
   
5. **CartItem** - Items in shopping carts
   - PK: CartItemId
   - FK: CartId → Cart, ProductId → Product

#### **Supporting Tables**
- **Order** - Completed orders
- **OrderItem** - Items in orders
- **Address** - Shipping and billing addresses
- **Payment** - Payment information
- **Sale** - Promotional sales and discounts

#### **Stored Procedures**
1. **AuthenticateUser** - Validates user credentials
2. **GetProduct** - Retrieves all products
3. **GetProductById** - Retrieves single product
4. **GetCartItemsForUser** - Gets cart items with JOIN operations
5. **AddProductToCart** - Adds/updates cart items
6. **UpdateCartItemQuantity** - Modifies item quantities
7. **RemoveProductFromCart** - Deletes cart items

### **Data Integrity**
- Primary and Foreign Key constraints
- IDENTITY columns for auto-incrementing IDs
- NOT NULL constraints on required fields
- UNIQUE constraints (e.g., Email in User table)

---

## **5. Testing Layer**

### **Frontend Testing**
- **Framework**: Jest + React Testing Library
- **Test Types**: Component tests, snapshot tests
- **Coverage**: ProductCard, Header, NavigationBar, Search, Banner, etc.

### **Backend Testing**
- **Framework**: xUnit/NUnit
- **Test Types**: Unit tests, integration tests
- **Coverage**: UserController, ProductController
- **Mocking**: IConfiguration, IUserService interfaces

---

## **Data Flow Architecture**

### **Request-Response Cycle**

1. **User Authentication Flow**
   ```
   User → Browser → Login Page → POST /api/user → UserController 
   → AuthenticateUser SP → User Table → Response → UserContext
   ```

2. **Product Retrieval Flow**
   ```
   User → Browser → Home Page → GET /api/product → ProductController 
   → GetProduct SP → Product Table → Response → Product Display
   ```

3. **Add to Cart Flow**
   ```
   User → Browser → Add to Cart Button → POST /api/cart → CartController 
   → AddProductToCart SP → Cart/CartItem Tables → Response → Success
   ```

4. **Cart Management Flow**
   ```
   User → Browser → Cart Page → GET /api/cart/:userId → CartController 
   → GetCartItemsForUser SP → JOIN (CartItem + Cart + Product) 
   → Response → Cart Display
   ```

---

## **Key Architectural Principles**

1. **Separation of Concerns**: Clear boundaries between presentation, business logic, and data
2. **RESTful Design**: Standard HTTP methods and status codes
3. **Component Reusability**: Shared React components across pages
4. **State Management**: Context API for global state, local state for components
5. **Database Abstraction**: Stored procedures encapsulate database logic
6. **Error Handling**: Comprehensive try-catch blocks and proper error responses
7. **Security**: CORS policy, parameterized queries (SQL injection prevention)
8. **Scalability**: Modular architecture allows independent scaling of tiers
9. **Testability**: Separate testing layer with mocks and interfaces
10. **Type Safety**: TypeScript in frontend, strongly-typed C# in backend

---

## **Technology Summary**

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 13+ / React 18+ / TypeScript | User interface and client-side logic |
| API | ASP.NET Core 7.0 / C# | RESTful web services |
| Database | SQL Server | Data persistence and storage |
| State Management | React Context API | Global user state |
| Styling | CSS Modules | Component-scoped styling |
| Data Access | ADO.NET / SqlClient | Database connectivity |
| Testing (FE) | Jest / React Testing Library | Component testing |
| Testing (BE) | xUnit/NUnit | API unit testing |
| Communication | Fetch API / JSON | Client-server data exchange |
| Database Logic | Stored Procedures | Encapsulated data operations |

---

## **Deployment Architecture**

- **Frontend**: Development server on port 3000 (Production: Vercel/Netlify)
- **Backend**: Development server on port 5165 (Production: IIS/Azure App Service)
- **Database**: SQL Server instance (Production: Azure SQL/AWS RDS)
- **CORS**: Configured to allow frontend-backend communication

