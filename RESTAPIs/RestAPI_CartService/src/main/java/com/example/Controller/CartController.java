package com.example.Controller;
import com.example.Entities.Cart;
import com.example.Entities.CartItem;
import com.example.Service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
//@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartService cartService;

    // ---------------- ADD TO CART ----------------
    @PostMapping("/add")
    public Cart addToCart(
            @RequestParam Long userId,
            @RequestParam Long productId,
            @RequestParam String productName,
            @RequestParam BigDecimal price
    ) {
        return cartService.addToCart(userId, productId, productName, price);
    }

    // ---------------- VIEW CART ----------------
    @GetMapping("/getcartbyid/{userId}")
    public List<CartItem> getCart(@PathVariable Long userId) {
        return cartService.getCartItems(userId);
    }

    // ---------------- UPDATE QUANTITY ----------------
    @PutMapping("/updatequantity")
    public Cart updateQuantity(
            @RequestParam Long userId,
            @RequestParam Long productId,
            @RequestParam int quantity
    ) {
        return cartService.updateQuantity(userId, productId, quantity);
    }

    // ---------------- REMOVE ITEM ----------------
    @DeleteMapping("/removecart")
    public void removeItem(
            @RequestParam Long userId,
            @RequestParam Long productId
    ) {
        cartService.removeItem(userId, productId);
    }
    
 // ---------------- APPLY DISCOUNT ----------------
//    @PutMapping("/discount")
//    public Cart applyDiscount(
//            @RequestParam Long userId,
//            @RequestParam String discountType,
//            @RequestParam BigDecimal discountValue
//    ) {
//        return cartService.applyDiscount(userId, discountType, discountValue);
//    }
    
    
    @PostMapping("/applycoupon")
    public Cart applyCoupon(
            @RequestParam Long userId,
            @RequestParam String code
    ) {
        return cartService.applyCoupon(userId, code);
    }
    
    @PostMapping("/clearcart/{userId}")
    public ResponseEntity<String> clearCart(@PathVariable Long userId) {
        cartService.clearCartByUserId(userId);
        return ResponseEntity.ok("Cart cleared successfully");
    }


}

