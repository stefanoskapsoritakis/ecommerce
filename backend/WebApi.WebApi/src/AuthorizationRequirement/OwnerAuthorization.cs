using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using WebApi.Business.src.Dtos;
using WebApi.Core.src.Entities;

namespace WebApi.WebApi.src.AuthorizationRequirement
{
    public class OwnerAuthorization : IAuthorizationRequirement
    {

    }

    public class OwnerAuthorizationHandler : AuthorizationHandler<OwnerAuthorization, OrderReadDto>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OwnerAuthorization requirement, OrderReadDto resource)
        {
            var authenticatedUser = context.User;
            var userId = authenticatedUser.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            /*if (resource.User.Id.ToString() == userId)
            {
                context.Succeed(requirement);
            }*/
            return Task.CompletedTask;
        }
    }
}