using Microsoft.EntityFrameworkCore;
using WishlistService.Data;
using WishlistService.Services;
using Steeltoe.Discovery.Client;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// -------------------- Configure Services --------------------

// DbContext
builder.Services.AddDbContext<WishlistDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));

// Register Wishlist service
builder.Services.AddScoped<WishlistServices>();

// Controllers + JSON options
builder.Services.AddControllers()
    .AddJsonOptions(opt =>
        opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
    );

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Eureka Discovery client
builder.Services.AddDiscoveryClient(builder.Configuration);


var app = builder.Build();

// -------------------- Middleware --------------------

// Swagger in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable CORS before Authorization
app.UseCors();



app.UseAuthorization();

app.MapControllers();

// Eureka client registers automatically
app.Run();
