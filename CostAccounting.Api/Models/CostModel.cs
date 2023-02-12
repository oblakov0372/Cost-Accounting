using System.ComponentModel.DataAnnotations;

namespace CostAccounting.Api.Models
{
    public class CostModel
    {
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public decimal Price { get; set; }
        public string Comment { get; set; }
    }
}
