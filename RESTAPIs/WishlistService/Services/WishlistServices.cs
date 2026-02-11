using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishlistService.Data;
using WishlistService.Models;

namespace WishlistService.Services
{
    public class WishlistServices
    {
        private readonly WishlistDbContext _context;

        public WishlistServices(WishlistDbContext context)
        {
            _context = context;
        }

        // Add product to wishlist
        public async Task<WishlistItem> AddToWishlist(long userId, long productId)
        {
            var exists = await _context.Wishlist
                .AnyAsync(w => w.UserId == userId && w.ProductId == productId);

            if (exists)
                throw new System.Exception("Product already in wishlist");

            var item = new WishlistItem
            {
                UserId = userId,
                ProductId = productId
            };

            _context.Wishlist.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        // Remove product from wishlist
        public async Task<bool> RemoveFromWishlist(long userId, long productId)
        {
            var item = await _context.Wishlist
                .FirstOrDefaultAsync(w => w.UserId == userId && w.ProductId == productId);

            if (item == null) return false;

            _context.Wishlist.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        // Fetch wishlist of logged-in user
        public async Task<List<WishlistItem>> GetWishlistByUser(long userId)
        {
            return await _context.Wishlist
                .Where(w => w.UserId == userId)
                .ToListAsync();
        }
    }
}
