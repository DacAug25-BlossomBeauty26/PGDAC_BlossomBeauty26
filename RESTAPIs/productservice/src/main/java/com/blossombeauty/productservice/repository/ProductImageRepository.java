package com.blossombeauty.productservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blossombeauty.productservice.entity.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {

}
