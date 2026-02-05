package com.example.Service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.DTO.ProductRequestDTO;
import com.example.Entities.Brand;
import com.example.Entities.Product;
import com.example.Entities.Product.ProductStatus;
import com.example.Entities.SubCategory;
import com.example.Repository.BrandRepository;
import com.example.Repository.ProductRepository;
import com.example.Repository.SubCategoryRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    // ADMIN: Add product
   
    public Product addProduct(ProductRequestDTO dto) {

        // Defensive checks
        if (dto.getBrandId() == null || dto.getSubCategoryId() == null) {
            throw new IllegalArgumentException("Brand ID and Subcategory ID are required!");
        }

        Brand brand = brandRepository.findById(dto.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found with ID: " + dto.getBrandId()));

        SubCategory subCategory = subCategoryRepository.findById(dto.getSubCategoryId())
                .orElseThrow(() -> new RuntimeException("Subcategory not found with ID: " + dto.getSubCategoryId()));

        Product product = new Product();
        product.setProductName(dto.getProductName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setImageUrl(dto.getImageUrl());
        product.setStatus(ProductStatus.ACTIVE);
        product.setBrand(brand);
        product.setSubCategory(subCategory);

        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    // Partial update method
    public Product updateProduct(Long id, ProductRequestDTO dto) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));

        // Update fields only if they are not null
        if (dto.getProductName() != null) product.setProductName(dto.getProductName());
        if (dto.getDescription() != null) product.setDescription(dto.getDescription());
        if (dto.getPrice() != null) product.setPrice(dto.getPrice());
        if (dto.getStock() != null) product.setStock(dto.getStock());
        if (dto.getImageUrl() != null) product.setImageUrl(dto.getImageUrl());

        if (dto.getBrandId() != null) {
            Brand brand = brandRepository.findById(dto.getBrandId())
                    .orElseThrow(() -> new RuntimeException("Brand not found with id " + dto.getBrandId()));
            product.setBrand(brand);
        }

        if (dto.getSubCategoryId() != null) {
            SubCategory subCategory = subCategoryRepository.findById(dto.getSubCategoryId())
                    .orElseThrow(() -> new RuntimeException("SubCategory not found with id " + dto.getSubCategoryId()));
            product.setSubCategory(subCategory);
        }

        return productRepository.save(product);
    }

    // Delete product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    
    // Customer: get active products
    public List<Product> getActiveProducts() {
        return productRepository.findByStatus(ProductStatus.ACTIVE);
    }
}

