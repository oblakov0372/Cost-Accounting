using CostAccounting.Api.Models;

namespace CostAccounting.Api.Services.UserService
{
    public interface IUserService
    {
        public Task<string> Login(Authenticate model);

    }
}
