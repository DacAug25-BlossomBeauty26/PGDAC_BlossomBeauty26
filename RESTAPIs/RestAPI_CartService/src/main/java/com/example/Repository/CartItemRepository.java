package com.example.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Entities.CartItem;

import java.util.List;
import java.util.Optional;


public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    // Get all items for a cart
    List<CartItem> findByCartCartId(Long cartId);

    // Check if product already exists in cart
    Optional<CartItem> findByCartCartIdAndProductId(Long cartId, Long productId);
    
    
}

