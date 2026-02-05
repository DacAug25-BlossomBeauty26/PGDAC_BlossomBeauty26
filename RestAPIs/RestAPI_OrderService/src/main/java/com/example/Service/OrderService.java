package com.example.Service;



import com.example.Entities.Order;
import com.example.Entities.Order.OrderStatus;
import com.example.Entities.OrderItem;
import com.example.Repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Transactional
    public Order createOrder(Order order) {
        order.setOrderStatus(OrderStatus.CREATED);

        if (order.getOrderItems() != null) {
            for (OrderItem item : order.getOrderItems()) {
                if (item.getQuantity() == null || item.getQuantity() <= 0)
                    throw new IllegalArgumentException("Quantity must be set for all items");

                if (item.getPrice() == null || item.getPrice().doubleValue() <= 0)
                    throw new IllegalArgumentException("Price must be set for all items");

                // Calculate subtotal
                item.setSubtotal(item.getPrice().multiply(new BigDecimal(item.getQuantity())));

                // Link to parent order
                item.setOrder(order);
            }
        }

        return orderRepository.save(order);
    }


    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
 //  ADMIN → UPDATE STATUS
    @Transactional
    public Order updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setOrderStatus(status);
        return orderRepository.save(order);
    }
}
