using WebApi.Core.src.Entities;

namespace WebApi.Business.src.Dtos
{
    public class ProductReadDto
    {
        public Guid Id { get; set;}
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public List<Image> Images { get; set; }
    }
    public class ProductCreateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public List<Image> Images { get; set; }
        public int Inventory { get; set; }
    }
    public class ProductUpdateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public int Inventory { get; set; }
        public List<Image> Images { get; set; }
    }
}