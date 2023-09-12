namespace WebApi.Core.src.Entities
{
    public class Image : BaseEntityWithId
    {
        public string Link { get; set; }
        public Image()
        {
            Id = Guid.NewGuid();
        }
    }
}