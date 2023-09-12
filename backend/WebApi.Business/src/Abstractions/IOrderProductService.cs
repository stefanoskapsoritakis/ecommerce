using WebApi.Business.src.Dtos;
using WebApi.Core.src.Entities;

namespace WebApi.Business.src.Abstractions
{
    public interface IOrderProductService : IBaseService<OrderProduct,OrderProductReadDto, OrderProductCreateDto, OrderProductUpdateDto>
    {
        Task<OrderProduct> CreateOrderProduct(OrderProduct entity);
    }
}