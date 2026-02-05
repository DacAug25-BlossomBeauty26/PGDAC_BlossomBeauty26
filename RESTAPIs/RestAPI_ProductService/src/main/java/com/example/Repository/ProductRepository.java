package com.example.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Entities.Product;
import com.example.Entities.Product.ProductStatus;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Customer APIs
    List<Product> findByStatus(ProductStatus status);

    List<Product> findByBrand_BrandIdAndStatus(Long brandId, ProductStatus status);

    List<Product> findBySubCategory_SubCategoryIdAndStatus(Long subCategoryId, ProductStatus status);

    // Admin APIs (optional helpers)
    List<Product> findByBrand_BrandId(Long brandId);
    
    
}

