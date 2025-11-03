

using Application.Extension;
using Domain;
using Domain.Common.Enums;
using GlucoseMonitoringApp.Server.Authentication;
using Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NSwag;
using NSwag.Generation.Processors.Security;
using System.Text;
using System.Text.Json.Serialization;

var configuration = GetConfiguration();



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowList",
        builder =>
        {
#if DEBUG
            builder.WithOrigins("https://localhost:50386").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
#else
            builder.WithOrigins("https://vnyer-test.bartokit.hu", "https://vnyer.prod1.bartokit.hu", "https://danubius-vnyer.bartokitsoftware.hu").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
#endif
        });
});
var jwtSettings = builder.Configuration.GetSection("Jwt");
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"])),
        TokenDecryptionKey = null
    };
});
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<GlucoseContext>(options =>
{
    options.UseSqlServer(configuration.GetConnectionString("DefaultGlucoseDBConnection"));
    options.EnableSensitiveDataLogging();
});

//Register Services
builder.Services.AddSingleton<IJwtAuthManager, JwtAuthManager>();
builder.Services.AddServices();
builder.Services.AddOpenApiDocument(configure =>
{
    configure.Title = "Glucose.Backend";
    //configure.Version = "v1";
    configure.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
    {
        Type = OpenApiSecuritySchemeType.ApiKey,
        Name = "Authorization",
        In = OpenApiSecurityApiKeyLocation.Header,
        Description = "Type into the textbox: Bearer {your JWT token}.",
    });

    configure.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));
});
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseOpenApi(); // Serve the OpenAPI/Swagger document
app.UseSwaggerUi(); // Serve the Swagger UI
app.UseCors("AllowList");
app.UseAuthentication();
app.UseAuthorization();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        var context = services.GetRequiredService<GlucoseContext>();
    ;
        context.Database.Migrate();
        if (!context.Users.Any())
        {
            context.Users.AddRange(
                new User { Name = "Alice", Email = "alice@example.com", Phone = "123456789", PasswordHash = "hashedpassword1", UserType = UserType.Superadmin, LastLogin = DateTime.UtcNow },
                new User { Name = "Bob", Email = "bob@example.com", Phone = "987654321", PasswordHash = "hashedpassword2", UserType = UserType.Doctor, LastLogin = DateTime.UtcNow },
                new User { Name = "Charlie", Email = "charlie@example.com", Phone = "555555555", PasswordHash = "hashedpassword3", UserType = UserType.Doctor, LastLogin = DateTime.UtcNow }
            );
            context.SaveChanges();
        }
    }
    catch (Exception)
    {
        throw;
    }
}

app.UseDefaultFiles();
app.UseStaticFiles();
//app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
static IConfiguration GetConfiguration()
{
    var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
    var builder = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json", false, true);

    return builder.Build();
}