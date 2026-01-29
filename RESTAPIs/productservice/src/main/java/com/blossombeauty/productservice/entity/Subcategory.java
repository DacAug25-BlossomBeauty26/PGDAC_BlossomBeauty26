package com.blossombeauty.productservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "subcategory")
public class Subcategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subcategory_id")
    private Integer subcategoryId;

    @Column(name = "subcategory_name", nullable = false)
    private String subcategoryName;

    @OneToMany(mappedBy = "subcategory")
    @JsonIgnore 
    private List<Product> products;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnoreProperties({"subcategories"}) 
    private Category category;

    public Subcategory() {}

    public Subcategory(Integer subcategoryId, String subcategoryName, Category category) {
        this.subcategoryId = subcategoryId;
        this.subcategoryName = subcategoryName;
        this.category = category;
    }

    public Integer getSubcategoryId() { return subcategoryId; }
    public void setSubcategoryId(Integer subcategoryId) { this.subcategoryId = subcategoryId; }

    public String getSubcategoryName() { return subcategoryName; }
    public void setSubcategoryName(String subcategoryName) { this.subcategoryName = subcategoryName; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public List<Product> getProducts() { return products; }
    public void setProducts(List<Product> products) { this.products = products; }
}
