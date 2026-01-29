package com.blossombeauty.productservice.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.blossombeauty.productservice.entity.ProductImage;
import com.blossombeauty.productservice.service.ProductImageService;

@RestController
@RequestMapping("/api/images")
public class ProductImageController {

    private final ProductImageService productImageService;

    public ProductImageController(ProductImageService productImageService) {
        this.productImageService = productImageService;
    }

    @PostMapping
    public ProductImage addImage(@RequestBody ProductImage image) {
        return productImageService.addImage(image);
    }

    @GetMapping
    public List<ProductImage> getAllImages() {
        return productImageService.getAllImages();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductImage> getImageById(@PathVariable Integer id) {
        Optional<ProductImage> image = productImageService.getImageById(id);
        return image.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ProductImage updateImage(@RequestBody ProductImage image) {
        return productImageService.updateImage(image);
    }

    @DeleteMapping("/{id}")
    public void deleteImage(@PathVariable Integer id) {
        productImageService.deleteImage(id);
    }
}
