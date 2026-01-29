package com.blossombeauty.productservice.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.blossombeauty.productservice.entity.Brand;
import com.blossombeauty.productservice.repository.BrandRepository;

@Service
public class BrandService {

    private final BrandRepository brandRepository;

    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    // Create / Add brand
    public Brand addBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    // Get all brands
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    // Get brand by ID
    public Optional<Brand> getBrandById(Integer id) {
        return brandRepository.findById(id);
    }

    // Update brand
    public Brand updateBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    // Delete brand
    public void deleteBrand(Integer id) {
        brandRepository.deleteById(id);
    }
}
