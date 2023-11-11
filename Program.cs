namespace ExampleAPI
{
  public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
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

            // Use CORS middleware
            app.UseCors("_MyAllowSubdomainPolicy");

            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}