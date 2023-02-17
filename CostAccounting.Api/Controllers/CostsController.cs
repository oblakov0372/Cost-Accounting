using CostAccounting.Api.Entities;
using CostAccounting.Api.Models;
using CostAccounting.Api.Services.CostService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CostAccounting.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CostsController : BaseController
    {
        private readonly ICostService _costService;
        public CostsController(ICostService costService)
        {
            _costService = costService;
        }

        [HttpGet("GetAll{sort}")]
        public async Task<IActionResult> GetCosts(string sort)
        {
            int userId = GetUserId();
            List<Cost> costs = await _costService.GetAllCosts(userId,sort);
            return Ok(costs);
        }
        [HttpPost("CreateCost")]
        public async Task<IActionResult> CreateCost(CostModel model)
        {
            int userId = GetUserId();
            Cost item = await _costService.AddCost(model, userId);

            return Ok(item);
        }
        [HttpDelete("DeleteCost")]
        public async Task<IActionResult> DeleteCost(int id)
        {
            bool result = await _costService.DeleteCost(id);
            if (result)
                return Ok();

            return BadRequest();
        }
    }
}
