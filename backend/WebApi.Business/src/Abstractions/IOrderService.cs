using WebApi.Business.src.Dtos;
using WebApi.Core.src.Entities;

namespace WebApi.Business.src.Abstractions
{
    public interface IOrderService : IBaseService<Order, OrderReadDto, OrderCreateDto, OrderUpdateDto> 
    {
        
    }
}