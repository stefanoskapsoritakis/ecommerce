using Microsoft.EntityFrameworkCore;
using WebApi.Core.src.Abstractions;
using WebApi.Core.src.Entities;
using WebApi.WebApi.src.Database;

namespace WebApi.WebApi.src.RepoImpementations
{
    public class ProductRepo : BaseRepo<Product>, IProductRepo
    {
        private readonly DbSet<Product> _product;
        private readonly DatabaseContext _context;
        public ProductRepo(DatabaseContext dbContext) : base(dbContext)
        {
            _product = dbContext.Products;
            _context = dbContext;
        }
        public override async Task<Product> CreateOne(Product entity)
        {
            await _product.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}