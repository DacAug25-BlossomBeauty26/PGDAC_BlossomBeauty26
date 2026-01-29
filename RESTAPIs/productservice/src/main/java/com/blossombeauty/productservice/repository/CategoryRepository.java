package com.blossombeauty.productservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.blossombeauty.productservice.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
