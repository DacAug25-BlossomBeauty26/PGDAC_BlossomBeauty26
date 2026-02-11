using Microsoft.AspNetCore.Mvc;
using WishlistService.Services;
using WishlistService.Models;

namespace WishlistService.Controllers
{
    [Route("api/wishlist")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly WishlistServices _wishlistService;

        public WishlistController(WishlistServices wishlistService)
        {
            _wishlistService = wishlistService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] WishlistItem item)
        {
            // 1️⃣ Check if the JSON mapped correctly
            if (item == null)
            {
                Console.WriteLine("Received null WishlistItem. Check frontend JSON.");
                return BadRequest("WishlistItem is null or JSON is invalid");
            }

            Console.WriteLine($"Received: userId={item.UserId}, productId={item.ProductId}");

            try
            {
                // 2️⃣ Call the service
                var added = await _wishlistService.AddToWishlist(item.UserId, item.ProductId);

                // 3️⃣ Return the result
                return Ok(added);
            }
            catch (Exception ex)
            {
                // 4️⃣ Log the full exception for debugging
                Console.WriteLine("Exception in AddToWishlist: " + ex);
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }






        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserWishlist(long userId)
        {
            try
            {
                Console.WriteLine($"Fetching wishlist for userId={userId}");
                var items = await _wishlistService.GetWishlistByUser(userId);
                return Ok(items);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching wishlist: {ex}");
                return StatusCode(500, ex.Message);
            }
        }


        [HttpDelete("remove")]
        public async Task<IActionResult> Remove(long userId, long productId)
        {
            var success = await _wishlistService.RemoveFromWishlist(userId, productId);
            if (!success)
                return NotFound("Item not found");

            return Ok("Removed successfully");
        }
    }
}
