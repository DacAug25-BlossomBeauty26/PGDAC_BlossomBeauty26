package com.example.Service;


import java.math.BigDecimal;
import java.util.List;


import com.example.Entities.Cart;
import com.example.Entities.CartItem;

public interface CartService {

    Cart addToCart(Long userId, Long productId, String productName, BigDecimal price);

    List<CartItem> getCartItems(Long userId);

    Cart updateQuantity(Long userId, Long productId, int quantity);

    void removeItem(Long userId, Long productId);
    
   // public Cart applyDiscount(Long userId, String discountType, BigDecimal discountValue);
    
    Cart applyCoupon(Long userId, String Code);
    
    void clearCartByUserId(Long userId);
    

}

