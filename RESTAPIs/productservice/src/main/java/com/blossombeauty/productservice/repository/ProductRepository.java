package com.blossombeauty.productservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blossombeauty.productservice.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
