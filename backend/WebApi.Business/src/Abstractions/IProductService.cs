using WebApi.Business.src.Dtos;
using WebApi.Core.src.Entities;

namespace WebApi.Business.src.Abstractions
{
    public interface IProductService : IBaseService<Product, ProductReadDto, ProductCreateDto, ProductUpdateDto> 
    {
        
    }
}