package com.blossombeauty.productservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.blossombeauty.productservice.entity.Category;
import com.blossombeauty.productservice.repository.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    // Constructor injection
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // CREATE CATEGORY
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    // READ ALL CATEGORIES
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // READ CATEGORY BY ID
    public Optional<Category> getCategoryById(Integer id) {
        return categoryRepository.findById(id);
    }

    // UPDATE CATEGORY
    public Category updateCategory(Category category) {
        return categoryRepository.save(category);
    }

    // DELETE CATEGORY
    public void deleteCategory(Integer id) {
        categoryRepository.deleteById(id);
    }
}
