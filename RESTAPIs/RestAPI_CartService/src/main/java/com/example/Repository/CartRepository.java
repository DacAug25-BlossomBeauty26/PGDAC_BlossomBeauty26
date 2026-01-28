package com.example.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Entities.Cart;


public interface CartRepository extends JpaRepository<Cart, Long> {
	// Find active cart by user
	Cart findByUserIdAndStatus(Long userId, String status);


	// Find all carts for a user
	List<Cart> findByUserId(Long userId);
}




