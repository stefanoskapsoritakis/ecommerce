using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

using WebApi.Business.src.Abstractions;
using WebApi.Business.src.Dtos;
using WebApi.Core.src.Abstractions;
using WebApi.Core.src.Entities;

namespace WebApi.Business.src.Shared
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepo _userRepo;
        public AuthService(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }
        public async Task<string> VerifyCredintials(UserCredentialsDto credentials)
        {
            var foundUserByEmail = await _userRepo.FindOneByEmail(credentials.Email) ?? throw new Exception("Email not found");
            var isAuthenticated = PasswordService.VerifyPassword(credentials.Password, foundUserByEmail.Password, foundUserByEmail.Salt);
            if (!isAuthenticated)
            {
                throw new Exception("Credentials do no match");
            }
            return GenerateToken(foundUserByEmail);
        }

        //Move to WebApi layer
        private string GenerateToken(User user)
        {
            var claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my-secrete-key-jsdguyfsdgcjsdbchjsdb jdhscjysdcsdj"));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = "ecommerce-backend", 
                Expires = DateTime.Now.AddMinutes(10),
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = signingCredentials
            };
            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var token = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
            return jwtSecurityTokenHandler.WriteToken(token);
        }
    }
}