package com.blossombeauty.productservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blossombeauty.productservice.entity.Brand;

public interface BrandRepository extends JpaRepository<Brand, Integer> {

}
