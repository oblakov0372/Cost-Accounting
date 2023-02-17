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
        public async Task<Cost> AddCost(CostModel item, int userId)
        {
            Cost cost = new Cost()
            {
                UserId = userId,
                CategoryId = item.CategoryId,
                Price = item.Price,
                Comment = item.Comment,
                Date = DateTime.Now
            };

            await _context.Costs.AddAsync(cost);
            await _context.SaveChangesAsync();

            return cost;
        }

        public async Task<bool> DeleteCost(int id)
        {
            Cost item = await _context.Costs.SingleOrDefaultAsync(c => c.Id == id);

            if (item == null)
                return false;

            _context.Costs.Remove(item);
            await _context.SaveChangesAsync();
            return true;

        }

        public async Task<List<Cost>> GetAllCosts(int userId, string sort)
        {
            List<Cost> costs = await _context.Costs.Where(item => item.UserId == userId).ToListAsync();

            if (sort.Equals(""))
                return costs;
            else if (sort.Equals("Date")) 
                return costs.OrderBy(item => item.Date).ToList();
            else 
                return costs.OrderBy(item => item.Price).ToList();
        }

    }
}
