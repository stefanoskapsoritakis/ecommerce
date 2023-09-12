using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Npgsql;
using Swashbuckle.AspNetCore.Filters;

using WebApi.Business.src.Abstractions;
using WebApi.Business.src.Implementation;
using WebApi.Business.src.Shared;
using WebApi.Core.src.Abstractions;
using WebApi.Core.src.Entities;
using WebApi.WebApi.src.AuthorizationRequirement;
using WebApi.WebApi.src.Database;
using WebApi.WebApi.src.Middleware;
using WebApi.WebApi.src.RepoImpementations;

var builder = WebApplication.CreateBuilder(args);

//Add Automapper DI
builder.Services.AddAutoMapper(typeof(Program).Assembly);

var connectionString = builder.Configuration.GetConnectionString("Default");

var npgsqlBuilder = new NpgsqlDataSourceBuilder(connectionString);
npgsqlBuilder.MapEnum<Role>();
npgsqlBuilder.MapEnum<OrderStatus>();
var modifiedConnectionString = npgsqlBuilder.Build();

builder.Services.AddDbContext<DatabaseContext>(options =>
{
    options.AddInterceptors(new TimeStampInterceptor());
    options.UseNpgsql(modifiedConnectionString)
           .UseSnakeCaseNamingConvention();
});

// Add Database Context
//builder.Services.AddDbContext<DatabaseContext>();

// Add Service DI
builder.Services
.AddScoped<IUserRepo, UserRepo>()
.AddScoped<IUserService, UserService>()
.AddScoped<IAuthService, AuthService>()
.AddScoped<IProductRepo, ProductRepo>()
.AddScoped<IProductService, ProductService>()
.AddScoped<IOrderRepo, OrderRepo>()
.AddScoped<IOrderService, OrderService>()
.AddScoped<IOrderProductRepo, OrderProductRepo>()
.AddScoped<IOrderProductService, OrderProductService>();
;

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Bearer token authentication",
        Name = "Authentication",
        In = ParameterLocation.Header,
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

// Add policy based requirement handler to service

builder.Services
.AddSingleton<OwnerAuthorization>()
.AddSingleton<ErrorHandlerMiddleware>();

// Config route
builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;
});

// Config the authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = "ecommerce-backend",
        ValidateAudience = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my-secrete-key-jsdguyfsdgcjsdbchjsdb jdhscjysdcsdj")),
        ValidateIssuerSigningKey = true,
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("OwnerOnly", policy => policy.Requirements.Add(new OwnerAuthorization()));
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000") // React app's URL
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();


/* CORS error*/
app.UseCors();

app.UseHttpsRedirection();

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
