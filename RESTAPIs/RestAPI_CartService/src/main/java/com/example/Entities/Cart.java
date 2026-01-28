package com.example.Entities;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    private Long userId; // reference to User Service
    private String status = "ACTIVE";
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<CartItem> items;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<CartDiscount> discounts;

	public Long getCartId() {
		return cartId;
	}

	public Long getUserId() {
		return userId;
	}

	public String getStatus() {
		return status;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public List<CartItem> getItems() {
		return items;
	}

	public List<CartDiscount> getDiscounts() {
		return discounts;
	}

	public void setCartId(Long cartId) {
		this.cartId = cartId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public void setItems(List<CartItem> items) {
		this.items = items;
	}

	public void setDiscounts(List<CartDiscount> discounts) {
		this.discounts = discounts;
	}

    
}
