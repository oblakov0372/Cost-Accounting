using CostAccounting.Api.Entities;
using CostAccounting.Api.Models;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;

namespace CostAccounting.Api.Services.CostService
{
    public interface ICostService
    {
        Task<List<Cost>> GetAllCosts(int userId,string sort);
        Task<Cost> AddCost(CostModel item, int userId);
        Task<bool> DeleteCost(int id);
    }
}
