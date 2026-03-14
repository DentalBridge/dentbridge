package com.dentbridge.repository;

import com.dentbridge.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {

    List<InventoryItem> findByCategory(String category);

    @Query("SELECT i FROM InventoryItem i WHERE i.reorderLevel IS NOT NULL AND i.quantity <= i.reorderLevel")
    List<InventoryItem> findLowStockItems();

    @Query("SELECT i FROM InventoryItem i WHERE LOWER(i.itemName) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<InventoryItem> searchByItemName(String search);

}
