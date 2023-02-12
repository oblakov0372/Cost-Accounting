using System.ComponentModel.DataAnnotations;

namespace CostAccounting.Api.Models
{
    public class CategoryModel
    {
        [Required]
        public string Name { get; set; }

    }
}
