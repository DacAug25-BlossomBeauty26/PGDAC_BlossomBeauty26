package com.blossombeauty.productservice.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.blossombeauty.productservice.entity.Subcategory;
import com.blossombeauty.productservice.service.SubcategoryService;

@RestController
@RequestMapping("/api/subcategories")
public class SubcategoryController {

    private final SubcategoryService service;

    public SubcategoryController(SubcategoryService service) {
        this.service = service;
    }

    @PostMapping
    public Subcategory add(@RequestBody Subcategory subcategory) {
        return service.addSubcategory(subcategory);
    }

    @GetMapping
    public List<Subcategory> getAll() {
        return service.getAllSubcategories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subcategory> getById(@PathVariable Integer id) {
        Optional<Subcategory> sub = service.getSubcategoryById(id);
        return sub.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subcategory> update(@PathVariable Integer id, @RequestBody Subcategory subcategory) {
        Optional<Subcategory> existing = service.getSubcategoryById(id);
        if (existing.isPresent()) {
            subcategory.setSubcategoryId(id);
            return ResponseEntity.ok(service.updateSubcategory(subcategory));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.deleteSubcategory(id);
        return ResponseEntity.ok().build();
    }
}
