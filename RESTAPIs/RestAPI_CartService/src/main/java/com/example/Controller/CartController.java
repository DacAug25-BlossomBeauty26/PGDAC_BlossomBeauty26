package com.example.Controller;

import org.springframework.web.bind.annotation.*;

import com.example.Entities.Cart;
import com.example.Entities.CartDiscount;
import com.example.Entities.CartItem;
import com.example.Service.CartService;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // -------------------
    // Cart APIs
    // -------------------

    @PostMapping("/{userId}")
    public Cart createCart(@PathVariable Long userId) {
        return cartService.createCart(userId);
    }

    @GetMapping("/active/{userId}")
    public Cart getActiveCart(@PathVariable Long userId) {
        return cartService.getActiveCartByUser(userId);
    }

    @PostMapping("/{cartId}/checkout")
    public Cart checkoutCart(@PathVariable Long cartId) {
        return cartService.checkoutCart(cartId);
    }

    // -------------------
    // CartItem APIs
    // -------------------

    @PostMapping("/{cartId}/item")
    public Cart addItem(@PathVariable Long cartId,
                        @RequestParam Long productId,
                        @RequestParam int quantity,
                        @RequestParam double price) {
        return cartService.addItemToCart(cartId, productId, quantity, price);
    }

    @PatchMapping("/{cartId}/item/{itemId}")
    public Cart updateItem(@PathVariable Long cartId,
                           @PathVariable Long itemId,
                           @RequestParam int quantity) {
        return cartService.updateItemQuantity(cartId, itemId, quantity);
    }

    @DeleteMapping("/{cartId}/item/{itemId}")
    public Cart removeItem(@PathVariable Long cartId,
                           @PathVariable Long itemId) {
        return cartService.removeItemFromCart(cartId, itemId);
    }

    @GetMapping("/{cartId}/items")
    public List<CartItem> getItems(@PathVariable Long cartId) {
        return cartService.getCartItems(cartId);
    }

    // -------------------
    // CartDiscount APIs
    // -------------------

    @PostMapping("/{cartId}/discount")
    public Cart applyDiscount(@PathVariable Long cartId,
                              @RequestParam String code,
                              @RequestParam double amount) {
        return cartService.applyDiscount(cartId, code, amount);
    }

    @GetMapping("/{cartId}/discounts")
    public List<CartDiscount> getDiscounts(@PathVariable Long cartId) {
        return cartService.getCartDiscounts(cartId);
    }

    // -------------------
    // Total API
    // -------------------

    @GetMapping("/{cartId}/total")
    public double getTotal(@PathVariable Long cartId) {
        return cartService.calculateTotal(cartId);
    }
}
