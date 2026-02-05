package com.example.Repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Entities.Cart;

import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    // Find cart by user id (one active cart per user)
    Optional<Cart> findByUserId(Long userId);
    
    @Transactional
    void deleteAllByUserId(Long userId);
}

