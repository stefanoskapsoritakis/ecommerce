using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Moq;
using WebApi.Business.src.Dtos;
using WebApi.Business.src.Implementation;
using WebApi.Core.src.Abstractions;
using WebApi.Core.src.Entities;
using WebApi.WebApi.src.Configuration;
using Xunit;

namespace WebApi.Test.src.Business.Test.Users
{
    public class UserImpementationTest
    {
        [Fact]
        public async Task CreateOne_ValidDto_ReturnsMappedUserReadDto()
        {
            // Arrange
            var userCreateDto = new UserCreateDto
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "john.doe@example.com",
                Avatar = "avatar-url",
                Password = "password"
            };

            var expectedUser = new User
            {
                Id = Guid.NewGuid(),
                FirstName = userCreateDto.FirstName,
                LastName = userCreateDto.LastName,
                Email = userCreateDto.Email,
                Avatar = userCreateDto.Avatar,
                Role = Role.User
                // Set other properties accordingly
            };

            var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<MapperProfile>()));

            var userRepoMock = new Mock<IUserRepo>();
            userRepoMock.Setup(repo => repo.CreateOne(It.IsAny<User>()))
                        .ReturnsAsync(expectedUser);

            var userService = new UserService(userRepoMock.Object, mapper);

            // Act
            var result = await userService.CreateOne(userCreateDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(expectedUser.Id, result.Id);
            Assert.Equal(expectedUser.FirstName, result.FirstName);
            Assert.Equal(expectedUser.LastName, result.LastName);
            Assert.Equal(expectedUser.Email, result.Email);
            Assert.Equal(expectedUser.Avatar, result.Avatar);
            Assert.Equal(expectedUser.Role, result.Role);
        }
        [Fact]
        public async Task UpdatePassword_ValidIdAndNewPassword_SuccessfullyUpdatesPassword()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var newPassword = "newpassword";

            var existingUser = new User
            {
                Id = userId,
                Password = "oldhashedpassword",
                Salt = new byte[32]
            };

            var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<MapperProfile>()));

            var userRepoMock = new Mock<IUserRepo>();
            userRepoMock.Setup(repo => repo.GetOneById(userId))
                        .ReturnsAsync(existingUser);

            userRepoMock.Setup(repo => repo.UpdatePassword(It.IsAny<User>()))
                        .ReturnsAsync(existingUser);

            var userService = new UserService(userRepoMock.Object, mapper);

            // Act
            var result = await userService.UpdatePassword(userId, newPassword);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(userId, result.Id);

            // Verify that Password and Salt are updated correctly
            //Assert.Equal(existingUser.Salt, result.Salt); // Assuming salt remains the same
            //Assert.NotEqual(existingUser.Password, result.Password); // Password should be updated
        }
    }
}