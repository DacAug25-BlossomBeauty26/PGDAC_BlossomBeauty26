package com.blossombeauty.productservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.blossombeauty.productservice.entity.Subcategory;
import com.blossombeauty.productservice.repository.SubcategoryRepository;

@Service
public class SubcategoryService {

    private final SubcategoryRepository repository;

    public SubcategoryService(SubcategoryRepository repository) {
        this.repository = repository;
    }

    public Subcategory addSubcategory(Subcategory subcategory) {
        return repository.save(subcategory);
    }

    public List<Subcategory> getAllSubcategories() {
        return repository.findAll();
    }

    public Optional<Subcategory> getSubcategoryById(Integer id) {
        return repository.findById(id);
    }

    public Subcategory updateSubcategory(Subcategory subcategory) {
        return repository.save(subcategory);
    }

    public void deleteSubcategory(Integer id) {
        repository.deleteById(id);
    }
}
