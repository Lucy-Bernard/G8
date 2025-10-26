# Architecture Used

## Model View Controller

- **Models**
- **Controllers**
- **View**
  - React Pages and Components

# Features

- Cart Functionality
- Login Functionality
- Checkout Functionality
- Search Functionality

# BackEnd

## Database

Tools used: Azure Data Studio to run Microsoft SQL queries.

- In order to run SQL environment (sql isn't native to linux/mac), we use a docker image (microsoft provides this image) to simulate windows environment for SQL to run.

Docker Image that Microsoft provides to simulate windows environment:

[hub.docker.com](https://hub.docker.com/r/microsoft/mssql-server)

## Api

Tools used: Dotnet 7.0, Postman, VSCode extension: Visual NuGet

**Dotnet7** is a **microsoft framework** that provides libraries, classes for databases, web APIS, file handling, runtime environments, etc for building a full stack application

# FrontEnd

Tools Used: React/Next.js Framework

## App directory:

These are all route directories that represent a different page/url in the app:

### Login Page

- **Components used:** None, just html tags like submitbutton and form
- **API endpoint:**
  - Uses the `user controller` to check whether the email and password provided exist in the database. If it does, the user is redirected to the homepage for that specific userid
- **Protection Against SQL injection:**
  - Used `String` placeholders for user input such as email and password so that the input is not mistaken for a SQL command
    - **Flow:**
      - User inputs email and pw
      - Stored as strings
      - Javascript converts the strings into json objects
      - API call turns these into objects where email = string email and pw = string pw provided
      - If user tries to type in a SQL command Password: `IgoB00m; DROP TABLE User;`
        - When processed, the value for password will be treated as a string. So the password the user entered will be considered "Igob00m! DROP Table User;". The sql query will attempt to find this and return None since that pw doesn't exist

### Home page

- **Components used:**
  - Header, NavigationBar, Product Section, Product Card, Search bar, Cart
- **API endpoint:**
  - Uses the `product controller` a result set of all unique products with their various details such as `name` `sku` etc.
  - Converts data into json objects
  - React takes json objects and converts them to javascript objects
  - Stores data into an array for displaying across the Home Page UI when necessary

### Cart page

- **Components used:**
  - Cart, Product Card
- **State:**
  - Kept track of cart Items
  - Kept track of user
- **API endpoint:**
  - Uses the `cart Controller` to return the cart related to the specific user Id
  - Converts data into json objects
  - React takes json objects and converts them to javascript objects
  - Take the data and store it into the a `cartItems` array to display cart items wherever necessary and also access any specific properties like quantity and/or prices in order to perform necessary calculations for checkout
  - Additional endpoint is used to update the amount of items are in the users cart and also the quantity of a certain item - updates the database and returns the new result set

### Checkout Page

- **Components used:**
  - Order Summary
- **Card Validation:**
  - Used regular expressions
- **API endpoint:**
  - Order Summary component used the `cart controller` to return all items in a cart and use data that would help with calculating Total or sales tax

## Components directory:

Components that are used throughout the app dynamically:

- Header
- Banner
- Product Section
- Product Card
- Cart
- AddToCart
- Footer
- Search

## Test directory:

- We only tested the front end and whether the items retrieved from the backend were correct
- Used **Jest** Library to test React components
