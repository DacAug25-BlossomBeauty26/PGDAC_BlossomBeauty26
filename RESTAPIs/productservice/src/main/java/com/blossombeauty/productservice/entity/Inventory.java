package com.blossombeauty.productservice.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer inventoryId;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Integer stockQuantity;

    private java.sql.Timestamp lastUpdated;

    public Inventory() {}
    public Inventory(Integer inventoryId, Product product, Integer stockQuantity) {
        this.inventoryId = inventoryId;
        this.product = product;
        this.stockQuantity = stockQuantity;
    }

    public Integer getInventoryId() { return inventoryId; }
    public void setInventoryId(Integer inventoryId) { this.inventoryId = inventoryId; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public java.sql.Timestamp getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(java.sql.Timestamp lastUpdated) { this.lastUpdated = lastUpdated; }
}
