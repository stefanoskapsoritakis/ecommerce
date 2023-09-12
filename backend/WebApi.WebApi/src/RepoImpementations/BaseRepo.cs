using Microsoft.EntityFrameworkCore;

using WebApi.Core.src.Abstractions;
using WebApi.Core.src.Entities;
using WebApi.Core.src.Shared;
using WebApi.WebApi.src.Database;

namespace WebApi.WebApi.src.RepoImpementations
{
    public class BaseRepo<T> : IBaseRepo<T> where T : class
    {
        private readonly DbSet<T> _dbSet;
        private readonly DatabaseContext _context;
        public BaseRepo(DatabaseContext dbContext)
        {
            _dbSet = dbContext.Set<T>();
            _context = dbContext;
        }

        public virtual async Task<T> CreateOne(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> DeleteOneById(T entity)
        {
            
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<T>> GetAll(QueryOptions queryOptions)
        {
            return await _dbSet.AsNoTracking().ToArrayAsync();
        }

        public async Task<T?> GetOneById(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T> UpdateOneById( T updatedEntity)
        {
            _dbSet.Update(updatedEntity);
            await _context.SaveChangesAsync();
            return updatedEntity;
        }
    }
}