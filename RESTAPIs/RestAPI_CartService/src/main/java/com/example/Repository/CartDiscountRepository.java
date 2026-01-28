package com.example.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Entities.CartDiscount;


public interface CartDiscountRepository extends JpaRepository<CartDiscount, Long> {
	
	// Find all discounts for a cart
	List<CartDiscount> findByCart_CartId(Long cartId);


	// Delete discount by code
	void deleteByCart_CartIdAndDiscountCode(Long cartId, String discountCode);
}

