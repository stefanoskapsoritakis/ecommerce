namespace WebApi.Core.src.Entities
{
    public class Product : BaseEntityWithId
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public int Inventory { get; set; }
        public List<Image> Images { get; set; }
        public Product()
        {
            Images = new List<Image>();
        }
    }
}