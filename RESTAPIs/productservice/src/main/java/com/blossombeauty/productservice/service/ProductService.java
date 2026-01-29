package com.blossombeauty.productservice.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.blossombeauty.productservice.entity.*;
import com.blossombeauty.productservice.repository.*;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final SubcategoryRepository subcategoryRepository;

    public ProductService(ProductRepository productRepository,
                          BrandRepository brandRepository,
                          SubcategoryRepository subcategoryRepository) {
        this.productRepository = productRepository;
        this.brandRepository = brandRepository;
        this.subcategoryRepository = subcategoryRepository;
    }

    public Product addProduct(Product product) {

        //  Fetch REAL brand from DB
        Brand brand = brandRepository.findById(product.getBrand().getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        // Fetch REAL subcategory
        Subcategory subcategory = subcategoryRepository.findById(product.getSubcategory().getSubcategoryId())
                .orElseThrow(() -> new RuntimeException("Subcategory not found"));

        product.setBrand(brand);
        product.setSubcategory(subcategory);

        return productRepository.save(product);
    }
    public Product updateProduct(Integer id, Product updatedProduct) {

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Basic fields
        existingProduct.setProductName(updatedProduct.getProductName());
        existingProduct.setProductDescription(updatedProduct.getProductDescription());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setStockQuantity(updatedProduct.getStockQuantity());

        // Brand mapping
        Brand brand = brandRepository.findById(updatedProduct.getBrand().getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));
        existingProduct.setBrand(brand);

        // Subcategory mapping
        Subcategory subcategory = subcategoryRepository.findById(updatedProduct.getSubcategory().getSubcategoryId())
                .orElseThrow(() -> new RuntimeException("Subcategory not found"));
        existingProduct.setSubcategory(subcategory);

        return productRepository.save(existingProduct);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Integer id) {
        return productRepository.findById(id).orElse(null);
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
}
