package com.blossombeauty.productservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blossombeauty.productservice.entity.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {

}
