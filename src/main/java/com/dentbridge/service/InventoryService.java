package com.dentbridge.service;

import com.dentbridge.dto.InventoryItemRequest;
import com.dentbridge.dto.InventoryItemResponse;
import com.dentbridge.model.InventoryItem;
import com.dentbridge.repository.InventoryItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryItemRepository inventoryItemRepository;

    @Transactional(readOnly = true)
    public List<InventoryItemResponse> getAllItems() {
        return inventoryItemRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<InventoryItemResponse> getLowStockItems() {
        return inventoryItemRepository.findLowStockItems().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public InventoryItemResponse getItemById(Long id) {
        InventoryItem item = inventoryItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory item not found with id: " + id));
        return mapToResponse(item);
    }

    @Transactional
    public InventoryItemResponse createItem(InventoryItemRequest request) {
        InventoryItem item = InventoryItem.builder()
                .itemName(request.getItemName())
                .category(request.getCategory())
                .description(request.getDescription())
                .quantity(request.getQuantity())
                .unitPrice(request.getUnitPrice())
                .unitOfMeasure(request.getUnitOfMeasure())
                .reorderLevel(request.getReorderLevel())
                .supplier(request.getSupplier())
                .build();

        InventoryItem savedItem = inventoryItemRepository.save(item);
        return mapToResponse(savedItem);
    }

    @Transactional
    public InventoryItemResponse updateItem(Long id, InventoryItemRequest request) {
        InventoryItem item = inventoryItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory item not found with id: " + id));

        item.setItemName(request.getItemName());
        item.setCategory(request.getCategory());
        item.setDescription(request.getDescription());
        item.setQuantity(request.getQuantity());
        item.setUnitPrice(request.getUnitPrice());
        item.setUnitOfMeasure(request.getUnitOfMeasure());
        item.setReorderLevel(request.getReorderLevel());
        item.setSupplier(request.getSupplier());

        InventoryItem updatedItem = inventoryItemRepository.save(item);
        return mapToResponse(updatedItem);
    }

    @Transactional
    public InventoryItemResponse adjustQuantity(Long id, Integer adjustment) {
        InventoryItem item = inventoryItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory item not found with id: " + id));

        item.setQuantity(item.getQuantity() + adjustment);
        InventoryItem updatedItem = inventoryItemRepository.save(item);
        return mapToResponse(updatedItem);
    }

    @Transactional
    public void deleteItem(Long id) {
        if (!inventoryItemRepository.existsById(id)) {
            throw new RuntimeException("Inventory item not found with id: " + id);
        }
        inventoryItemRepository.deleteById(id);
    }

    private InventoryItemResponse mapToResponse(InventoryItem item) {
        boolean isLowStock = item.getReorderLevel() != null && item.getQuantity() <= item.getReorderLevel();

        return InventoryItemResponse.builder()
                .id(item.getId())
                .itemName(item.getItemName())
                .category(item.getCategory())
                .description(item.getDescription())
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .unitOfMeasure(item.getUnitOfMeasure())
                .reorderLevel(item.getReorderLevel())
                .supplier(item.getSupplier())
                .isLowStock(isLowStock)
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .build();
    }

}
