use OnlineStore;

DROP TABLE IF EXISTS Sale;
DROP TABLE IF EXISTS OrderItem;
DROP TABLE IF EXISTS [Order];
DROP TABLE IF EXISTS CartItem;
DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS Payment;
DROP TABLE IF EXISTS [Address];
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Category;

DROP PROCEDURE IF EXISTS AuthenticateUser;
DROP PROCEDURE IF EXISTS GetProduct;
DROP PROCEDURE IF EXISTS GetProductsWithCategory;
DROP PROCEDURE IF EXISTS GetOrderItem;
DROP PROCEDURE IF EXISTS GetCategory;
DROP PROCEDURE IF EXISTS GetAddress;
DROP PROCEDURE IF EXISTS GetPayment;
DROP PROCEDURE IF EXISTS GetUser;
DROP PROCEDURE IF EXISTS GetCart;
DROP PROCEDURE IF EXISTS GetCartItem;
DROP PROCEDURE IF EXISTS GetOrder;
DROP PROCEDURE IF EXISTS GetSale;
DROP PROCEDURE IF EXISTS GetOrderItem;
DROP PROCEDURE IF EXISTS GetUserCart;
DROP PROCEDURE IF EXISTS GetImagesOfProduct;

CREATE TABLE Category
(
	categoryId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	name VARCHAR(100) NOT NULL
);

CREATE TABLE Product
(
    productId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	categoryId INT FOREIGN KEY REFERENCES Categories (categoryId), --allowed to be null for now
    name VARCHAR(100) NOT NULL,
    unitPrice MONEY NOT NULL,
	manufacturer VARCHAR(MAX) NOT NULL,--Review data type
	description VARCHAR(MAX), --would include dimensions if we still want that; nullable for basic items?
	--  can display size and color on front end and only update this field in ItemsInCart when a user selects one option
	rating DECIMAL(2,1), --allow nullable to distinguish between a product with a 0 rating a product that has no reviews yet
	sku VARCHAR(15) NOT NULL
);

-- CREATE TABLE Images
-- (
-- 	imageId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
-- 	productId INT FOREIGN KEY REFERENCES Products (productId) NOT NULL,
-- 	imageLink VARCHAR(MAX) NOT NULL
-- );

CREATE TABLE [Address]
(
	addressId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	street VARCHAR(100) NOT NULL,
	city VARCHAR(50) NOT NULL,
	state VARCHAR(50) NOT NULL,
	zip VARCHAR(15) NOT NULL,
	country VARCHAR(50) NOT NULL,
);

CREATE TABLE Payment
(
	paymentId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	billingAddressId INT FOREIGN KEY REFERENCES Addresses (addressId) NOT NULL, -- if it DNE, create an address
	cardNumber VARCHAR(16) NOT NULL,
	nameOnCard VARCHAR(50) NOT NULL,
	expirationMonth VARCHAR(2) NOT NULL,
	expirationYear VARCHAR(4) NOT NULL,
	cvv VARCHAR(4) NOT NULL
	-- cardType? or could this info just be provided when filling out the form
);

CREATE TABLE [User]
( 
	UserId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	AddressId INT FOREIGN KEY REFERENCES Addresses (addressId) NOT NULL,
	FirstName VARCHAR(100) NOT NULL,
	LastName VARCHAR(100) NOT NULL,
	Email VARCHAR(255) UNIQUE NOT NULL,
	Password_ VARCHAR(MAX) NOT NULL
);

CREATE TABLE Cart
(
	cartId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	userId INT FOREIGN KEY REFERENCES [User] (userId) NOT NULL,
);

CREATE TABLE CartItem
(
	cartItemId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	productId INT FOREIGN KEY REFERENCES Products (productId) NOT NULL, 
	cartId INT FOREIGN KEY REFERENCES Carts (cartId) NOT NULL,
	quantity INT NOT NULL,
	size VARCHAR(20), --to allow for shoe sizes, pant sizes as ints, or letters like XS, S, XXL, etc. nullable if we sell accessories
	color VARCHAR(100) NOT NULL,
);

--updpate what fields we need for this table
CREATE TABLE [Order]
(
    orderId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    userId INT FOREIGN KEY REFERENCES [User] (userId) NOT NULL,
	paymentId INT FOREIGN KEY REFERENCES Payments (paymentId) NOT NULL,
	shippingAddressId INT FOREIGN KEY REFERENCES Addresses (addressId) NOT NULL,
	orderNumber VARCHAR(20) UNIQUE NOT NULL,
	orderDate DATE NOT NULL
);

--updpate what fields we need for this table
CREATE TABLE OrderItem
(
    orderItemId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    orderId INT FOREIGN KEY REFERENCES Orders (orderId) NOT NULL,
    cartItemId INT FOREIGN KEY REFERENCES CartItems (cartItemId) NOT NULL,
);

CREATE TABLE Sale
(
	saleId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	startDate VARCHAR(10) NOT NULL,
	endDate VARCHAR(10) NOT NULL,
	-- if implementing Sales, we would need to establish a discount type.
	-- amount off certain products, amount off certain categories, and an amount off the entire cart
	-- would also need to establish the format of the discount; is the amount diccounted a certain dollar amount? or will it be a percentage (provided as a decimal) where we need to do math with whichever discount type it is above?
	-- discount ,
	promoCode VARCHAR(50) NOT NULL,
	saleName VARCHAR(100) NOT NULL
);

INSERT INTO Category (name)
VALUES ('Top'),
	   ('Bottom'),
	   ('Outterwear'),
	   ('Shoes');

INSERT INTO Product (categoryId, name, unitPrice, manufacturer, description, rating, sku, imageLink)
VALUES (3, 'Homme Graphic Jogger', 21.00, 'manufacturer 1', 'description 1', 4.6, '123456','https://i1.adis.ws/i/boohooamplience/bmm60817_black_xl/black-elastic-waist-multi-cargo-pocket-slim-fit-jogger?$product_page_main_magic_zoom$'),
	   (4, 'Corduroy Patchwork Long Sleeve Shirts', 26.00, 'manufacturer 3', 'description 3', 4.5, '234234','https://images.urbndata.com/is/image/UrbanOutfitters/84174168_045_d?$redesign-zoom-5x$'),
	   (1, 'Men''s Nike Air Max 90 Casual Shoes', 130.00, 'manufacturer 8', 'description 8', 4.8, '234245','https://www.hoooyi.com/cdn/shop/products/ia_3900002369_900x.jpg?v=1697704511'),
	   (2, 'Gold Strapped Point Toe Heels', 48.00, 'manufacturer 9', 'description 9', 4.5, '234225','https://m.media-amazon.com/images/I/81VAeMiKP5L._AC_SY679_.jpg');


INSERT INTO [Address] (street, city, state, zip, country)
VALUES ('11 Mallard Park', 'Sacramento', 'California', 94245, 'United States'),
	   ('4 Shelley Circle', 'Fort Smith', 'Arkansas', 72905, 'United States'),
	   ('12 Talisman Street', 'Houston', 'Texas', 77281, 'United States'),
	   ('407 Cordelia Court', 'Jersey City', 'New Jersey', 07310, 'United States'),
	   ('8197 Gateway Avenue', 'Rochester', 'New York', 14652, 'United States'),
	   ('84624 Ridge Oak Junction', 'Fresno', 'California', 93762, 'United States'),
	   ('95600 Cascade Trail', 'Wichita', 'Kansas', 67220, 'United States'),
	   ('3020 Loomis Crossing', 'Phoenix', 'Arizona', 85072, 'United States'),
	   ('148 Schurz Avenue', 'Kansas City', 'Missouri', 64160, 'United States'),
	   ('1269 Dapin Pass', 'Indianapolis', 'Indiana', 46226, 'United States');

INSERT INTO Payment (billingAddressId, cardNumber, nameOnCard, expirationMonth, expirationYear, cvv)
VALUES (1, '4485794962663379', 'John Doe', '12', '2025', '222'),
	   (3, '4711337525456523', 'Anthony Rodriguez', '06', '2026', '853'),
	   (5, '6011842756634622', 'Tania Maly', '05', '2025', '397'),
	   (8, '5113284873757126', 'Angelica Ramirez', '12', '2023', '402'),
	   (9, '3724138446734898', 'Nya Cham', '10', '2027', '4511'),
	   (10, '5327781364121257', 'Harrison Steele', '02', '2024', '618');

INSERT INTO [User] (addressId, firstName, lastName, email, password_)
VALUES (1, 'John', 'Doe', 'johndoe217@email.com', 'P@ssw0rd143'),
	   (2, 'Jane', 'Doe', 'doughjane143@email.com', 'j4n3!D0ugH'),
       (3, 'Anthony', 'Rodriguez', 'ant_rodriguez@email.com', 'yullN3vIrg_ue55'),
       (4, 'Justine', 'Phan', 'justine.phan@email.com', '$0meth!nGssecur?3'),
       (5, 'Lexis', 'Maly', 'lmalyyy@email.com', 'an0th4%juAn'),
	   (6, 'Charlie', 'Zeta','charlieee@email.com', 'an0th4%on3');

INSERT INTO Cart (userId)
VALUES (1),
	   (2),
	   (3),
	   (4),
	   (5),
	   (6);

INSERT INTO CartItem (cartId, productId, quantity, size, color)
VALUES (1, 2, 1, '6', 'Grey'),
	   (1, 8, 1, '11.5','White/Anthracite/Pure Platinum/Spring Green'),
	   (1, 8, 1, '11.5', 'Photon Dust/Photon Dust/Light Iron Ore/Sail'),
	   (1, 7, 1, '8', 'Black'),
	   (3, 6, 1, 'M', 'Olive'),
	   (3, 6, 1, 'M', 'Coral'),
	   (3, 1, 1, 'L', 'Grey' ),
	   (3, 9, 1, '7', 'Gold'),
	   (3, 4, 1, 'M', 'Black'),
	   (3, 13, 2, NULL, 'Green/Purple'),
	   (5, 10, 2, 'XL', 'Black'),
	   (6, 11, 1, 'S', 'Red'),
	   (6, 3, 1, 'L', 'Navy/Brown');

INSERT INTO [Order] (userId, paymentId, shippingAddressId, orderNumber, orderDate)
VALUES (1, 1, 7, 'ORD724806','2023-09-10'),
	   (3, 2, 3, 'ORD806664','2023-06-22'),
	   (5, 3, 5, 'ORD115687', '2023-11-11');

INSERT INTO OrderItem (orderId, cartItemId)
VALUES (1, 1),
	   (1, 2),
	   (1, 3),
	   (1, 4),
	   (2, 5),
	   (2, 6),
	   (2, 7),
	   (2, 8),
	   (2, 9),
	   (2, 10),
	   (3, 11); 

INSERT INTO Sale (startDate, endDate, promoCode, saleName)
VALUES ('2023-11-27', '2023-11-28', 'cyber23', 'Cyber Monday'),
	   ('2023-12-18', '2023-12-24', 'jolly30', 'Holiday Sale'),
	   ('2023-12-31', '2024-01-01', 'NYE24!', 'New Year Sale');
GO



-- *** STORED PROCEDURES ******
--   * to make viewing information easier; can create more as we see fit
--	 * (some of these may not be needed)
CREATE PROCEDURE GetProduct
    AS
    BEGIN
        SELECT * FROM Product
    END
GO

--Gets the Product details along with Category it's associated with
CREATE PROCEDURE GetProductsWithCategory
	AS
	BEGIN
		SELECT p.*, c.name AS categoryName
		FROM Product p
		INNER JOIN Category c ON p.categoryId = c.categoryId;
	END
GO


CREATE PROCEDURE GetCategory
    AS
    BEGIN
        SELECT * FROM Category
    END
GO

-- CREATE PROCEDURE GetImages
--     AS
--     BEGIN
--         SELECT * FROM Images
--     END
-- GO


CREATE PROCEDURE GetAddress
    AS
    BEGIN
        SELECT * FROM [Address]
    END
GO


CREATE PROCEDURE GetPayment
    AS
    BEGIN
        SELECT * FROM Payment
    END
GO


CREATE PROCEDURE GetUser
    AS
    BEGIN
        SELECT * FROM [User]
    END
GO


CREATE PROCEDURE GetCart
    AS
    BEGIN
        SELECT * FROM Cart
    END
GO


CREATE PROCEDURE GetCartItem
    AS
    BEGIN
        SELECT * FROM CartItem
    END
GO


CREATE PROCEDURE GetOrder
    AS
    BEGIN
        SELECT * FROM [Order]
    END
GO


CREATE PROCEDURE GetSale
    AS
    BEGIN
        SELECT * FROM Sale
    END
GO

-- Example of Calling it:
--EXEC GetOrderItems 1;
CREATE PROCEDURE GetOrderItem @orderId INT
	AS
	BEGIN
		SELECT oi.orderItemId, p.name AS productName, ci.quantity
		FROM OrderItem oi
		INNER JOIN CartItem ci ON oi.cartItemId = ci.cartItemId
		INNER JOIN Product p ON ci.productId = p.productId
		WHERE oi.orderId = @orderId;
	END
Go


CREATE PROCEDURE GetUserCart @userId INT
	AS
	BEGIN
		SELECT ci.cartItemId, p.name AS productName, ci.quantity, ci.size, ci.color
		FROM CartItem ci
		INNER JOIN Product p ON ci.productId = p.productId
		WHERE ci.cartId = (SELECT cartId FROM Cart WHERE userId = @userId);
	END
Go

-- Example of Calling it:
--EXEC GetImagesOfProduct 1;
-- CREATE PROCEDURE GetImagesOfProduct @productId INT
-- 	AS
-- 	BEGIN
-- 		SELECT * FROM Image
-- 		WHERE productId = @productId;
-- 	END
-- GO



CREATE PROCEDURE AuthenticateUser @Email VARCHAR(255), @Password_ VARCHAR(255)
	AS
	BEGIN
		SELECT u.UserId, u.Email, u.Password_
		FROM [User] u
        where u.Email = @Email and u.Password_ = @Password_;
	END
Go

select * from [User];

-- Use this to check whether a stored procedure is working
-- EXECUTE AuthenticateUser "johndoe217@email.com", "P@ssw0rd143";