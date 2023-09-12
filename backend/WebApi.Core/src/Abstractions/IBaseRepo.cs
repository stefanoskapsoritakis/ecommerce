using WebApi.Core.src.Shared;

namespace WebApi.Core.src.Abstractions
{
    public interface IBaseRepo<T>
    {
        Task<IEnumerable<T>> GetAll(QueryOptions queryOptions);
        Task<T?> GetOneById(Guid id);
        Task<T> UpdateOneById( T updatedEntity);
        Task<bool> DeleteOneById(T entity);
        Task<T> CreateOne(T entity);
    }
}