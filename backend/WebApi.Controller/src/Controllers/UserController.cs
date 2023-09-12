using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using WebApi.Business.src.Abstractions;
using WebApi.Business.src.Dtos;
using WebApi.Core.src.Entities;
using WebApi.Core.src.Shared;

namespace WebApi.Controller.src.Controllers
{
    //[Authorize]
    public class UserController : CrudController<User, UserReadDto, UserCreateDto, UserUpdateDto>
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService) : base(userService)
        {
            _userService = userService;
        }

        //[Authorize(Roles = "Admin")]
        [HttpPost("admin")]
        public async Task<ActionResult<UserReadDto>> CreateAdmin([FromBody]UserCreateDto dto)
        {
            return CreatedAtAction(nameof(CreateAdmin), await _userService.CreateAdmin(dto));
        }

        //[Authorize(Roles = "Admin")] //Example of when all but one protected
        public override async Task<ActionResult<IEnumerable<UserReadDto>>> GetAll([FromQuery]QueryOptions queryOptions)
        {
            return Ok(await _userService.GetAll(queryOptions));
        }

        //Example of when one needs to be public where all protected
        public override async Task<ActionResult<UserReadDto>> GetOneById([FromRoute] Guid id)
        {
            return Ok(await _userService.GetOneById(id));
        }

        [HttpPatch("{id:Guid}")]
        public override async Task<ActionResult<UserReadDto>> UpdateOneById([FromRoute]Guid id, [FromBody]UserUpdateDto update)
        {
            var updatedObject = await _userService.UpdateOneById(id, update);
            Console.WriteLine(update.LastName);
            return Ok(updatedObject);
        }
    }
}