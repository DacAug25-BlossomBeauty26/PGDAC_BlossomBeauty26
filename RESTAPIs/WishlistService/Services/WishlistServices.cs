using WishlistService.Data;
using WishlistService.Models;
using Microsoft.EntityFrameworkCore;

namespace WishlistService.Services
{
    public class WishlistServices
    {
        private readonly WishlistDbContext _context;

        public WishlistServices(WishlistDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddToWishlist(WishlistItem item)
        {
            var exists = await _context.WishlistItems
                .AnyAsync(w => w.UserId == item.UserId && w.ProductId == item.ProductId);

            if (exists)
                return false;

            _context.WishlistItems.Add(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RemoveFromWishlist(long userId, long productId)
        {
            var item = await _context.WishlistItems
                .FirstOrDefaultAsync(w => w.UserId == userId && w.ProductId == productId);

            if (item == null)
                return false;

            _context.WishlistItems.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<WishlistItem>> GetWishlist(long userId)
        {
            return await _context.WishlistItems
                .Where(w => w.UserId == userId)
                .OrderByDescending(w => w.CreatedAt)
                .ToListAsync();
        }
    }
}

