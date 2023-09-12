using WebApi.Core.src.Entities;

namespace WebApi.Core.src.Abstractions
{
    public interface IOrderProductRepo : IBaseRepo<OrderProduct>
    {
        Task<IEnumerable<OrderProduct>> GetAllOrderProduct();
    }
}