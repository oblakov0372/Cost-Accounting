using CostAccounting.Api.Entities;
using CostAccounting.Api.Models;
using CostAccounting.Api.Repository;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;

namespace CostAccounting.Api.Services.CategoryService
{
    public class CategoryService : ICategoryService
    {
        private readonly ProjectDbContext _context;
        public CategoryService(ProjectDbContext context)
        {
            _context = context;
        }
        public async Task<Category> CreateCategory(CategoryModel categoryModel, int userId)
        {
            Category item = await _context.Categories.Where(item => item.Name.Equals(categoryModel.Name)).FirstOrDefaultAsync();
            
            if (item != null)
                return null;

            item = new Category()
            {
                Name = categoryModel.Name,
                UserId = userId
            };
            await _context.Categories.AddAsync(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> DeleteCategory(int categoryId)
        {
            Category item = await _context.Categories.Where(item => item.Id == categoryId).FirstOrDefaultAsync();
            if (item == null)
                return false;

            _context.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Category>> GetCategories(int userId)
        {
            List<Category> categories = await _context.Categories.Where(item => item.UserId == userId).ToListAsync();

            return categories;
        }

        public async Task<bool> UpdateCategory(int categoryId, CategoryModel categoryModel)
        {
            Category item = await _context.Categories.Where(item => item.Id == categoryId).FirstOrDefaultAsync();
            if (item == null)
                return false;

            item.Name = categoryModel.Name;
            _context.Categories.Update(item);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
