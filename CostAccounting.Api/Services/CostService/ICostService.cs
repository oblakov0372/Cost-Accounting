using CostAccounting.Api.Entities;
using CostAccounting.Api.Models;

namespace CostAccounting.Api.Services.CostService
{
    public interface ICostService
    {
        Task<List<Cost>> GetAllCosts(int userId);
        Task AddCost(CostModel item, int userId);
    }
}
