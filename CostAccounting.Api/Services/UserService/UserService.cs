using CostAccounting.Api.Entities;
using CostAccounting.Api.Models;
using CostAccounting.Api.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CostAccounting.Api.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly ProjectDbContext _context;
        private readonly IConfiguration _configuration;
        public UserService(ProjectDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public async Task<string> Login(Authenticate model)
        {
            User user = await Authenticate(model);
            if (user == null)
                return "";
            string jwt = GenerateJwt(user);
            return jwt;
        }
        private async Task<User> Authenticate(Authenticate model)
        {
            return await _context.Users.Where(u => u.Email == model.Email && u.Password == model.Password).FirstOrDefaultAsync();
        }
        private string GenerateJwt(User user)
        {
            var tokenDescriptor = CreateTokenDescriptor(user);
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);
            return jwt;
        }

        private SecurityTokenDescriptor CreateTokenDescriptor(User user)
        {
            var issuer = _configuration.GetValue<string>("Jwt:Issuer");
            var audience = _configuration.GetValue<string>("Jwt:Audience").ToString();
            var key = Encoding.ASCII.GetBytes
            (_configuration.GetValue<string>("Jwt:Key").ToString());
            return new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials
                (new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature)
            };
        }

        public async Task<bool> Register(RegisterModel model)
        {
            User item = await _context.Users.Where(u => u.Email == model.Email || u.UserName == model.UserName).FirstOrDefaultAsync();

            if (item != null)
                return false;

            item = new User()
            {
                UserName = model.UserName,
                Email = model.Email,
                Password = model.Password,
                CreationTime = DateTime.Now
            };

            await _context.Users.AddAsync(item);
            await _context.SaveChangesAsync();

            return true;

        }

    }
}
