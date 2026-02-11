using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WishlistService.Models
{
    [Table("wishlist")]
    public class WishlistItem
    {
        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("wishlist_id")]
        public long WishlistId { get; set; }

        [Required]
        [Column("user_id")]
        public long UserId { get; set; }

        [Required]
        [Column("product_id")]
        public long ProductId { get; set; }
    }
}
