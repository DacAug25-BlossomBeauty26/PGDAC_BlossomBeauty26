package com.blossombeauty.productservice.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.blossombeauty.productservice.entity.ProductImage;
import com.blossombeauty.productservice.repository.ProductImageRepository;

@Service
public class ProductImageService {

    private final ProductImageRepository productImageRepository;

    public ProductImageService(ProductImageRepository productImageRepository) {
        this.productImageRepository = productImageRepository;
    }

    public ProductImage addImage(ProductImage image) {
        return productImageRepository.save(image);
    }

    public List<ProductImage> getAllImages() {
        return productImageRepository.findAll();
    }

    public Optional<ProductImage> getImageById(Integer id) {
        return productImageRepository.findById(id);
    }

    public ProductImage updateImage(ProductImage image) {
        return productImageRepository.save(image);
    }

    public void deleteImage(Integer id) {
        productImageRepository.deleteById(id);
    }
}
