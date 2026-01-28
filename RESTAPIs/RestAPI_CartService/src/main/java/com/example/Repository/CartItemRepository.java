package com.example.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Entities.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	
	// Find all items in a cart
	List<CartItem> findByCart_CartId(Long cartId);


	// Find a specific item in a cart by productId
	CartItem findByCart_CartIdAndProductId(Long cartId, Long productId);


	// Delete all items for a cart
	void deleteByCart_CartId(Long cartId);
}
