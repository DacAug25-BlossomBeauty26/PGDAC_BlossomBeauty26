package com.example.Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Entities.Cart;
import com.example.Entities.CartDiscount;
import com.example.Entities.CartItem;
import com.example.Repository.CartDiscountRepository;
import com.example.Repository.CartItemRepository;
import com.example.Repository.CartRepository;

import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepo;
    private final CartItemRepository itemRepo;
    private final CartDiscountRepository discountRepo;

    public CartService(CartRepository cartRepo, CartItemRepository itemRepo, CartDiscountRepository discountRepo) {
        this.cartRepo = cartRepo;
        this.itemRepo = itemRepo;
        this.discountRepo = discountRepo;
    }

    // -------------------
    // Cart operations
    // -------------------

    @Transactional
    public Cart createCart(Long userId) {
        Cart cart = new Cart();
        cart.setUserId(userId);
        cart.setStatus("ACTIVE");
        return cartRepo.save(cart);
    }

    @Transactional(readOnly = true)
    public Cart getActiveCartByUser(Long userId) {
        return cartRepo.findByUserIdAndStatus(userId, "ACTIVE");
    }

    @Transactional
    public Cart checkoutCart(Long cartId) {
        Cart cart = cartRepo.findById(cartId).orElseThrow();
        cart.setStatus("ORDERED");
        return cartRepo.save(cart);
    }

    // -------------------
    // CartItem operations
    // -------------------

    @Transactional
    public Cart addItemToCart(Long cartId, Long productId, int quantity, double price) {
        Cart cart = cartRepo.findById(cartId).orElseThrow();

        CartItem item = itemRepo.findByCart_CartIdAndProductId(cartId, productId);
        if (item != null) {
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            item = new CartItem();
            item.setCart(cart);
            item.setProductId(productId);
            item.setQuantity(quantity);
            item.setPrice(price);
        }
        itemRepo.save(item);
        return cart;
    }

    @Transactional
    public Cart updateItemQuantity(Long cartId, Long itemId, int quantity) {
        if (quantity <= 0) {
            return removeItemFromCart(cartId, itemId);
        }
        CartItem item = itemRepo.findById(itemId).orElseThrow();
        item.setQuantity(quantity);
        itemRepo.save(item);
        return item.getCart();
    }

    @Transactional
    public Cart removeItemFromCart(Long cartId, Long itemId) {
        itemRepo.deleteById(itemId);
        return cartRepo.findById(cartId).orElseThrow();
    }

    @Transactional(readOnly = true)
    public List<CartItem> getCartItems(Long cartId) {
        return itemRepo.findByCart_CartId(cartId);
    }

    // -------------------
    // CartDiscount operations
    // -------------------

    @Transactional
    public Cart applyDiscount(Long cartId, String code, double amount) {
        Cart cart = cartRepo.findById(cartId).orElseThrow();

        CartDiscount discount = new CartDiscount();
        discount.setCart(cart);
        discount.setDiscountCode(code);
        discount.setDiscountAmount(amount);

        discountRepo.save(discount);
        return cart;
    }

    @Transactional(readOnly = true)
    public List<CartDiscount> getCartDiscounts(Long cartId) {
        return discountRepo.findByCart_CartId(cartId);
    }

    // -------------------
    // Total calculation
    // -------------------

    @Transactional(readOnly = true)
    public double calculateTotal(Long cartId) {
        List<CartItem> items = getCartItems(cartId);
        List<CartDiscount> discounts = getCartDiscounts(cartId);

        double itemsTotal = items.stream().mapToDouble(i -> i.getPrice() * i.getQuantity()).sum();
        double discountTotal = discounts.stream().mapToDouble(CartDiscount::getDiscountAmount).sum();

        return itemsTotal - discountTotal;
    }
}