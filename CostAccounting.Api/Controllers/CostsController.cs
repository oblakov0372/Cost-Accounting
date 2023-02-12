using CostAccounting.Api.Entities;
using CostAccounting.Api.Models;
using CostAccounting.Api.Services.CostService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CostAccounting.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CostsController : BaseController
    {
        private readonly ICostService _costService;
        public CostsController(ICostService costService)
        {
            _costService = costService;
        }

        [HttpGet("GetCosts")]
        public async Task<IActionResult> GetCosts()
        {
            int userId = GetUserId();
            List<Cost> costs = await _costService.GetAllCosts(userId);
            return Ok(costs);
        }
        [HttpPost("CreateCost")]
        public async Task<IActionResult> CreateCost(CostModel model)
        {
            int userId = GetUserId();
            await _costService.AddCost(model, userId);

            return Ok();
        }
    }
}
