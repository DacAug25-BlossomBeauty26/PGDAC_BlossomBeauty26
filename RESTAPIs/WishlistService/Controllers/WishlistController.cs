using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;
using WishlistService.Models;
using WishlistService.Services;

namespace WishlistService.Controllers
{
    [ApiController]
    [Route("api/wishlist")]
    public class WishlistController : ControllerBase
    {
        private readonly WishlistServices _wishlistServices;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;

        public WishlistController(
            WishlistServices wishlistServices,
            IHttpClientFactory httpClientFactory,
            IConfiguration configuration)
        {
            _wishlistServices = wishlistServices;
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

        // ADD TO WISHLIST
        [HttpPost("add")]
        public async Task<IActionResult> AddToWishlist([FromBody] WishlistItem item)
        {
            var added = await _wishlistServices.AddToWishlist(item);

            if (!added)
                return BadRequest("Product already in wishlist");

            return Ok("Added to wishlist");
        }

        // REMOVE FROM WISHLIST
        [HttpDelete("remove")]
        public async Task<IActionResult> RemoveFromWishlist(
            [FromQuery] long userId,
            [FromQuery] long productId)
        {
            var removed = await _wishlistServices.RemoveFromWishlist(userId, productId);

            if (!removed)
                return NotFound("Wishlist item not found");

            return Ok("Removed from wishlist");
        }

        //  GET WISHLIST BY USER
        [HttpGet("{userId:long}")]
        public async Task<IActionResult> GetWishlist(long userId)
        {
            var items = await _wishlistServices.GetWishlist(userId);
            return Ok(items);
        }

      

       

    }

}
