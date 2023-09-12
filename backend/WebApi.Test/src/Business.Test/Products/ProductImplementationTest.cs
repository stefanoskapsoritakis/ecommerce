
using AutoMapper;
using Moq;
using WebApi.Business.src.Dtos;
using WebApi.Business.src.Implementation;
using WebApi.Core.src.Abstractions;
using WebApi.Core.src.Entities;
using Xunit;

namespace WebApi.Test.src.Business.Test.Products
{
    public class ProductImplementationTest
    {
        [Fact]
        public async Task CreateOne_ShouldCreateProductAndReturnMappedDto()
        {
            // Arrange
            var productCreateDto = new ProductCreateDto
            {
                Title = "Test Product",
                Description = "Test Description",
                Price = 10.99f,
                Images = new List<Image>()
            };

            var product = new Product
            {
                Id = Guid.NewGuid(),
                Title = "Test Product",
                Description = "Test Description",
                Price = 10.99f,
                Images = new List<Image>()
            };

            var createdProductReadDto = new ProductReadDto
            {
                Id = product.Id,
                Title = "Test Product",
                Description = "Test Description",
                Price = 10.99f,
                Images = new List<Image>()
            };

            var mapperMock = new Mock<IMapper>();
            mapperMock.Setup(m => m.Map<Product>(It.IsAny<ProductCreateDto>()))
                      .Returns(product);
            mapperMock.Setup(m => m.Map<ProductReadDto>(It.IsAny<Product>()))
                      .Returns(createdProductReadDto);

            var productRepoMock = new Mock<IProductRepo>();
            productRepoMock.Setup(repo => repo.CreateOne(It.IsAny<Product>()))
                           .ReturnsAsync(product);

            var productService = new ProductService(
                productRepoMock.Object,
                mapperMock.Object
            );

            // Act
            var result = await productService.CreateOne(productCreateDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(createdProductReadDto.Id, result.Id);
            Assert.Equal(createdProductReadDto.Title, result.Title);
            Assert.Equal(createdProductReadDto.Description, result.Description);
            Assert.Equal(createdProductReadDto.Price, result.Price);

            mapperMock.Verify(m => m.Map<Product>(productCreateDto), Times.Once);
            productRepoMock.Verify(repo => repo.CreateOne(product), Times.Once);
            mapperMock.Verify(m => m.Map<ProductReadDto>(product), Times.Once);
        }
    }
}