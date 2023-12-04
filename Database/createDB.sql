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
DROP PROCEDURE IF EXISTS GetCartItemsForUser;
DROP PROCEDURE IF EXISTS AddProductToCart;
DROP PROCEDURE IF EXISTS GetProductById;
DROP PROCEDURE IF EXISTS RemoveProductFromCart;
DROP PROCEDURE IF EXISTS UpdateCartItemQuantity;

CREATE TABLE Category
(
	categoryId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	name VARCHAR(100) NOT NULL
);

CREATE TABLE Product
(
    productId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	categoryId INT FOREIGN KEY REFERENCES Category (categoryId), --allowed to be null for now
    productName VARCHAR(100) NOT NULL,
    unitPrice MONEY NOT NULL,
	manufacturer VARCHAR(MAX) NOT NULL,--Review data type
	description VARCHAR(MAX), --would include dimensions if we still want that; nullable for basic items?
	--  can display size and color on front end and only update this field in ItemsInCart when a user selects one option
	rating DECIMAL(2,1), --allow nullable to distinguish between a product with a 0 rating a product that has no reviews yet
	sku VARCHAR(15) NOT NULL,
    imageLink VARCHAR(MAX) NOT NULL
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
	country VARCHAR(50) NOT NULL
);

CREATE TABLE Payment
(
	paymentId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	billingAddressId INT FOREIGN KEY REFERENCES [Address] (addressId) NOT NULL, -- if it DNE, create an address
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
	AddressId INT FOREIGN KEY REFERENCES [Address] (addressId) NOT NULL,
	FirstName VARCHAR(100) NOT NULL,
	LastName VARCHAR(100) NOT NULL,
	Email VARCHAR(255) UNIQUE NOT NULL,
	Password_ VARCHAR(MAX) NOT NULL
);

CREATE TABLE Cart
(
	cartId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	userId INT FOREIGN KEY REFERENCES [User] (userId) NOT NULL
);

CREATE TABLE CartItem
(
	cartItemId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	productId INT FOREIGN KEY REFERENCES Product (productId) NOT NULL, 
	cartId INT FOREIGN KEY REFERENCES Cart (cartId) NOT NULL,
	quantity INT
);

--updpate what fields we need for this table
CREATE TABLE [Order]
(
    orderId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    userId INT FOREIGN KEY REFERENCES [User] (userId) NOT NULL,
	paymentId INT FOREIGN KEY REFERENCES Payment (paymentId) NOT NULL,
	shippingAddressId INT FOREIGN KEY REFERENCES [Address] (addressId) NOT NULL,
	orderNumber VARCHAR(20) UNIQUE NOT NULL,
	orderDate DATE NOT NULL
);

--updpate what fields we need for this table
CREATE TABLE OrderItem
(
    orderItemId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    orderId INT FOREIGN KEY REFERENCES [Order] (orderId) NOT NULL,
    cartItemId INT FOREIGN KEY REFERENCES CartItem (cartItemId) NOT NULL,
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
	   ('Outerwear'),
	   ('Shoes');

INSERT INTO Product (categoryId, productName, unitPrice, manufacturer, description, rating, sku, imageLink)
VALUES (2, 'Homme Graphic Jogger', 21.00, 'manufacturer 1', 'description 1', 4.6, '123456','Homme Graphic Jogger.jpeg'),
       (1, 'Corduroy Patchwork Long Sleeve Shirts', 26.00, 'manufacturer 3', 'description 3', 4.5, '234234','Corduroy Patchwork Long Sleeve Shirts.webp'),
       (4, 'Men''s Nike Air Max 90 Casual Shoes', 130.00, 'manufacturer 8', 'description 8', 4.8, '234245','Mens Nike Air Max 90 Casual Shoes.jpeg'),
       (3, 'Women''s Grey Full Zip Jacket', 60.00, 'manufacturer 9', 'description 9', 4.5, '234225','Womens Grey Full Zip Jacket.jpg'),
       (1, 'Half Button Drop Shoulder Tee',13.99,'manufacturer DI','description 124',4.9,'129389','shoulder-tee.png'),
       (1,'Long Sleeve Knit Top',46.00,'manufacturer 39','description 23',4.8,'123987','longsleeve-knittop.png'),
       (1,'Ribbed Front Cutout Knitwear',26.00,'manufacturer 32','description 13',3.8,'283729','cutout-knitwear.png'),
       (4,'Platform HighHeeled Ankle Boots',46.29,'manu 3','description 98',4.7,'109389','boots.png'),
       (4,'Comat Boots', 29.23,'manufacturer 4','description 293',4.9,'198222','combat-boots.png'),
       (4,'Brown Preppy Style Color Block Sneakers',22.80,'manufacturer 32','description 17',4.9,'120274','block-sneakers.png'),
       (4,'Jumpman MPV Shoes',165.00,'manufacturer Jordan','description 23',5.0,'','jordans.png'),
       (3,'Car Coat',418.00,'manufacturer 2','description28',4.9,'129811','car-cote.jpeg'),
       (3,'Harris Jacket',168.00,'manufacturer 23','description 37',4.1,'293819','harris-jacket.png'),
       (3,'Raincoat Hoodie Jacket',35.99,'manufacturer 12','description 29',3.9,'120654','raincoat-hoodie.png'),
       (3,'Hooded Puffer Jacket',147.00,'manufacturer 12','description 14',4.9,'127654','hooded-puffer-jacket.png'),
       (3,'Tailored Long Coat',120,'manufacturer 25','description 16',4.9,'2765782','tailored-long.png'),
       (3,'Puffer Jacket',185.00,'manufacturer 25','description 17',4.5,'','puffer-jacket.png'),
       (3, 'Brown Fleece Hoodie',39.00,'manufacturer 24','description 18',4.1,'589263','fleece-hoodie.png'),
       (2, 'Multi Cargo Slim Fit Joggers', 42.45, 'manufacturer 2','description 32', 4.2, '328933','cargo-pants.png'),
       (2, 'HighWaste Straight Leg Denim Jeans', 40.23, 'manu 4', 'description 13', 4.8, '238941', 'denim.jpg'),
       (2, 'Womans Pinstripe Trousers', 19.99, 'manu 2', 'description 232', 4.2, '190472', 'pin-stripe-trousers.png'),
       (2, 'High Waisted Plicated Side Pocket Wide Leg Waffle Casual Pants',29.95,'manu 4','description 21',4.1,'098901','widelegwafflepants.png'),
       (1,'Crew Neck T-Shirt',14.00,'manufacturer 3','description 42',4.9,'929999','crew-neck.png'),
          (4,'Gladiator Point Toe Heels',28.00,'manufacturer 100','description 32',3.9,'938729','gold-heels.png'),
       (2,'Pleated Midi Skirt',60.00,'manufacturer 392','description sendit',4.8,'120411','pleated-midi-skirt.png');

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

INSERT INTO [User] (AddressId, FirstName, LastName, Email, Password_)
VALUES (1, 'John', 'Doe', 'johndoe217@email.com', 'P@ssw0rd143'),
	   (2, 'Jane', 'Doe', 'doughjane143@email.com', 'j4n3!D0ugH'),
       (3, 'Anthony', 'Rodriguez', 'ant_rodriguez@email.com', 'yullN3vIrg_ue55'),
       (4, 'Justine', 'Phan', 'justine.phan@email.com', '$0meth!nGssecur?3'),
       (5, 'Lexis', 'Maly', 'lmalyyy@email.com', 'an0th4%juAn'),
	   (6, 'Charlie', 'Zeta','charlieee@email.com', 'an0th4%on3');

INSERT INTO Cart (UserId)
VALUES (1),
	   (2),
	   (3),
	   (4),
	   (5),
	   (6);

-- INSERT INTO CartItem (cartId, productId, quantity)
-- VALUES (1, 2, 1),	   
-- 	   (3, 1, 1),
-- 	   (3, 4, 1),
-- 	   (6, 3, 2);

INSERT INTO [Order] (UserId, paymentId, shippingAddressId, orderNumber, orderDate)
VALUES (1, 1, 7, 'ORD724806','2023-09-10'),
	   (3, 2, 3, 'ORD806664','2023-06-22'),
	   (5, 3, 5, 'ORD115687', '2023-11-11');

-- INSERT INTO OrderItem (orderId, cartItemId)
-- VALUES (1, 1),
-- 	   (1, 2),
-- 	   (1, 3),
-- 	   (1, 4);
    
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
    SELECT ProductId, CategoryId, ProductName, UnitPrice, Manufacturer, Description, Rating, SKU, imageLink
    FROM Product;
END
GO

EXECUTE GetProduct;
GO

--Gets the Product by Id
CREATE PROCEDURE GetProductById @productId INT
AS
BEGIN
    SELECT ProductId, CategoryId, ProductName, UnitPrice, Manufacturer, Description, Rating, SKU, imageLink
    FROM Product
    WHERE productId = @productId;
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
		SELECT oi.orderItemId, p.productName AS productName, ci.quantity
		FROM OrderItem oi
		INNER JOIN CartItem ci ON oi.cartItemId = ci.cartItemId
		INNER JOIN Product p ON ci.productId = p.productId
		WHERE oi.orderId = @orderId;
	END
Go

CREATE PROCEDURE GetCartItemsForUser
    @UserId INT
AS
BEGIN
    SELECT 
        ci.cartItemId, 
        ci.productId, 
        ci.quantity, 
        p.productName, 
        p.unitPrice, 
        p.manufacturer, 
        p.description, 
        p.rating, 
        p.sku, 
        p.imageLink
    FROM CartItem ci
    INNER JOIN Cart c ON ci.cartId = c.cartId
    INNER JOIN Product p ON ci.productId = p.productId
    WHERE c.userId = @UserId;
END
GO

EXECUTE GetCartItemsForUser @UserId = 1;


-- Example of Calling it:
--EXEC GetImagesOfProduct 1;
-- CREATE PROCEDURE GetImagesOfProduct @productId INT
-- 	AS
-- 	BEGIN
-- 		SELECT * FROM Image
-- 		WHERE productId = @productId;
-- 	END
-- GO


GO
CREATE PROCEDURE AuthenticateUser @Email VARCHAR(255), @Password_ VARCHAR(255)
	AS
	BEGIN
		SELECT u.UserId, u.Email, u.Password_
		FROM [User] u
        where u.Email = @Email and u.Password_ = @Password_;
	END
Go

CREATE PROCEDURE AddProductToCart
    @UserId INT,
    @ProductId INT
AS
BEGIN
    DECLARE @CartId INT;
    DECLARE @ExistingQuantity INT;

    -- Check if cart exists for the user
    SELECT @CartId = cartId FROM Cart WHERE userId = @UserId;

    -- If no cart exists, create one
    IF @CartId IS NULL
    BEGIN
        INSERT INTO Cart (userId) VALUES (@UserId);
        SET @CartId = SCOPE_IDENTITY();
    END

    -- Check if product already exists in cart
    SELECT @ExistingQuantity = quantity FROM CartItem 
    WHERE cartId = @CartId AND productId = @ProductId;

    IF @ExistingQuantity IS NULL
    BEGIN
        -- Product does not exist in cart, insert new cart item
        INSERT INTO CartItem (cartId, productId, quantity) 
        VALUES (@CartId, @ProductId, 1);
    END
    ELSE
    BEGIN
        -- Product exists, update quantity
        UPDATE CartItem
        SET quantity = @ExistingQuantity + 1
        WHERE cartId = @CartId AND productId = @ProductId;
    END
END
GO

CREATE PROCEDURE RemoveProductFromCart
    @cartItemId INT
AS
BEGIN
    DELETE FROM CartItem WHERE cartItemId = @cartItemId;

GO

CREATE PROCEDURE UpdateCartItemQuantity
    @CartItemId INT,
    @NewQuantity INT
AS
BEGIN
    -- Check if the cart item exists
    IF EXISTS (SELECT 1 FROM CartItem WHERE cartItemId = @CartItemId)
    BEGIN
        -- Update the quantity of the cart item
        UPDATE CartItem
        SET quantity = @NewQuantity
        WHERE cartItemId = @CartItemId;
    END
END
GO


select * from [User];
select * from CartItem
-- Use this to check whether a stored procedure is working
-- EXECUTE AuthenticateUser "johndoe217@email.com", "P@ssw0rd143";
