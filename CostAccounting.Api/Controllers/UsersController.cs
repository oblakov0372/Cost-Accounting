using CostAccounting.Api.Models;
using CostAccounting.Api.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CostAccounting.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : BaseController
    {
        private readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] Authenticate model)
        {
            string jwt = await _userService.Login(model);
            if (jwt != "")
                return Ok(jwt);

            return BadRequest(jwt);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            bool result = await _userService.Register(model);
            if (result)
                return Ok("User has been registered");

            return BadRequest($"User with this email:{model.Email} or with this " +
                              $"userName:{model.UserName} already registered");
        }
    }
}
