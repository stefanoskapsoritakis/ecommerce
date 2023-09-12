using Microsoft.EntityFrameworkCore;
using WebApi.Core.src.Abstractions;
using WebApi.Core.src.Entities;
using WebApi.WebApi.src.Database;

namespace WebApi.WebApi.src.RepoImpementations
{
    public class OrderRepo : BaseRepo<Order>, IOrderRepo
    {
        private readonly DbSet<Order> _order;
        private readonly DatabaseContext _context;
        public OrderRepo(DatabaseContext dbContext) : base(dbContext)
        {
            _order = dbContext.Orders;
            _context = dbContext;
        }
    }
}