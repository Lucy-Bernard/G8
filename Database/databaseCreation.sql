USE OnlineStore;

DROP TABLE IF EXISTS Sale;
DROP TABLE IF EXISTS OrderItem;
DROP TABLE IF EXISTS Order;
DROP TABLE IF EXISTS CartItem;
DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Payment;
DROP TABLE IF EXISTS Address;
DROP TABLE IF EXISTS Image;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Category;

DROP PROCEDURE IF EXISTS GetProduct;
DROP PROCEDURE IF EXISTS GetProductWithCategory;
DROP PROCEDURE IF EXISTS GetOrderItem;
DROP PROCEDURE IF EXISTS GetCategory;
DROP PROCEDURE IF EXISTS GetImage;
DROP PROCEDURE IF EXISTS GetAddress;
DROP PROCEDURE IF EXISTS GetPayment;
DROP PROCEDURE IF EXISTS GetUser;
DROP PROCEDURE IF EXISTS GetCart;
DROP PROCEDURE IF EXISTS GetCartItem;
DROP PROCEDURE IF EXISTS GetOrder;
DROP PROCEDURE IF EXISTS GetSale;
DROP PROCEDURE IF EXISTS GetOrderItem;
DROP PROCEDURE IF EXISTS GetUserCart;
DROP PROCEDURE IF EXISTS GetImageOfProduct;

CREATE TABLE Category
(
	categoryId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	name VARCHAR(100) NOT NULL
);

CREATE TABLE Product
(
    productId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	categoryId INT FOREIGN KEY REFERENCES Category (categoryId), --allowed to be null for now
    name VARCHAR(100) NOT NULL,
    unitPrice MONEY NOT NULL,
	manufacturer VARCHAR(MAX) NOT NULL,--Review data type
	description VARCHAR(MAX), --would include dimensions if we still want that; nullable for basic items?
	--  can display size and color on front end and only update this field in ItemsInCart when a user selects one option
	rating DECIMAL(2,1), --allow nullable to distinguish between a product with a 0 rating a product that has no reviews yet
	sku VARCHAR(15) NOT NULL
	imageId INT FOREIGN KEY REFERENCES Image (imageId),
);

CREATE TABLE Image
(
	imageId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	productId INT FOREIGN KEY REFERENCES Products (productId) NOT NULL,
	imageLink VARCHAR(MAX) NOT NULL
);

CREATE TABLE Address
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
	billingAddressId INT FOREIGN KEY REFERENCES Address (addressId) NOT NULL, -- if it DNE, create an address
	cardNumber VARCHAR(16) NOT NULL,
	nameOnCard VARCHAR(50) NOT NULL,
	expirationMonth VARCHAR(2) NOT NULL,
	expirationYear VARCHAR(4) NOT NULL,
	cvv VARCHAR(4) NOT NULL
	-- cardType? or could this info just be provided when filling out the form
);

CREATE TABLE User
( 
	userId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	addressId INT FOREIGN KEY REFERENCES Address (addressId) NOT NULL,
	firstName VARCHAR(100) NOT NULL,
	lastName VARCHAR(100) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(MAX) NOT NULL,
	phoneNumber VARCHAR(20), --nullable
	--paymentId? nullable; would allow users to save payment info?
);

CREATE TABLE Cart
(
	cartId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	userId INT FOREIGN KEY REFERENCES User (userId) NOT NULL,
);

CREATE TABLE CartItem
(
	cartItemId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
	productId INT FOREIGN KEY REFERENCES Product (productId) NOT NULL, 
	cartId INT FOREIGN KEY REFERENCES Cart (cartId) NOT NULL,
	quantity INT NOT NULL,
	size VARCHAR(20), --to allow for shoe sizes, pant sizes as ints, or letters like XS, S, XXL, etc. nullable if we sell accessories
	color VARCHAR(100) NOT NULL,
);

--updpate what fields we need for this table
CREATE TABLE Order
(
    orderId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    userId INT FOREIGN KEY REFERENCES User (userId) NOT NULL,
	paymentId INT FOREIGN KEY REFERENCES Payment (paymentId) NOT NULL,
	shippingAddressId INT FOREIGN KEY REFERENCES Address (addressId) NOT NULL,
	orderNumber VARCHAR(20) UNIQUE NOT NULL,
	orderDate DATE NOT NULL
);

--updpate what fields we need for this table
CREATE TABLE OrderItem
(
    orderItemId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    orderId INT FOREIGN KEY REFERENCES Order (orderId) NOT NULL,
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

INSERT INTO CategorY (name)
VALUES ('Shoes'),
	   ('Dresses'),
	   ('Pants'),
	   ('Tops');

INSERT INTO Product (categoryId, name, unitPrice, manufacturer, description, rating, sku, imageId)
VALUES (3, 'Homme Graphic Jogger', 21.00, 'manufacturer 1', 'description 1', 4.6, '', 1),
	   (1, 'Puma Slipstream Low Textured Sneaker', 100.00, 'manufacturer 2', 'description 2', NULL, '', 1),
	   (4, 'Corduroy Patchwork Long Sleeve Shirts', 26.00, 'manufacturer 3', 'description 3', 4.5, '', 2),
	   (3, 'Multi Cargo Pocket Jogger', 39.99, 'manufacturer 4', 'description 4', 4.1, '', 2),
	   (2, 'Plus Black Velvet Side Split Midi Dress', 35.00, 'manufacturer 5', 'description 5', 4.8, '', 3),
	   (2, 'Sleeveless Ribbed Knit Bodycon Mini Dress', 20.99, 'manufacturer 6', 'description 6', 3.8, '', 3),
	   (1, 'Black Matte Platform Boots', 43.00, 'manufacturer 7', 'description 7', 4.7, '', 4),
	   (1, 'Men''s Nike Air Max 90 Casual Shoes', 130.00, 'manufacturer 8', 'description 8', 4.8, '', 5),
	   (2, 'Gold Strapped Point Toe Heels', 48.00, 'manufacturer 9', 'description 9', 4.5, '', 4),
	   (4, 'Y2k Rhinestone Cropped Cami', 19.99, 'manufacturer 10', 'description 10', 4.3, '', 6),
	   (NULL, '3-Piece Bodycon Mini Skirt Set', 37.99, 'manufacturer 11', 'description 11', 3.6, '', 7),
	   (3, 'High Wasit Straight Leg Distressed Jeans', 48.99, 'manufacturer 12', 'description 12', 4.3, '', 6),
	   (NULL, 'Polarized Sports Sunglasses', 39.99, 'manufacturer 13', 'description 13', 4.7, '', 9);

--https://www.boohooman.com/us/homme-graphic-jogger/BMM57597.html?color=265
INSERT INTO Image (productId, imageLink)
VALUES (1, 'https://i1.adis.ws/i/boohooamplience/bmm57597_grey%20marl_xl/grey-marl-homme-graphic-jogger?$product_page_main_magic_zoom$'),
	   (1, 'https://i1.adis.ws/i/boohooamplience/bmm57597_grey%20marl_xl_2/grey-marl-homme-graphic-jogger?$product_page_main_magic_zoom$'),
	   --https://www.urbanoutfitters.com/shop/puma-slipstream-low-textured-sneaker?category=mens-clothing&color=045&type=REGULAR&quantity=1
	   (2, 'https://images.urbndata.com/is/image/UrbanOutfitters/84174168_045_b?$redesign-zoom-5x$'),
	   (2, 'https://images.urbndata.com/is/image/UrbanOutfitters/84174168_045_f?$redesign-zoom-5x$'),
	   (2, 'https://images.urbndata.com/is/image/UrbanOutfitters/84174168_045_d?$redesign-zoom-5x$'),
	   --https://www.hoooyi.com/products/corduroy-patchwork-long-sleeve-shirts?variant=40351043944627
	   (3, 'https://www.hoooyi.com/cdn/shop/products/ia_3900002369_900x.jpg?v=1697704511'),
	   (3, 'https://www.hoooyi.com/cdn/shop/products/ia_3900002372_900x.jpg?v=1628690280'),
	   (3, 'https://www.hoooyi.com/cdn/shop/products/ia_3900002367_900x.jpg?v=1628690279'),
	   --https://www.boohooman.com/us/elastic-waist-multi-cargo-pocket-slim-fit-jogger/BMM60817.html?color=105
	   (4, 'https://i1.adis.ws/i/boohooamplience/bmm60817_black_xl/black-elastic-waist-multi-cargo-pocket-slim-fit-jogger?$product_page_main_magic_zoom$'),
	   (4, 'https://i1.adis.ws/i/boohooamplience/bmm60817_black_xl_2/black-elastic-waist-multi-cargo-pocket-slim-fit-jogger?$product_page_main_magic_zoom$'),
	   --https://www.prettylittlething.us/plus-black-velvet-side-split-midi-dress.html
	   (5, 'https://cdn-img.prettylittlething.com/b/e/7/3/be73ab81c14e073b6965a77c6a5d14bbd99fbde4_cng7066_5.jpg?imwidth=1024'),
	   --https://www.amazon.com/Floerns-Womens-Solid-Spaghetti-Bodycon/dp/B08DCSFFHD/ref=sr_1_156_sspa?crid=3T05ZCM93RCDE&keywords=womens%2Bdresses%2B2023&qid=1699851760&sprefix=womens%2Bdresses%2B2023%2Caps%2C128&sr=8-156-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&th=1&psc=1
	   (6, 'https://m.media-amazon.com/images/I/71tQSGftvLL._AC_SY550_.jpg'),
	   (6, 'https://m.media-amazon.com/images/I/71XyqSpB+mL._AC_SY550_.jpg'),
	   (6, 'https://m.media-amazon.com/images/I/81kSH7gmZlL._AC_SY550_.jpg'),
	   --coral colored version
	   (6, 'https://m.media-amazon.com/images/I/61sr4MtWkQL._AC_SY550_.jpg'),
	   (6, 'https://m.media-amazon.com/images/I/81++MNsyBZL._AC_SY550_.jpg'),
	   (6, 'https://m.media-amazon.com/images/I/711IzqsfGTL._AC_SY550_.jpg'),
	   --https://www.prettylittlething.us/black-matte-pu-square-toe-platform-high-block-heeled-ankle-boots.html
	   (7, 'https://cdn-img.prettylittlething.com/a/d/8/c/ad8c9bff4fa402c7d59fedea3d607955d79cda73_cna2410_2.jpg?imwidth=1024'),
	   (7, 'https://cdn-img.prettylittlething.com/2/a/0/7/2a07dec0db818e86f990bd753d902668d6710db4_cna2410_3.jpg?imwidth=1024'),
	   --https://www.jdsports.com/store/browse/productDetail.jsp?productId=prod772616&brand_name=NIKE&styleId=DZ3522&colorId=003&gclid=Cj0KCQiAjMKqBhCgARIsAPDgWlwMQlwePjGdpezPNzfnDfwuwvfyic6Qc7pPiprP9bcBpr7Qoxy5fiAaAudaEALw_wcB&gclsrc=aw.ds#
	   (8, 'https://media.jdsports.com/i/jdsports/DZ3522_003_P1?$default$&w=1000&h=1000&bg=rgb(237,237,237)'),
	   (8, 'https://media.jdsports.com/i/jdsports/DZ3522_003_P2?$default$&w=1000&h=1000&bg=rgb(237,237,237)'),
	   (8, 'https://media.jdsports.com/i/jdsports/DZ3522_003_P4?$default$&w=1000&h=1000&bg=rgb(237,237,237)'),
	   --mint color
	   (8, 'https://media.jdsports.com/i/jdsports/DM0029_104_P1?h=3000&w=3000'),
	   (8, 'https://media.jdsports.com/i/jdsports/DM0029_104_P2?h=3000&w=3000'),
	   (8, 'https://media.jdsports.com/i/jdsports/DM0029_104_P4?$default$&w=1000&h=1000&bg=rgb(237,237,237)'),
	   --https://www.prettylittlething.us/gold-metallic-strappy-gladiator-point-toe-heels.html
	   (9, 'https://cdn-img.prettylittlething.com/1/1/f/e/11fe8320c6f9864aa2ed9b74189c3fdcbac4eaa1_cmz9398_3.jpg?imwidth=1024'),
	   (9, 'https://cdn-img.prettylittlething.com/1/f/7/c/1f7c5a1866e1fa788e54a39b67fc363bebfae35d_cmz9398_4.jpg?imwidth=1024'),
	   --https://www.amazon.com/SOLY-HUX-Sleeveless-Camisole-Rhinestone/dp/B0BVFQTZTP/ref=sr_1_5?crid=1X6N5XSEBINP3&keywords=womens%2Btops%2Bpretty%2By2k&qid=1699853828&sprefix=womens%2Btops%2Bpretty%2By2k%2Caps%2C151&sr=8-5&th=1
	   (10, 'https://m.media-amazon.com/images/I/61MzVgwSmhL._AC_SY679_.jpg'),
	   (10, 'https://m.media-amazon.com/images/I/91fuRC36YzL._AC_SY679_.jpg'),
	   (10, 'https://m.media-amazon.com/images/I/51TZANVONiL._AC_SY679_.jpg'),
	   --https://www.amazon.com/Verdusa-Womens-Shoulder-Drawstring-Bodycon/dp/B0CKMXXM9W/ref=sr_1_49?crid=17RC8J9JB6BD6&keywords=womens%2Bcute%2Bskirts&qid=1699854407&sprefix=womens%2Bcute%2Bskirt%2Caps%2C110&sr=8-49&th=1
	   (11, 'https://m.media-amazon.com/images/I/71GxMDTbuQL._AC_SY679_.jpg'),
	   (11, 'https://m.media-amazon.com/images/I/71RZGEccNbL._AC_SY679_.jpg'),
	   (11, 'https://m.media-amazon.com/images/I/91n9646nF9L._AC_SY679_.jpg'),
	   --https://www.amazon.com/Floerns-Womens-Straight-Ripped-Distressed/dp/B09JRZ7CHY/ref=sr_1_6?crid=2HBD4F5XDTJW6&keywords=womens+cute+jeans&qid=1699854517&sprefix=womens+cute+jeans%2Caps%2C117&sr=8-6
	   (12, 'https://m.media-amazon.com/images/I/71QLOccKqgL._AC_SY679_.jpg'),
	   (12, 'https://m.media-amazon.com/images/I/81VAeMiKP5L._AC_SY679_.jpg'),
	   --https://www.pitviper.com/products/the-leonardo-2000
	   (13, 'https://www.pitviper.com/cdn/shop/products/leonardo-new-nosepiece_0000_the-leonardo-2.0_P_1_x1080.jpg?v=1678381982'),
	   (13, 'https://www.pitviper.com/cdn/shop/products/leonardo-new-nosepiece_0003_the-leonardo-2.0_A_1_x1080.jpg?v=1678381982');

INSERT INTO Address (street, city, state, zip, country)
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

INSERT INTO User (addressId, firstName, lastName, email, password, phoneNumber)
VALUES (1, 'John', 'Doe', 'johndoe217@email.com', 'P@ssw0rd143', '(123) 456-7890'),
	   (2, 'Jane', 'Doe', 'doughjane143@email.com', 'j4n3!D0ugH', '2345678901'),
       (3, 'Anthony', 'Rodriguez', 'ant_rodriguez@email.com', 'yullN3vIrg_ue55', NULL),
       (4, 'Justine', 'Phan', 'justine.phan@email.com', '$0meth!nGssecur?3', '345-678-9012'),
       (5, 'Lexis', 'Maly', 'lmalyyy@email.com', 'an0th4%juAn', '(456)789-0123'),
	   (6, 'Charlie', 'Zeta', 'charlieee@email.com', 'an0th4%on3', '(456)789-0123');

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

INSERT INTO Order (userId, paymentId, shippingAddressId, orderNumber, orderDate)
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
CREATE PROCEDURE GetProductWithCategory
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

CREATE PROCEDURE GetImage
    AS
    BEGIN
        SELECT * FROM Image
    END
GO


CREATE PROCEDURE GetAddress
    AS
    BEGIN
        SELECT * FROM Address
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
        SELECT * FROM User
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
        SELECT * FROM Order
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
		WHERE ci.cartId = (SELECT cartId FROM Carts WHERE userId = @userId);
	END
Go

-- Example of Calling it:
--EXEC GetImagesOfProduct 1;
CREATE PROCEDURE GetImageOfProduct @productId INT
	AS
	BEGIN
		SELECT * FROM Image
		WHERE productId = @productId;
	END
GO