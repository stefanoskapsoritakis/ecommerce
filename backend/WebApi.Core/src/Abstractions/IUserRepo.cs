using WebApi.Core.src.Entities;

namespace WebApi.Core.src.Abstractions
{
    public interface IUserRepo : IBaseRepo<User>
    {
        Task<User> CreateAdmin(User user);
        Task<User> UpdatePassword(User user);
        Task<User?> FindOneByEmail(string email);
    }
}