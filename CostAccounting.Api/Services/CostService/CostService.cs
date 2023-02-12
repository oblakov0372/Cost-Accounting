using CostAccounting.Api.Entities;
using CostAccounting.Api.Models;
using CostAccounting.Api.Repository;
using Microsoft.EntityFrameworkCore;

namespace CostAccounting.Api.Services.CostService
{
    public class CostService : ICostService
    {
        private readonly ProjectDbContext _context;
        public CostService(ProjectDbContext context)
        {
            _context = context;
        }
        public async Task AddCost(CostModel item, int userId)
        {
            Cost cost = new Cost()
            {
                UserId = userId,
                CategoryId = item.CategoryId,
                Price = item.Price,
                Comment = item.Comment,
            };

            await _context.Costs.AddAsync(cost);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Cost>> GetAllCosts( int userId)
        {
            return await _context.Costs.Where(item => item.UserId == userId).ToListAsync();
        }
    }
}
