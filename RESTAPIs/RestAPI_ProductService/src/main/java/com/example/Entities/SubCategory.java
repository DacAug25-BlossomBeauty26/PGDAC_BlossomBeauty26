package com.example.Entities;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@Entity
@Table(name = "subcategories")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subcategory_id")
    private Long subCategoryId;

    @Column(name = "subcategory_name", nullable = false, length = 50)
    private String subCategoryName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;


	public Long getSubCategoryId() {
		return subCategoryId;
	}

	public String getSubCategoryName() {
		return subCategoryName;
	}

	public Category getCategory() {
		return category;
	}

	public void setSubCategoryId(Long subCategoryId) {
		this.subCategoryId = subCategoryId;
	}

	public void setSubCategoryName(String subCategoryName) {
		this.subCategoryName = subCategoryName;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

   
}

