using System.Text.Json.Serialization;

namespace WebApi.Core.src.Entities
{
    public class User : BaseEntityWithId
    {
        public string FirstName { get; set; }   
        public string LastName { get; set; }
        public string Email { get; set; }   
        public string Avatar { get; set; }
        public string Password { get; set; }
        public byte[] Salt { get; set; }
        public Role Role { get; set; }
    }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Role
    {
        Admin, 
        User
    }
}