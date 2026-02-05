package com.example.Entities;

import jakarta.persistence.*;
import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private Long orderItemId;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "subtotal", nullable = false)
    private BigDecimal subtotal;

    public OrderItem() {}

    // Getters and setters
    public Long getOrderItemId() { return orderItemId; }
    public void setOrderItemId(Long orderItemId) { this.orderItemId = orderItemId; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price;}

	public Integer getQuantity() {
		return quantity;
	}

	public BigDecimal getSubtotal() {
		return subtotal;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public void setSubtotal(BigDecimal subtotal) {
		this.subtotal = subtotal;
	}
    
}
