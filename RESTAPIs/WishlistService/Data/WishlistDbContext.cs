using Microsoft.EntityFrameworkCore;
using WishlistService.Models;

namespace WishlistService.Data
{
    public class WishlistDbContext : DbContext
    {
        public WishlistDbContext(DbContextOptions<WishlistDbContext> options)
            : base(options) { }

        public DbSet<WishlistItem> Wishlist { get; set; } // matches table name
    }
}
