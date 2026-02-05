package com.example.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Entities.Product;
import com.example.Service.ProductService;
//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ProductController {

	@Autowired
    private ProductService productService;

    @GetMapping("/getallactiveproducts")
    public List<Product> getAllActiveProducts() {
        return productService.getActiveProducts();
    }
}

