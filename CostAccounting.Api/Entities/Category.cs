using System.ComponentModel.DataAnnotations.Schema;

namespace CostAccounting.Api.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}
