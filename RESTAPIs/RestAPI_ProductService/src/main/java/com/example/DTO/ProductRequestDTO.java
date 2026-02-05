package com.example.DTO;

import java.math.BigDecimal;

public class ProductRequestDTO {

    private String productName;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private Long brandId;
    private Long subCategoryId;
    private String imageUrl;
    
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getProductName() {
		return productName;
	}
	public String getDescription() {
		return description;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public Integer getStock() {
		return stock;
	}
	public Long getBrandId() {
		return brandId;
	}
	public Long getSubCategoryId() {
		return subCategoryId;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public void setStock(Integer stock) {
		this.stock = stock;
	}
	public void setBrandId(Long brandId) {
		this.brandId = brandId;
	}
	public void setSubCategoryId(Long subCategoryId) {
		this.subCategoryId = subCategoryId;
	}

    
}

