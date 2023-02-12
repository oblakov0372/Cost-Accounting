using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CostAccounting.Api.Controllers
{
    public abstract class BaseController : Controller
    {
        protected int GetUserId()
        {
            return Convert.ToInt32(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }
    }
}
