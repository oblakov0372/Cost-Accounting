using System.ComponentModel.DataAnnotations.Schema;

namespace CostAccounting.Api.Entities
{
    public class Cost
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public decimal Price { get; set; }
        public string Comment { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public Category Category { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

    }
}
