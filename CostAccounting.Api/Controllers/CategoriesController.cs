using CostAccounting.Api.Entities;
using CostAccounting.Api.Models;
using CostAccounting.Api.Services.CategoryService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CostAccounting.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoriesController : BaseController
    {
        private readonly ICategoryService _categoryService;
        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet("GetCategory")]
        public async Task<IActionResult> GetCategory()
        {
            int userId = GetUserId();
            List<Category> categories = await _categoryService.GetCategories(userId);
            return Ok(categories);
        }
        [HttpPost("CreateCategory")]
        public async Task<IActionResult>CreateCategory(CategoryModel model)
        {
            int userId = GetUserId();
            Category result = await _categoryService.CreateCategory(model, userId);

            if (result != null)
                return Ok(result);

            return BadRequest();
        }

        [HttpPut("UpdateCategory")]
        public async Task<IActionResult> UpdateCategory(int categoryId, CategoryModel model)
        {
            bool result = await _categoryService.UpdateCategory(categoryId, model);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpDelete("DeleteCategory")]
        public async Task<IActionResult>DeleteCategory(int categoryId)
        {
            bool result = await _categoryService.DeleteCategory(categoryId);

            if (result)
                return Ok();

            return BadRequest();
        }
    }
}
