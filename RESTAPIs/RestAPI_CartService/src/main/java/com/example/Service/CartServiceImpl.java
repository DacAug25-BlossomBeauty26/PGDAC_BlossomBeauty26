package com.example.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Entities.Cart;
import com.example.Entities.CartItem;
import com.example.Entities.Coupon;
import com.example.Repository.CartItemRepository;
import com.example.Repository.CartRepository;
import com.example.Repository.CouponRepository;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private CouponRepository couponRepository;

    // ADD TO CART 
    @Override
    public Cart addToCart(Long userId, Long productId, String productName, BigDecimal price) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(userId);
                    return cartRepository.save(newCart);
                });

        CartItem cartItem = cartItemRepository
                .findByCartCartIdAndProductId(cart.getCartId(), productId)
                .orElse(null);

        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProductId(productId);
            cartItem.setProductName(productName);
            cartItem.setPrice(price);
            cartItem.setQuantity(1);
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + 1);
        }

        cartItem.setSubtotal(
                cartItem.getPrice()
                        .multiply(BigDecimal.valueOf(cartItem.getQuantity()))
        );

        cartItemRepository.save(cartItem);

        updateCartTotals(cart);
        return cartRepository.save(cart);
    }

    // VIEW CART 
    @Override
    public List<CartItem> getCartItems(Long userId) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(userId);
                    newCart.setTotalAmount(BigDecimal.ZERO);
                    newCart.setFinalAmount(BigDecimal.ZERO);
                    return cartRepository.save(newCart);
                });

        return cartItemRepository.findByCartCartId(cart.getCartId());
    }


    // UPDATE QUANTITY 
    @Override
    public Cart updateQuantity(Long userId, Long productId, int quantity) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        CartItem item = cartItemRepository
                .findByCartCartIdAndProductId(cart.getCartId(), productId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        item.setQuantity(quantity);

        item.setSubtotal(
                item.getPrice().multiply(BigDecimal.valueOf(quantity))
        );

        cartItemRepository.save(item);

        updateCartTotals(cart);
        return cartRepository.save(cart);
    }

    //  REMOVE ITEM 
    @Override
    public void removeItem(Long userId, Long productId) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        CartItem item = cartItemRepository
                .findByCartCartIdAndProductId(cart.getCartId(), productId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        cartItemRepository.delete(item);
        updateCartTotals(cart);
        cartRepository.save(cart);
    }

    //  CALCULATE TOTALS 
    private void updateCartTotals(Cart cart) {

        List<CartItem> items = cartItemRepository.findByCartCartId(cart.getCartId());

        BigDecimal total = items.stream()
                .map(CartItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        cart.setTotalAmount(total);

        if ("PERCENTAGE".equals(cart.getDiscountType())) {

            BigDecimal discount = total
                    .multiply(cart.getDiscountValue())
                    .divide(BigDecimal.valueOf(100));

            cart.setFinalAmount(total.subtract(discount));

        } else if ("FIXED".equals(cart.getDiscountType())) {

            cart.setFinalAmount(total.subtract(cart.getDiscountValue()));

        } else {
            cart.setFinalAmount(total);
        }
    }
    
    @Override
   
    public Cart applyCoupon(Long userId, String code) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Coupon coupon = couponRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Invalid coupon code"));

        // Check minimum cart value
        if (cart.getTotalAmount().compareTo(coupon.getMinCartValue()) < 0) {
            throw new RuntimeException("Cart total is less than minimum required for this coupon");
        }

     // Check expiry date
        if (coupon.getExpiryDate() != null &&
        	    coupon.getExpiryDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
        	        .isBefore(LocalDate.now())) {
        	    throw new RuntimeException("This coupon has expired");
        	}



        // Apply coupon
        cart.setDiscountType(coupon.getDiscountType());
        cart.setDiscountValue(coupon.getDiscountValue());
        cart.setCouponCode(coupon.getCode());

        updateCartTotals(cart);
        return cartRepository.save(cart);
    }


    @Override
    @Transactional
    public void clearCartByUserId(Long userId) {
        cartRepository.deleteAllByUserId(userId);
    }


}
