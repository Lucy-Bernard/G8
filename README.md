# E-Commerce - Software Engineering Capstone

### Database

#### Steps To Recreate The Project (Mac/Windows/Linux)

1. Download the following tools (if you haven't already):

- [Azure Data Studio](https://learn.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver16&tabs=redhat-install%2Credhat-uninstall)
- [Docker](https://www.docker.com/)

2. Since SQL Server is not native to Mac or Linux, we need to use Microsoft's official [Docker image](https://hub.docker.com/_/microsoft-mssql-server) to simulate an environment that can run SQL Server. Make sure that Docker is running and then open up a new Terminal/Powershell instance and run the following command:

   ```bash
   docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=P@ssw0rd" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
   ```

   If you want to change the password, then, from the official documentation, the password needs to be "_at least 8 characters including uppercase, lowercase letters, base-10 digits and/or non-alphanumeric symbols._"

   **Note:** any time you are trying to access the database, you need to ensure that the SQL Server container is running. You can do this by going to the _containers_ tab in Docker Desktop and hitting the play button next to the appropriate container.

3. Open Azure Data Studio and connect to the SQL Server instance using the following parameters:

   ![SQL Server Connection](https://media.discordapp.net/attachments/929399365318115369/1143153990431936592/Azure_Data_Studio_Connection.png)

   where your password is the password that you set up in step 2. If prompted, click _Enable Trust Server Certificate_.

4. Navigate to `File -> New Query` and run the following query:

   ```sql
   CREATE DATABASE OnlineStore;
   GO
   ```

5. After you have created the database, you will now run the sql script "createDB.sql".

### API

This section contains all of the necessary steps to create an API that connects to a local instance of a SQL Server database.

- [Steps To Recreate The Project: (Mac/Windows/Linux)](#steps-to-recreate-the-project-macwindowslinux)

#### Steps To Recreate The Project: (Mac/Windows/Linux)

1.  Download the following tools (if you haven't already):

- [Dotnet 7.0](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- [Postman](https://www.postman.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
  - **Visual NuGet** extension from Full Stack Spiders

2. Navigate to the "Backend" directory and start the API by running the following command in the terminal:

   ```bash
   dotnet run
   ```

3. Open Postman and send a get request to make sure the database connection is working properly by using this url:
   ```
   http://localhost:5165/api/product
   ```

### FrontEnd

1. Navigate to the "FrontEnd" directory and run the following command in the terminal simultaneously with the backend:
   ```
   npm run dev
   ```
2. Now go to the following webpage:
   ```
   http://localhost:3000/
   ```
3. At this point we are at the website, use the database to find an example user's login information. For the purpose of testing the code use the following username: "johndoe217@email.com" and password: "P@ssw0rd143" Use it to sign in. Now you may use the E-Commerce app to purchase items.

### Unit Tests

1. Navigate to the "FrontEnd" directory and run the following command in the terminal to run the unit tests:
   ```
   npm run test
   ```

### !Important!

User must be logged in to add items to cart.
