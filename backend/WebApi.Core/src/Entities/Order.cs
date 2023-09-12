using System.Text.Json.Serialization;

namespace WebApi.Core.src.Entities
{
    public class Order : BaseEntityWithId
    {
        public OrderStatus Status { get; set; }
        public User User { get; set; }
        public List<OrderProduct> OrderProducts { get; set; }
    }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum OrderStatus
    {
        Pending,
        Shipped
    }
}