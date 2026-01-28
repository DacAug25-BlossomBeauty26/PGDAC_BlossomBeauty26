package com.example.Entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "CartDiscount")
public class CartDiscount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartDiscountId;

    private String discountCode;
    private double discountAmount;
    private LocalDateTime appliedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonBackReference
    private Cart cart;

	public Long getCartDiscountId() {
		return cartDiscountId;
	}

	public String getDiscountCode() {
		return discountCode;
	}

	public double getDiscountAmount() {
		return discountAmount;
	}

	public LocalDateTime getAppliedAt() {
		return appliedAt;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCartDiscountId(Long cartDiscountId) {
		this.cartDiscountId = cartDiscountId;
	}

	public void setDiscountCode(String discountCode) {
		this.discountCode = discountCode;
	}

	public void setDiscountAmount(double discountAmount) {
		this.discountAmount = discountAmount;
	}

	public void setAppliedAt(LocalDateTime appliedAt) {
		this.appliedAt = appliedAt;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

   
}
