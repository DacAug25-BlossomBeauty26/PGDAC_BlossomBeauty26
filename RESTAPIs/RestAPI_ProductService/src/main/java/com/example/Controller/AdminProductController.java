package com.example.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DTO.ProductRequestDTO;
import com.example.Entities.Product;
import com.example.Service.ProductService;
//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class AdminProductController {

    @Autowired
    private ProductService productService;
    
    
    @GetMapping("/admin/getallproducts")
    public ResponseEntity<List<Product>> getAllProductsForAdmin() {
        List<Product> products = productService.getAllProducts(); // active + inactive
        return ResponseEntity.ok(products);
    }

    @PostMapping("/admin/addproduct")
    public Product addProduct(@RequestBody ProductRequestDTO request) {
        return productService.addProduct(request);
    }
    

 // Partial update endpoint
    @PutMapping("/admin/updateproductbyid/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable("id") Long id,
            @RequestBody ProductRequestDTO request) {

        Product updatedProduct = productService.updateProduct(id, request);
        return ResponseEntity.ok(updatedProduct);
    }

    // Delete product
    @DeleteMapping("/admin/deleteproductbyid/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return "Product deleted successfully";
    }
}
