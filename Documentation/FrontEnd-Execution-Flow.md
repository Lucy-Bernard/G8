# Frontend Execution Flow Diagram

```mermaid
graph TD
    Start([User Visits Application]) --> RootLayout[Root Layout - layout.tsx<br/>UserProvider Context Wrapper]
    
    RootLayout --> LoginPage[Login Page - page.tsx<br/>Email & Password Input]
    
    LoginPage --> ValidateLogin{User Submits<br/>Login Form}
    ValidateLogin -->|POST /api/user| BackendAuth[Backend API Call]
    BackendAuth -->|Success| SetUserContext[Set User Context<br/>useUser hook]
    BackendAuth -->|Error| LoginError[Display Error]
    LoginError --> LoginPage
    
    SetUserContext --> Navigate[Navigate to /home]
    Navigate --> HomeLayout[Home Layout<br/>Header + NavigationBar]
    
    HomeLayout --> HomePage[Home Page - page.tsx<br/>useEffect fetches products]
    HomePage -->|GET /api/product| FetchProducts[Fetch All Products<br/>from Backend]
    FetchProducts -->|Success| FilterCategories[Filter Products by Category<br/>Tops, Bottoms, Outerwear, Shoes]
    FetchProducts -->|Error| ShowError[Display Error Message]
    
    FilterCategories --> DisplaySections[Display Product Sections<br/>ProductSection Components]
    DisplaySections --> ShowBanner[Show Banner Component]
    
    DisplaySections --> ProductCards[Render ProductCard<br/>for each product]
    
    %% User Interactions from Home
    ProductCards -->|Click Product| ProductDetails[Product Details Page<br/>productdetails/page.tsx]
    ProductDetails -->|GET /api/product/:id| FetchProductDetail[Fetch Single Product Details]
    FetchProductDetail --> ShowProductInfo[Display Product Info<br/>Name, Price, Rating, Description]
    ShowProductInfo --> AddToCartBtn[AddToCartButton Component]
    
    AddToCartBtn -->|Click Add to Cart| AddToCart{Add Product to Cart}
    AddToCart -->|POST /api/cart| AddCartAPI[Backend API Call<br/>with userId & productId]
    AddCartAPI -->|Success| CartSuccess[Show Success Message]
    AddCartAPI -->|Error| CartError[Show Error]
    
    %% Header Navigation
    HomeLayout -->|Click Cart Icon| CartPage[Cart Page - cart/page.tsx<br/>useEffect fetches cart items]
    CartPage -->|GET /api/cart/:userId| FetchCartItems[Fetch User's Cart Items]
    FetchCartItems -->|Success| DisplayCart[Display Cart Items<br/>with ProductCard]
    FetchCartItems -->|Error| CartFetchError[Display Error]
    
    DisplayCart --> CartActions{User Actions}
    CartActions -->|Increment Quantity| UpdateQtyInc[Update Quantity +1]
    CartActions -->|Decrement Quantity| UpdateQtyDec[Update Quantity -1]
    CartActions -->|Remove Item| RemoveItem[Remove from Cart]
    
    UpdateQtyInc -->|PUT /api/cart/:id/:qty| UpdateCartAPI[Backend API Call]
    UpdateQtyDec -->|PUT /api/cart/:id/:qty| UpdateCartAPI
    RemoveItem -->|DELETE /api/cart/:id| DeleteCartAPI[Backend API Call]
    
    UpdateCartAPI -->|Success| RefreshCart[Update Local Cart State]
    DeleteCartAPI -->|Success| RefreshCart
    
    RefreshCart --> RecalculateTotal[Recalculate Total Price]
    RecalculateTotal --> DisplayCart
    
    DisplayCart -->|Click Checkout| CheckoutPage[Proceed to Checkout]
    
    %% Search Functionality
    HomeLayout -->|Click Search Icon| SearchComponent[Search Component<br/>Search.tsx]
    SearchComponent -->|Component Mount| FetchAllProducts[Fetch All Products<br/>GET /api/product]
    FetchAllProducts --> StoreProducts[Store Products in State]
    
    SearchComponent -->|User Types| FilterProducts[Filter Products<br/>by Product Name]
    FilterProducts --> ShowResults[Display Search Results]
    ShowResults -->|Click Result| NavigateToProduct[Navigate to Product Details]
    NavigateToProduct --> ProductDetails
    
    %% User Profile Navigation
    HomeLayout -->|Click Profile Icon| UserProfile[User Profile Page<br/>userprofile/page.tsx]
    
    %% Navigation Bar
    HomeLayout -->|Click Category| CategoryPage[Category Page<br/>tops/bottoms/outerwear/shoes]
    CategoryPage -->|Fetch Category Products| DisplayCategoryProducts[Display Products for Category]
    
    style Start fill:#e1f5ff
    style LoginPage fill:#fff4e1
    style HomePage fill:#e8f5e9
    style CartPage fill:#fce4ec
    style ProductDetails fill:#f3e5f5
    style SearchComponent fill:#fff9c4
```

## Flow Description

### 1. **Application Entry & Authentication**
- User starts at the Root Layout which wraps the app with UserProvider context
- Login page collects email and password
- On submit, makes POST request to `/api/user`
- On success, stores user data in context and navigates to home

### 2. **Home Page Flow**
- Home Layout renders Header (with logo, search, profile, cart icons) and NavigationBar
- Home Page fetches all products via GET `/api/product`
- Products are filtered by category (Tops, Bottoms, Outerwear, Shoes)
- ProductSection components display 4 products per category
- Each product is rendered as a ProductCard

### 3. **Product Details Flow**
- User clicks on a ProductCard
- Navigates to Product Details page with productId query parameter
- Fetches specific product via GET `/api/product/:id`
- Displays full product information with AddToCartButton
- User can add product to cart (POST `/api/cart`)

### 4. **Cart Management Flow**
- User clicks cart icon in Header
- Cart page fetches user's cart items via GET `/api/cart/:userId`
- Displays each cart item with ProductCard
- User can:
  - Increment/decrement quantity (PUT `/api/cart/:id/:quantity`)
  - Remove items (DELETE `/api/cart/:id`)
- Cart total is recalculated after each action
- User can proceed to checkout

### 5. **Search Functionality**
- Search component fetches all products on mount
- User types in search box
- Products are filtered by name in real-time (client-side)
- User can select result to navigate to Product Details

### 6. **Navigation**
- Header provides quick access to Home, Profile, Cart
- NavigationBar allows browsing by category
- Category pages display filtered products

## Key Frontend Technologies
- **Next.js 13+** with App Router
- **React Hooks**: useState, useEffect, useContext
- **Context API**: User context for global state management
- **Client-side routing**: next/navigation
- **API Integration**: Fetch API for backend communication

