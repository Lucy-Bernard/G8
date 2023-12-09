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

    If you want to change the password, then, from the official documentation, the password needs to be "*at least 8 characters including uppercase, lowercase letters, base-10 digits and/or non-alphanumeric symbols.*"

    **Note:** any time you are trying to access the database, you need to ensure that the SQL Server container is running. You can do this by going to the *containers* tab in Docker Desktop and hitting the play button next to the appropriate container.

3. Open Azure Data Studio and connect to the SQL Server instance using the following parameters:

    ![SQL Server Connection](https://media.discordapp.net/attachments/929399365318115369/1143153990431936592/Azure_Data_Studio_Connection.png)

    where your password is the password that you set up in step 2. If prompted, click *Enable Trust Server Certificate*.

4. Navigate to `File -> New Query` and run the following query:

    ```sql
    CREATE DATABASE OnlineStore;
    GO
    ```

5. After you have created the database, you can now use the script "createDB.sql".
