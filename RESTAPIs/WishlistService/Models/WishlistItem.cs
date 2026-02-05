namespace WishlistService.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

   
        [Table("wishlist_items")]
        public class WishlistItem
        {
            [Key]
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            [Column("id")]
            public long Id { get; set; } // PK can remain long

            [Required]
            [Column("user_id")]
            public int UserId { get; set; } // matches User.id

            [Required]
            [Column("product_id")]
            public long ProductId { get; set; } // depends on Product PK type

            [Required]
            [Column("product_name")]
            public string ProductName { get; set; }

            [Required]
            [Column("price")]
            public decimal Price { get; set; }

            [Column("created_at")]
            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        }
    }


