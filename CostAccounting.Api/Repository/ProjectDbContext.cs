using CostAccounting.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace CostAccounting.Api.Repository
{
    public class ProjectDbContext:DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Cost> Costs { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=DESKTOP-UB31SED\\SQLEXPRESS;Database=Accounting;Trusted_Connection=True;");
        }

    }
}
