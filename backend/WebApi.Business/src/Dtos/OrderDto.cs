using WebApi.Core.src.Entities;

namespace WebApi.Business.src.Dtos
{
    public class OrderReadDto
    {
        public Guid UserId { get; set; }
        public OrderStatus Status { get; set; }
        public List<OrderProductReadDto> OrderProducts { get; set; } //OrderProductReadDto
    }
    public class OrderCreateDto
    {
        public Guid UserId { get; set; }
        public OrderStatus Status { get; set; }
        public List<OrderProductCreateDto> OrderProducts { get; set; } = new List<OrderProductCreateDto>();
    }
    public class OrderUpdateDto
    {
        public OrderStatus Status { get; set; }//OrderProductUpdateDt Update products in the OrderProductController
        public List<OrderProductUpdateDto> OrderProducts { get; set; }
    }
}