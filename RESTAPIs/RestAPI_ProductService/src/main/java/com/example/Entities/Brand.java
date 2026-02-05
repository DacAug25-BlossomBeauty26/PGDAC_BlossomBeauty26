package com.example.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "brands")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "brand_id")
    private Long brandId;

    @Column(name = "brand_name", nullable = false, unique = true, length = 50)
    private String brandName;

    @Column(name = "discount")
    private Integer discount; // % discount

	public Long getBrandId() {
		return brandId;
	}

	public String getBrandName() {
		return brandName;
	}

	public Integer getDiscount() {
		return discount;
	}

	public void setBrandId(Long brandId) {
		this.brandId = brandId;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public void setDiscount(Integer discount) {
		this.discount = discount;
	}

    
}

