using CostAccounting.Api.Entities;
using CostAccounting.Api.Models;

namespace CostAccounting.Api.Services.CategoryService
{
    public interface ICategoryService
    {
        Task<List<Category>> GetCategories(int userId);
        Task<bool> UpdateCategory(int categoryId, CategoryModel categoryModel);
        Task<bool> CreateCategory(CategoryModel categoryModel, int userId);
        Task<bool> DeleteCategory(int categoryId);

    }
}
