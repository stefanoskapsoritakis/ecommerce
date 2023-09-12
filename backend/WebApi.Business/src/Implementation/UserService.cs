using AutoMapper;

using WebApi.Business.src.Abstractions;
using WebApi.Business.src.Dtos;
using WebApi.Business.src.Shared;
using WebApi.Core.src.Abstractions;
using WebApi.Core.src.Entities;

namespace WebApi.Business.src.Implementation
{
    public class UserService : BaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>, IUserService
    {
        private readonly IUserRepo _userRepo;
        public UserService(IUserRepo userRepo, IMapper mapper) : base(userRepo, mapper)
        {
            _userRepo = userRepo;
        }

        public async Task<UserReadDto> UpdatePassword(Guid id, string newPassword)
        {
            var foundUser = await _userRepo.GetOneById(id);
            if (foundUser == null)
            {
                throw new Exception("User not found");
            }
            PasswordService.HashPassword(newPassword, out var hashedPassword, out var salt);
            foundUser.Password = hashedPassword;
            foundUser.Salt = salt;
            return _mapper.Map<UserReadDto>(await _userRepo.UpdatePassword(foundUser));
        }
        public override async Task<UserReadDto> CreateOne(UserCreateDto dto)
        {
            var entity = _mapper.Map<User>(dto);
            PasswordService.HashPassword(dto.Password, out var hashedPassword, out var salt);
            entity.Password = hashedPassword;
            entity.Salt = salt;
            var created = await _userRepo.CreateOne(entity);
            return _mapper.Map<UserReadDto>(created);
        }

        public async Task<UserReadDto> CreateAdmin(UserCreateDto dto)
        {
            var entity = _mapper.Map<User>(dto);
            PasswordService.HashPassword(dto.Password, out var hashedPassword, out var salt);
            entity.Password = hashedPassword;
            entity.Salt = salt;
            var created = await _userRepo.CreateAdmin(entity);
            return _mapper.Map<UserReadDto>(created);
        }

        public override async Task<UserReadDto> UpdateOneById(Guid id, UserUpdateDto updated)
        {
            var foundItem = await _userRepo.GetOneById(id);
            if (foundItem is null)
            {
                throw CustomeException.NotFoundException();
            }

            foundItem.FirstName = updated.FirstName;
            foundItem.LastName = updated.LastName;
            foundItem.Avatar = updated.Avatar;

            var updatedEntity = await _userRepo.UpdateOneById(foundItem);

            return _mapper.Map<UserReadDto>(updatedEntity);
        }
    }
}